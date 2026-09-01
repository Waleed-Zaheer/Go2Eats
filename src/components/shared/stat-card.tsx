import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  className,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
  trend?: { value: string; direction: "up" | "down" };
  className?: string;
}) {
  return (
    <Card className={cn("gap-2 p-5", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {Icon ? (
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-4" />
          </div>
        ) : null}
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="font-heading text-2xl font-semibold tracking-tight">{value}</span>
        {trend ? (
          <span
            className={cn(
              "mb-0.5 flex items-center gap-0.5 text-xs font-medium",
              trend.direction === "up" ? "text-success" : "text-destructive",
            )}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="size-3.5" />
            ) : (
              <TrendingDown className="size-3.5" />
            )}
            {trend.value}
          </span>
        ) : null}
      </div>
    </Card>
  );
}
