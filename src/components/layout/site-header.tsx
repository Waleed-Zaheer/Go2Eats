import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChefHat, ChevronDown, Menu, ShoppingBag, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCartSummary } from "@/store/cart-store";
import { useSessionStore } from "@/store/session-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "@/components/layout/cart-sheet";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/restaurants", label: "Restaurants", end: false },
  { to: "/orders", label: "Orders", end: false },
];

const PORTALS = [
  { to: "/restaurant", label: "Restaurant portal", description: "Manage your menu & orders" },
  { to: "/rider", label: "Rider portal", description: "Go online & deliver" },
  { to: "/admin", label: "Admin console", description: "Run the whole platform" },
];

export function SiteHeader() {
  const navigate = useNavigate();
  const { itemCount } = useCartSummary();
  const customerName = useSessionStore((s) => s.customerName);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ChefHat className="size-4.5" />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight">GotoEats</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActive && "bg-muted text-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="sm" className="hidden gap-1 sm:flex">
                  Partner with us
                  <ChevronDown className="size-3.5" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Portals</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {PORTALS.map((portal) => (
                <DropdownMenuItem key={portal.to} onClick={() => navigate(portal.to)}>
                  <div className="flex flex-col">
                    <span className="font-medium">{portal.label}</span>
                    <span className="text-xs text-muted-foreground">{portal.description}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <CartSheet>
            <Button variant="ghost" size="icon" className="relative" aria-label="Open cart">
              <ShoppingBag className="size-5" />
              {itemCount > 0 ? (
                <Badge className="absolute -top-1 -right-1 size-4.5 justify-center rounded-full p-0 text-[10px]">
                  {itemCount}
                </Badge>
              ) : null}
            </Button>
          </CartSheet>

          {customerName ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="Account menu">
                    <User className="size-5" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{customerName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/orders")}>Your orders</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/account")}>Account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="hidden sm:inline-flex" render={<Link to="/login">Sign in</Link>} />
          )}

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="left" className="w-72">
              <div className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      cn(
                        "rounded-xl px-3 py-2 text-sm font-medium",
                        isActive ? "bg-muted" : "text-muted-foreground",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="my-2 h-px bg-border" />
                {PORTALS.map((portal) => (
                  <Link
                    key={portal.to}
                    to={portal.to}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground"
                  >
                    {portal.label}
                  </Link>
                ))}
                {!customerName ? (
                  <Link to="/login" className="rounded-xl px-3 py-2 text-sm font-medium text-primary">
                    Sign in
                  </Link>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
