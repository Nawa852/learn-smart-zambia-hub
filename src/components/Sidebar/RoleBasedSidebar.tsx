import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Settings, ChevronDown, Search, ChevronLeft, Sun, Moon } from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { getNavigationByRole, roleLabels } from "./sidebarConfig";
import { useProfile } from "@/hooks/useProfile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/contexts/ThemeContext";

export function RoleBasedSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { profile } = useProfile();
  const [searchQuery, setSearchQuery] = useState("");

  const userType = profile?.role || "student";
  const userName = profile?.full_name || "User";
  const navigation = getNavigationByRole(userType);
  const roleLabel = roleLabels[userType] || "Student";

  const isActive = (path: string) => location.pathname === path;

  // Filter nav items by search
  const filteredNavigation = searchQuery.trim()
    ? navigation.map(group => ({
        ...group,
        items: group.items.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(group => group.items.length > 0)
    : navigation;

  const badgeVariant = (badge: string) => {
    if (badge === 'LIVE') return 'destructive' as const;
    if (badge === 'AI') return 'default' as const;
    return 'secondary' as const;
  };

  return (
    <Sidebar
      className={cn(
        collapsed ? "w-[60px]" : "w-[250px]",
        "transition-all duration-200 ease-out"
      )}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar border-r border-sidebar-border flex flex-col h-full">
        {/* Header */}
        <div className="h-14 flex items-center px-4 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-2.5 w-full">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-xs">EZ</span>
            </div>
            {!collapsed && (
              <div className="flex-1 flex items-center justify-between min-w-0">
                <div>
                  <h2 className="font-bold text-sm text-foreground leading-tight">Edu Zambia</h2>
                  <p className="text-[10px] text-muted-foreground leading-tight">Smart Learning</p>
                </div>
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        {!collapsed && (
          <div className="px-3 pt-3 pb-1 shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 text-xs bg-secondary/50 border-border/50 rounded-lg focus:bg-secondary"
              />
            </div>
          </div>
        )}

        {/* User Profile - compact */}
        <div className={cn(
          "mx-3 mt-2 mb-1 rounded-lg border border-border/50 bg-secondary/30 shrink-0",
          collapsed ? "p-2 mx-2" : "p-2.5"
        )}>
          <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-2.5")}>
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-xs truncate text-foreground">{userName}</h3>
                <span className="text-[10px] text-muted-foreground">{roleLabel}</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2 py-1">
          {filteredNavigation.map((group) => (
            <Collapsible key={group.label} defaultOpen className="mb-0.5">
              <SidebarGroup className="p-0">
                {!collapsed && (
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-semibold text-muted-foreground/70 hover:text-muted-foreground transition-colors uppercase tracking-wider">
                    <span>{group.label}</span>
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                )}
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-px">
                      {group.items.map((item) => {
                        const active = isActive(item.url);
                        return (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild className="h-auto">
                              <NavLink
                                to={item.url}
                                className={cn(
                                  "flex items-center gap-2.5 px-2.5 py-[7px] rounded-md transition-all duration-150 group relative",
                                  active
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "hover:bg-secondary/80 text-sidebar-foreground hover:text-foreground"
                                )}
                              >
                                <item.icon className={cn(
                                  "h-[15px] w-[15px] flex-shrink-0 transition-colors",
                                  active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                                )} />
                                {!collapsed && (
                                  <>
                                    <span className={cn(
                                      "text-[13px] flex-1 truncate",
                                      active ? "font-semibold" : "font-medium"
                                    )}>
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <Badge
                                        variant={active ? "outline" : badgeVariant(item.badge)}
                                        className={cn(
                                          "text-[9px] px-1.5 py-0 h-4 font-medium",
                                          active && "border-primary-foreground/30 text-primary-foreground"
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
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </ScrollArea>

        {/* Footer */}
        <div className="p-2 border-t border-sidebar-border mt-auto shrink-0">
          <NavLink
            to="/settings"
            className={cn(
              "flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-all duration-150",
              collapsed && "justify-center",
              isActive('/settings')
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            )}
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span className="text-[13px] font-medium">Settings</span>}
          </NavLink>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
