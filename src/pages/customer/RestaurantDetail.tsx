import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Clock, MapPin, ShoppingBag, Star } from "lucide-react";

import { formatMoney } from "@/lib/format";
import { Dish } from "@/lib/cuisine-art";
import { MENU_CATEGORIES, getMenuItemsFor, getRestaurantBySlug } from "@/lib/mock-data";
import { useCartStore, useCartSummary } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { MenuItemCard } from "@/components/customer/menu-item-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/layout/cart-sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function RestaurantDetail() {
  const { slug } = useParams();
  const restaurant = slug ? getRestaurantBySlug(slug) : undefined;

  const lines = useCartStore((s) => s.lines);
  const addItem = useCartStore((s) => s.addItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const cartRestaurantId = useCartStore((s) => s.restaurantId);
  const clearCart = useCartStore((s) => s.clear);
  const { itemCount, totalCents } = useCartSummary();

  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(MENU_CATEGORIES[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const items = useMemo(() => (restaurant ? getMenuItemsFor(restaurant.id) : []), [restaurant]);
  const categoriesInMenu = MENU_CATEGORIES.filter((c) => items.some((i) => i.categoryId === c.id));

  useEffect(() => {
    if (!restaurant) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target.id) setActiveCategory(visible.target.id.replace("cat-", ""));
      },
      { rootMargin: "-140px 0px -60% 0px" },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant?.id]);

  if (!restaurant) return <Navigate to="/restaurants" replace />;

  function quantityOf(menuItemId: string) {
    return lines.find((l) => l.menuItemId === menuItemId)?.quantity ?? 0;
  }

  function handleAdd(menuItemId: string) {
    if (cartRestaurantId && cartRestaurantId !== restaurant!.id) {
      setPendingItemId(menuItemId);
      return;
    }
    addItem(menuItemId, restaurant!.id);
  }

  function confirmSwitch() {
    if (!pendingItemId) return;
    clearCart();
    addItem(pendingItemId, restaurant!.id);
    setPendingItemId(null);
  }

  function scrollToCategory(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <div className="relative h-56 w-full sm:h-72">
        <Dish cuisine={restaurant.cuisines[0]} className="size-full" iconClassName="size-16" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-8 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="font-heading text-2xl font-semibold sm:text-3xl">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 font-medium text-foreground">
                  <Star className="size-4 fill-primary text-primary" />
                  {restaurant.rating.toFixed(1)}
                  <span className="text-muted-foreground">({restaurant.reviewCount.toLocaleString()})</span>
                </span>
                <span className="capitalize">{restaurant.cuisines.join(" · ")}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {restaurant.deliveryTimeMins[0]}–{restaurant.deliveryTimeMins[1]} min
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {restaurant.address}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {restaurant.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
                {!restaurant.isOpen ? <Badge variant="destructive">Closed now</Badge> : null}
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>{formatMoney(restaurant.deliveryFeeCents)} delivery fee</p>
              <p>{formatMoney(restaurant.minOrderCents)} minimum order</p>
            </div>
          </div>
        </div>

        <div className="sticky top-16 z-30 -mx-4 mt-6 flex gap-2 overflow-x-auto border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm no-scrollbar sm:mx-0 sm:px-0">
          {categoriesInMenu.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => scrollToCategory(cat.id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid gap-8 py-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            {categoriesInMenu.map((cat) => (
              <div
                key={cat.id}
                id={`cat-${cat.id}`}
                ref={(el) => {
                  sectionRefs.current[cat.id] = el;
                }}
                className="scroll-mt-32 space-y-1"
              >
                <h2 className="font-heading text-lg font-semibold">{cat.name}</h2>
                <div className="divide-y divide-border">
                  {items
                    .filter((i) => i.categoryId === cat.id)
                    .map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        quantity={quantityOf(item.id)}
                        onAdd={() => handleAdd(item.id)}
                        onIncrement={() => handleAdd(item.id)}
                        onDecrement={() => setQuantity(item.id, quantityOf(item.id) - 1)}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-36 rounded-3xl border border-border bg-card p-5">
              <h3 className="font-heading font-semibold">Your order</h3>
              {itemCount === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  Add items from the menu to start your order.
                </p>
              ) : (
                <div className="mt-3 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {itemCount} item{itemCount === 1 ? "" : "s"} · {formatMoney(totalCents)}
                  </p>
                  <CartSheet>
                    <Button className="w-full">
                      <ShoppingBag className="size-4" />
                      View cart
                    </Button>
                  </CartSheet>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {itemCount > 0 ? (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:hidden">
          <CartSheet>
            <Button size="lg" className="w-full max-w-md justify-between rounded-full shadow-lg">
              <span className="flex items-center gap-2">
                <ShoppingBag className="size-4" />
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </span>
              <span>{formatMoney(totalCents)}</span>
            </Button>
          </CartSheet>
        </div>
      ) : null}

      <AlertDialog open={pendingItemId !== null} onOpenChange={(open) => !open && setPendingItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start a new order?</AlertDialogTitle>
            <AlertDialogDescription>
              Your cart has items from another restaurant. Adding this item will clear your current order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingItemId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSwitch}>Clear cart & add</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
