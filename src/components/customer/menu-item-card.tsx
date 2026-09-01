import { Flame, Leaf, Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/format";
import type { MenuItem } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function MenuItemCard({
  item,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 rounded-2xl border border-transparent p-3 transition-colors",
        !item.available ? "opacity-50" : "hover:border-border hover:bg-muted/40",
      )}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-1.5">
          {item.isVeg ? <Leaf className="size-3.5 shrink-0 text-success" /> : null}
          <h4 className="truncate font-medium">{item.name}</h4>
          {item.isPopular ? (
            <span className="shrink-0 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
              Popular
            </span>
          ) : null}
          {item.spicyLevel ? (
            <span className="flex shrink-0 items-center">
              {Array.from({ length: item.spicyLevel }).map((_, i) => (
                <Flame key={i} className="size-3 text-destructive" />
              ))}
            </span>
          ) : null}
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        <p className="text-sm font-medium">{formatMoney(item.priceCents)}</p>
      </div>

      <div className="shrink-0 pt-1">
        {!item.available ? (
          <span className="text-xs text-muted-foreground">Sold out</span>
        ) : quantity > 0 ? (
          <div className="flex items-center gap-2 rounded-full border border-border bg-background p-1">
            <Button variant="ghost" size="icon-sm" className="rounded-full" onClick={onDecrement} aria-label={`Remove one ${item.name}`}>
              <Minus className="size-3.5" />
            </Button>
            <span className="w-4 text-center text-sm font-medium tabular-nums">{quantity}</span>
            <Button variant="ghost" size="icon-sm" className="rounded-full" onClick={onIncrement} aria-label={`Add one more ${item.name}`}>
              <Plus className="size-3.5" />
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" className="rounded-full" onClick={onAdd}>
            <Plus className="size-3.5" />
            Add
          </Button>
        )}
      </div>
    </div>
  );
}
