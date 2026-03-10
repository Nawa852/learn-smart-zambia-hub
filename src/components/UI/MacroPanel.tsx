import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Trash2, Bot, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useMacroRecorder } from '@/hooks/useMacroRecorder';

export function MacroPanel() {
  const { isRecording, isPlaying, macros, startRecording, stopRecording, playMacro, deleteMacro } = useMacroRecorder();
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [macroName, setMacroName] = useState('');

  const handleStopRecording = () => {
    setMacroName('');
    setShowNameDialog(true);
  };

  const handleSave = () => {
    if (macroName.trim()) {
      stopRecording(macroName.trim());
      setShowNameDialog(false);
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant={isRecording ? 'destructive' : 'outline'}
            className="fixed bottom-24 right-4 z-50 h-10 w-10 rounded-full shadow-lg lg:bottom-6 lg:right-20"
            title="Macro Recorder"
          >
            {isRecording ? (
              <Circle className="w-4 h-4 fill-current animate-pulse" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Macro Recorder
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4 space-y-4">
            {/* Record controls */}
            <div className="flex gap-2">
              {isRecording ? (
                <Button onClick={handleStopRecording} variant="destructive" className="flex-1" size="sm">
                  <Square className="w-3 h-3 mr-1.5" /> Stop Recording
                </Button>
              ) : (
                <Button onClick={startRecording} variant="default" className="flex-1" size="sm" disabled={isPlaying}>
                  <Circle className="w-3 h-3 mr-1.5 fill-current" /> Start Recording
                </Button>
              )}
            </div>

            {isRecording && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-destructive flex items-center gap-1.5 px-3 py-2 bg-destructive/10 rounded-lg"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                </span>
                Recording your actions...
              </motion.div>
            )}

            {/* Saved macros */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Saved Macros</h4>
              {macros.length === 0 ? (
                <p className="text-xs text-muted-foreground/70 py-4 text-center">
                  No macros yet. Start recording to create one.
                </p>
              ) : (
                <AnimatePresence>
                  {macros.map((macro) => (
                    <motion.div
                      key={macro.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{macro.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {macro.actions.length} actions · Run {macro.runCount}x
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={() => playMacro(macro.id)}
                          disabled={isPlaying || isRecording}
                        >
                          <Play className="w-3 h-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-destructive"
                          onClick={() => deleteMacro(macro.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Name dialog */}
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Name your macro</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="e.g., Open quiz and start"
            value={macroName}
            onChange={(e) => setMacroName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowNameDialog(false); stopRecording('Untitled'); }}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!macroName.trim()}>
              Save Macro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
