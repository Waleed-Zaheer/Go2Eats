import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { formatMoney } from "@/lib/format";
import { useCartStore, useCartSummary } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";

export function CartSheet({ children }: { children: ReactElement<Record<string, unknown>> }) {
  const { restaurant, enriched, subtotalCents, deliveryFeeCents, totalCents, itemCount } = useCartSummary();
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <Sheet>
      <SheetTrigger render={children} />
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your order {restaurant ? `· ${restaurant.name}` : ""}</SheetTitle>
        </SheetHeader>

        {enriched.length === 0 ? (
          <Empty className="flex-1">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ShoppingBag />
              </EmptyMedia>
              <EmptyTitle>Your cart is empty</EmptyTitle>
              <EmptyDescription>Add items from a restaurant to get started.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <SheetClose render={<Button variant="outline" size="sm" render={<Link to="/restaurants">Browse restaurants</Link>} />} />
            </EmptyContent>
          </Empty>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <ul className="divide-y divide-border">
                {enriched.map(({ line, item }) => (
                  <li key={line.menuItemId} className="flex items-start justify-between gap-3 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{formatMoney(item.priceCents)}</p>
                      <div className="mt-2 flex items-center gap-2 rounded-full border border-border w-fit p-0.5">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="rounded-full"
                          onClick={() => setQuantity(line.menuItemId, line.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3" />
                        </Button>
                        <span className="w-4 text-center text-xs font-medium tabular-nums">{line.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="rounded-full"
                          onClick={() => setQuantity(line.menuItemId, line.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-medium tabular-nums">
                        {formatMoney(item.priceCents * line.quantity)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(line.menuItemId)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="gap-3 border-t border-border pt-4">
              <div className="w-full space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"})</span>
                  <span>{formatMoney(subtotalCents)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery fee</span>
                  <span>{formatMoney(deliveryFeeCents)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatMoney(totalCents)}</span>
                </div>
              </div>
              <SheetClose
                render={
                  <Button className="w-full" size="lg" render={<Link to="/checkout">Go to checkout</Link>} />
                }
              />
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
