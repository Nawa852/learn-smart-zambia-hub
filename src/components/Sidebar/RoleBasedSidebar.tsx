import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronLeft } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { getNavigationByRole, roleLabels } from "./sidebarConfig";
import { useProfile } from "@/hooks/useProfile";
import { ScrollArea } from "@/components/ui/scroll-area";
import eduLogo from "@/assets/edu-zambia-mark.png";

export function RoleBasedSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { profile } = useProfile();

  const userType = profile?.role || "student";
  const navigation = getNavigationByRole(userType);

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar
      className={cn(
        collapsed ? "w-[56px]" : "w-[220px]",
        "transition-all duration-200 ease-out"
      )}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar border-r border-sidebar-border flex flex-col h-full">
        {/* Header */}
        <div className="h-14 flex items-center px-3 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-2 w-full">
            <img src={eduLogo} alt="Edu Zambia" className="w-7 h-7 rounded-md flex-shrink-0" />
            {!collapsed && (
              <div className="flex-1 flex items-center justify-between min-w-0">
                <span className="font-bold text-sm text-foreground tracking-tight">Edu Zambia</span>
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2 py-2">
          {navigation.map((group) => (
            <Collapsible key={group.label} defaultOpen className="mb-1">
              <SidebarGroup className="p-0">
                {!collapsed && (
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1 text-[10px] font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors uppercase tracking-widest">
                    <span>{group.label}</span>
                    <ChevronDown className="h-3 w-3" />
                  </CollapsibleTrigger>
                )}
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-px">
                      {group.items.map((item) => {
                        const active = isActive(item.url);
                        return (
                          <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton asChild className="h-auto">
                              <NavLink
                                to={item.url}
                                className={cn(
                                  "flex items-center gap-2 px-2 py-1.5 rounded-md transition-all duration-100 text-[13px]",
                                  active
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-sidebar-foreground hover:bg-secondary/60 hover:text-foreground"
                                )}
                              >
                                <item.icon className={cn(
                                  "h-4 w-4 flex-shrink-0",
                                  active ? "text-primary" : "text-muted-foreground"
                                )} />
                                {!collapsed && (
                                  <>
                                    <span className="flex-1 truncate">{item.title}</span>
                                    {item.badge && (
                                      <span className={cn(
                                        "text-[9px] px-1 py-0 rounded font-medium",
                                        item.badge === 'LIVE' ? "bg-destructive/15 text-destructive" :
                                        item.badge === 'AI' ? "bg-primary/15 text-primary" :
                                        "bg-muted text-muted-foreground"
                                      )}>
                                        {item.badge}
                                      </span>
                                    )}
                                  </>
                                )}
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
