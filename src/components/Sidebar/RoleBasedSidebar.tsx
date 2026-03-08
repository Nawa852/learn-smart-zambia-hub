import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Settings, ChevronDown } from "lucide-react";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { getNavigationByRole, roleLabels } from "./sidebarConfig";
import { useProfile } from "@/hooks/useProfile";

export function RoleBasedSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { profile } = useProfile();

  const userType = profile?.role || "student";
  const userName = profile?.full_name || "User";
  const navigation = getNavigationByRole(userType);
  const roleLabel = roleLabels[userType] || "Student";

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar
      className={cn(
        collapsed ? "w-[70px]" : "w-[260px]",
        "transition-all duration-300 ease-in-out"
      )}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar border-r border-sidebar-border flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-bold text-sm">EZ</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-sm gradient-text">
                  Edu Zambia
                </h2>
                <p className="text-xs text-muted-foreground">Smart Learning</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 mx-2 my-2 rounded-xl glow-border bg-primary/5">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 ring-2 ring-primary/30 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate text-foreground">{userName}</h3>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20">
                  {roleLabel}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-2 py-2 custom-scrollbar">
          {navigation.map((group) => (
            <Collapsible key={group.label} defaultOpen className="mb-1">
              <SidebarGroup className="p-0">
                {!collapsed && (
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <span className="uppercase tracking-widest">{group.label}</span>
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                )}
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-0.5">
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild className="h-9">
                            <NavLink
                              to={item.url}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                                isActive(item.url)
                                  ? "bg-primary/15 text-primary shadow-sm border border-primary/20"
                                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {isActive(item.url) && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
                              )}
                              <item.icon className={cn(
                                "h-4 w-4 flex-shrink-0 transition-colors",
                                isActive(item.url) ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                              )} />
                              {!collapsed && (
                                <>
                                  <span className="text-sm font-medium flex-1">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <Badge
                                      className={cn(
                                        "text-[10px] px-1.5 py-0",
                                        item.badge === 'LIVE'
                                          ? 'bg-green-500/15 text-green-400 border-green-500/20'
                                          : item.badge === 'NEW'
                                          ? 'bg-primary/15 text-primary border-primary/20'
                                          : 'bg-accent/15 text-accent border-accent/20'
                                      )}
                                    >
                                      {item.badge}
                                    </Badge>
                                  )}
                                </>
                              )}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border mt-auto">
          <NavLink
            to="/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
              collapsed && "justify-center",
              isActive('/settings') && "bg-primary/15 text-primary border border-primary/20"
            )}
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span className="text-sm">Settings</span>}
          </NavLink>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
