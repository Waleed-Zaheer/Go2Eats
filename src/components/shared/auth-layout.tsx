import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ChefHat } from "lucide-react";

import { getCuisineArt } from "@/lib/cuisine-art";

export function AuthLayout({
  title,
  subtitle,
  panelTitle,
  panelBody,
  panelIcon: PanelIcon,
  children,
}: {
  title: string;
  subtitle: string;
  panelTitle: string;
  panelBody: string;
  panelIcon: LucideIcon;
  children: ReactNode;
}) {
  const art = getCuisineArt("bbq");
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ChefHat className="size-4.5" />
            </span>
            <span className="font-heading text-lg font-semibold">GotoEats</span>
          </Link>

          <div className="space-y-1.5">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      <div className={`relative hidden overflow-hidden bg-gradient-to-br ${art.gradient} lg:flex lg:flex-col lg:justify-end lg:p-12`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,color-mix(in_oklch,white,transparent_35%),transparent_55%)] dark:bg-[radial-gradient(circle_at_75%_15%,color-mix(in_oklch,white,transparent_85%),transparent_55%)]" />
        <div className="relative max-w-sm space-y-3">
          <div className={`flex size-12 items-center justify-center rounded-2xl bg-background/80 backdrop-blur-sm ${art.tint}`}>
            <PanelIcon className="size-6" />
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">{panelTitle}</h2>
          <p className="text-foreground/70">{panelBody}</p>
        </div>
      </div>
    </div>
  );
}
