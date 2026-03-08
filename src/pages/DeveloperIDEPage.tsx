import { useState, useRef, useCallback, useEffect } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Plus, X, Play, Sparkles, FileCode, Terminal, FolderOpen, Loader2,
  ChevronDown, ChevronRight, Trash2, Copy, Download
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface IDEFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'rust', 'go', 'html', 'css', 'sql'
];

const LANG_EXTENSIONS: Record<string, string> = {
  javascript: '.js', typescript: '.ts', python: '.py', java: '.java',
  c: '.c', cpp: '.cpp', rust: '.rs', go: '.go', html: '.html', css: '.css', sql: '.sql'
};

const STARTER_TEMPLATES: Record<string, string> = {
  javascript: `// Welcome to the IDE\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("World"));`,
  typescript: `// TypeScript file\ninterface User {\n  name: string;\n  age: number;\n}\n\nconst greet = (user: User): string => {\n  return \`Hello, \${user.name}!\`;\n};`,
  python: `# Python file\ndef greet(name: str) -> str:\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  rust: `fn main() {\n    println!("Hello, World!");\n}`,
  go: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}`,
  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>`,
  css: `/* Styles */\nbody {\n  font-family: sans-serif;\n  background: #1a1a2e;\n  color: #eee;\n}`,
  sql: `-- Query\nSELECT * FROM users\nWHERE active = true\nORDER BY created_at DESC;`,
};

const DeveloperIDEPage = () => {
  const [files, setFiles] = useState<IDEFile[]>([
    { id: '1', name: 'main.js', language: 'javascript', content: STARTER_TEMPLATES.javascript },
  ]);
  const [activeFileId, setActiveFileId] = useState('1');
  const [consoleOutput, setConsoleOutput] = useState<string[]>(['$ Ready.']);
  const [aiOutput, setAiOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [showConsole, setShowConsole] = useState(true);
  const [newFileName, setNewFileName] = useState('');
  const [showNewFile, setShowNewFile] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  const activeFile = files.find(f => f.id === activeFileId);

  const updateFileContent = useCallback((content: string) => {
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content } : f));
  }, [activeFileId]);

  const updateFileLanguage = useCallback((language: string) => {
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, language } : f));
  }, [activeFileId]);

  const addFile = () => {
    if (!newFileName.trim()) return;
    const ext = newFileName.includes('.') ? newFileName.split('.').pop() || '' : '';
    const lang = Object.entries(LANG_EXTENSIONS).find(([, e]) => e === `.${ext}`)?.[0] || 'javascript';
    const id = Date.now().toString();
    const name = newFileName.includes('.') ? newFileName : `${newFileName}${LANG_EXTENSIONS[lang]}`;
    setFiles(prev => [...prev, { id, name, language: lang, content: STARTER_TEMPLATES[lang] || '' }]);
    setActiveFileId(id);
    setNewFileName('');
    setShowNewFile(false);
  };

  const removeFile = (id: string) => {
    if (files.length <= 1) return;
    setFiles(prev => prev.filter(f => f.id !== id));
    if (activeFileId === id) setActiveFileId(files.find(f => f.id !== id)!.id);
  };

  const handleRun = async () => {
    if (!activeFile) return;
    setIsRunning(true);
    setShowConsole(true);
    setConsoleOutput(prev => [...prev, `\n$ Running ${activeFile.name}...`]);
    try {
      const { data, error } = await supabase.functions.invoke('coding-challenge-generator', {
        body: { action: 'evaluate', code: activeFile.content, language: activeFile.language },
      });
      if (error) throw error;
      const result = data?.evaluation || data?.result || JSON.stringify(data, null, 2);
      setConsoleOutput(prev => [...prev, `✓ Output:\n${result}`]);
    } catch (err: any) {
      setConsoleOutput(prev => [...prev, `✗ Error: ${err.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReview = async () => {
    if (!activeFile) return;
    setIsReviewing(true);
    setAiOutput('Analyzing code...');
    try {
      const { data, error } = await supabase.functions.invoke('ai-code-review', {
        body: { code: activeFile.content, language: activeFile.language },
      });
      if (error) throw error;
      setAiOutput(data?.review || data?.result || JSON.stringify(data, null, 2));
    } catch (err: any) {
      setAiOutput(`Error: ${err.message}`);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleCopyCode = () => {
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.content);
      toast.success('Copied to clipboard');
    }
  };

  const handleDownload = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Sync scroll between line numbers and textarea
  const handleScroll = () => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Handle tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newContent = activeFile!.content.substring(0, start) + '  ' + activeFile!.content.substring(end);
      updateFileContent(newContent);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lineCount = activeFile ? activeFile.content.split('\n').length : 0;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-950 text-gray-100 rounded-lg overflow-hidden border border-gray-800">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-sm tracking-wide">BrightSphere IDE</span>
          <Badge variant="outline" className="text-[10px] border-cyan-500/40 text-cyan-400">BETA</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={handleCopyCode}
          >
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleReview}
            disabled={isReviewing}
          >
            {isReviewing ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
            AI Review
          </Button>
          <Button
            size="sm"
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Play className="w-4 h-4 mr-1" />}
            Run
          </Button>
        </div>
      </div>

      {/* Main panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File explorer */}
        <ResizablePanel defaultSize={18} minSize={12} maxSize={28}>
          <div className="h-full flex flex-col bg-gray-900/80">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Explorer</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                onClick={() => setShowNewFile(true)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {showNewFile && (
              <div className="px-2 py-1 flex gap-1">
                <Input
                  value={newFileName}
                  onChange={e => setNewFileName(e.target.value)}
                  placeholder="filename.js"
                  className="h-7 text-xs bg-gray-800 border-gray-700 text-gray-100"
                  onKeyDown={e => e.key === 'Enter' && addFile()}
                  autoFocus
                />
                <Button size="sm" className="h-7 px-2 bg-cyan-600" onClick={addFile}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            )}
            <ScrollArea className="flex-1">
              <div className="p-1">
                {files.map(file => (
                  <div
                    key={file.id}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded cursor-pointer text-sm group transition-colors ${
                      file.id === activeFileId
                        ? 'bg-gray-800 text-cyan-400'
                        : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
                    }`}
                    onClick={() => setActiveFileId(file.id)}
                  >
                    <FileCode className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate flex-1 text-xs">{file.name}</span>
                    {files.length > 1 && (
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={e => { e.stopPropagation(); removeFile(file.id); }}
                      >
                        <X className="w-3 h-3 text-gray-500 hover:text-red-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Editor + Console vertical split */}
        <ResizablePanel defaultSize={55}>
          <ResizablePanelGroup direction="vertical">
            {/* Editor */}
            <ResizablePanel defaultSize={showConsole ? 70 : 100} minSize={30}>
              <div className="h-full flex flex-col">
                {/* File tabs */}
                <div className="flex items-center gap-0 bg-gray-900 border-b border-gray-800 overflow-x-auto shrink-0">
                  {files.map(file => (
                    <div
                      key={file.id}
                      className={`flex items-center gap-1 px-3 py-1.5 cursor-pointer text-xs border-r border-gray-800 transition-colors ${
                        file.id === activeFileId
                          ? 'bg-gray-950 text-cyan-400 border-b-2 border-b-cyan-500'
                          : 'bg-gray-900 text-gray-500 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveFileId(file.id)}
                    >
                      <span>{file.name}</span>
                      {files.length > 1 && (
                        <button onClick={e => { e.stopPropagation(); removeFile(file.id); }}>
                          <X className="w-3 h-3 hover:text-red-400" />
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="ml-auto px-3 py-1 shrink-0">
                    <Select value={activeFile?.language} onValueChange={updateFileLanguage}>
                      <SelectTrigger className="h-6 w-28 text-[10px] bg-gray-800 border-gray-700 text-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {LANGUAGES.map(l => (
                          <SelectItem key={l} value={l} className="text-xs text-gray-200">{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Code area */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Line numbers */}
                  <div
                    ref={lineNumberRef}
                    className="w-12 bg-gray-900/60 text-right pr-3 pt-3 overflow-hidden select-none shrink-0 border-r border-gray-800"
                  >
                    {Array.from({ length: lineCount }, (_, i) => (
                      <div key={i} className="text-[11px] leading-[1.625rem] text-gray-600 font-mono">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={activeFile?.content || ''}
                    onChange={e => updateFileContent(e.target.value)}
                    onScroll={handleScroll}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-gray-100 font-mono text-sm leading-[1.625rem] p-3 resize-none focus:outline-none"
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </div>
              </div>
            </ResizablePanel>

            {showConsole && (
              <>
                <ResizableHandle withHandle />
                {/* Console */}
                <ResizablePanel defaultSize={30} minSize={10}>
                  <div className="h-full flex flex-col bg-gray-950">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-800 shrink-0">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-xs font-semibold text-gray-400 uppercase">Console</span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-5 px-2 text-[10px] text-gray-500 hover:text-white"
                          onClick={() => setConsoleOutput(['$ Cleared.'])}
                        >
                          Clear
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-5 px-1 text-gray-500 hover:text-white"
                          onClick={() => setShowConsole(false)}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <ScrollArea className="flex-1 p-3">
                      <pre className="font-mono text-xs text-green-400 whitespace-pre-wrap">
                        {consoleOutput.join('\n')}
                      </pre>
                    </ScrollArea>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>

          {!showConsole && (
            <button
              className="absolute bottom-0 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gray-800 text-gray-400 text-[10px] rounded-t border border-b-0 border-gray-700 hover:text-white"
              onClick={() => setShowConsole(true)}
            >
              <ChevronRight className="w-3 h-3 rotate-[-90deg] inline mr-1" /> Console
            </button>
          )}
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* AI Review Panel */}
        <ResizablePanel defaultSize={27} minSize={15}>
          <div className="h-full flex flex-col bg-gray-900/60">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800 shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AI Assistant</span>
            </div>
            <ScrollArea className="flex-1 p-3">
              {aiOutput ? (
                <pre className="font-mono text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {aiOutput}
                </pre>
              ) : (
                <div className="text-center text-gray-600 text-xs mt-12 space-y-3">
                  <Sparkles className="w-8 h-8 mx-auto text-gray-700" />
                  <p>Click <strong className="text-emerald-500">AI Review</strong> to analyze your code.</p>
                  <p className="text-[10px]">Get feedback on bugs, performance, style, and best practices.</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DeveloperIDEPage;
