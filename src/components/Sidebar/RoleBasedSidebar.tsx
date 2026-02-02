import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Settings, Zap, ChevronDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { getNavigationByRole, roleLabels } from "./sidebarConfig";
import EduZambiaLogo from "@/assets/edu-zambia-logo.svg";

export function RoleBasedSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  // Get user info from localStorage
  const onboardingData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("edu-zambia-onboarding") || "{}");
    } catch {
      return {};
    }
  }, []);

  const userType = localStorage.getItem("edu-zambia-user-type") || onboardingData.userType || "student";
  const userName = onboardingData.fullName || "User";
  const navigation = getNavigationByRole(userType);
  const roleLabel = roleLabels[userType?.toLowerCase()] || "Student";

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar
      className={cn(
        collapsed ? "w-[70px]" : "w-[260px]",
        "transition-all duration-300 ease-in-out"
      )}
      collapsible="icon"
    >
      <SidebarContent className="bg-card border-r border-border flex flex-col h-full">
        {/* Header with Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={EduZambiaLogo} alt="Edu Zambia" className="w-8 h-8" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-sm bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Edu Zambia
                </h2>
                <p className="text-xs text-muted-foreground">Smart Learning</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 mx-2 my-2 rounded-xl bg-accent/20 border border-border/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 ring-2 ring-primary/20 flex-shrink-0">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{userName}</h3>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {roleLabel}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {navigation.map((group, groupIndex) => (
            <Collapsible key={group.label} defaultOpen className="mb-2">
              <SidebarGroup className="p-0">
                {!collapsed && (
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <span className="uppercase tracking-wider">{group.label}</span>
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
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                                isActive(item.url)
                                  ? "bg-primary text-primary-foreground shadow-md"
                                  : "hover:bg-accent/50 text-foreground/80 hover:text-foreground"
                              )}
                            >
                              <item.icon className="h-4 w-4 flex-shrink-0" />
                              {!collapsed && (
                                <>
                                  <span className="text-sm font-medium flex-1">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <Badge
                                      variant={isActive(item.url) ? "secondary" : "destructive"}
                                      className="text-[10px] px-1.5 py-0"
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
        <div className="p-4 border-t border-border mt-auto">
          <NavLink
            to="/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors",
              collapsed && "justify-center"
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
