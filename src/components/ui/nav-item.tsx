
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export function NavItem({ title, href, icon: Icon, description }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground"
      )}
      title={description}
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </Link>
  );
}
