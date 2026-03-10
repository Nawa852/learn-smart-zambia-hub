import React from 'react';
import { useAppProfile, type AppProfileType } from '@/hooks/useAppProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export function ProfileSwitcher() {
  const { activeProfile, profiles, switchProfile } = useAppProfile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs font-medium">
          <span className="text-base leading-none">{activeProfile.icon}</span>
          <span className="hidden sm:inline">{activeProfile.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profiles.map((profile) => (
          <DropdownMenuItem
            key={profile.id}
            onClick={() => switchProfile(profile.id)}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span>{profile.icon}</span>
              <span>{profile.name}</span>
            </span>
            {activeProfile.id === profile.id && <Check className="w-3.5 h-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
