import type { LucideIcon } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftRight, ChefHat, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export type PortalNavItem = { to: string; label: string; icon: LucideIcon; end?: boolean };
export type PortalNavGroup = { label: string; items: PortalNavItem[] };

export function PortalShell({
  portalLabel,
  portalIcon: PortalIcon,
  navGroups,
  identityName,
  identitySubtitle,
  onSignOut,
}: {
  portalLabel: string;
  portalIcon: LucideIcon;
  navGroups: PortalNavGroup[];
  identityName: string;
  identitySubtitle: string;
  onSignOut: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleSignOut() {
    onSignOut();
    navigate("/");
  }

  const allItems = navGroups.flatMap((g) => g.items);
  const currentTitle =
    allItems.find((item) => (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)))
      ?.label ?? portalLabel;

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                render={<Link to="/" />}
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ChefHat className="size-4" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-heading text-sm font-semibold">GotoEats</span>
                  <span className="text-xs text-muted-foreground">{portalLabel}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {navGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive = item.end
                      ? location.pathname === item.to
                      : location.pathname.startsWith(item.to);
                    return (
                      <SidebarMenuItem key={item.to}>
                        <SidebarMenuButton isActive={isActive} tooltip={item.label} render={<Link to={item.to} />}>
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton size="lg">
                      <Avatar className="size-7 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-primary/15 text-primary">
                          {identityName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col leading-tight">
                        <span className="truncate text-sm font-medium">{identityName}</span>
                        <span className="truncate text-xs text-muted-foreground">{identitySubtitle}</span>
                      </div>
                    </SidebarMenuButton>
                  }
                />
                <DropdownMenuContent align="end" side="top" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    <ArrowLeftRight />
                    Switch to customer site
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
                    <LogOut />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-1 h-4" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <PortalIcon className="size-4 text-muted-foreground" />
            {currentTitle}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        <div className={cn("flex flex-1 flex-col gap-6 p-4 md:p-6")}>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
