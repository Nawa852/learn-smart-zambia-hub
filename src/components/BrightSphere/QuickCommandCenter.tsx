import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Brain, BookOpen, Users, Calendar, Award, FileText, Video, MessageSquare, Settings, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickCommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickCommandCenter = ({ isOpen, onClose }: QuickCommandCenterProps) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const commands = [
    { icon: Brain, label: 'Open AI Tutor', action: '/study-assistant', category: 'AI' },
    { icon: BookOpen, label: 'My Courses', action: '/courses', category: 'Learning' },
    { icon: FileText, label: 'Generate Notes', action: '/ai-study-helper', category: 'AI' },
    { icon: Video, label: 'Record Lecture', action: '/youtube-learning', category: 'Learning' },
    { icon: Award, label: 'View Achievements', action: '/achievements', category: 'Progress' },
    { icon: Users, label: 'Study Groups', action: '/study-groups', category: 'Social' },
    { icon: Calendar, label: 'My Schedule', action: '/dashboard', category: 'Organization' },
    { icon: MessageSquare, label: 'Messages', action: '/messenger', category: 'Communication' },
    { icon: Settings, label: 'Settings', action: '/dashboard', category: 'System' },
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleCommand = (action: string) => {
    navigate(action);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Quick Command Center
          </DialogTitle>
        </DialogHeader>
        <Command className="rounded-lg border">
          <CommandInput 
            placeholder="Type a command or search..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No commands found.</CommandEmpty>
            <CommandGroup heading="Available Commands">
              {filteredCommands.map((cmd, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleCommand(cmd.action)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <cmd.icon className="w-4 h-4" />
                  <span>{cmd.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{cmd.category}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <p className="text-xs text-muted-foreground text-center">
          Press <kbd className="px-2 py-1 bg-muted rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-muted rounded">K</kbd> to close
        </p>
      </DialogContent>
    </Dialog>
  );
};
