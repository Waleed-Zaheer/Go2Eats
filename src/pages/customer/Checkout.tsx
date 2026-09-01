import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Banknote, CreditCard, MapPin, Wallet } from "lucide-react";

import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCartStore, useCartSummary } from "@/store/cart-store";
import { useOrdersStore } from "@/store/orders-store";
import { useSessionStore } from "@/store/session-store";
import type { Order } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

const PAYMENT_METHODS = [
  { value: "card", label: "Credit / debit card", icon: CreditCard },
  { value: "wallet", label: "GotoEats Wallet — $24.50 available", icon: Wallet },
  { value: "cash", label: "Cash on delivery", icon: Banknote },
];

let orderSeq = 2000;

export default function Checkout() {
  const navigate = useNavigate();
  const { restaurant, enriched, subtotalCents, deliveryFeeCents, totalCents } = useCartSummary();
  const clearCart = useCartStore((s) => s.clear);
  const placeOrder = useOrdersStore((s) => s.placeOrder);
  const customerName = useSessionStore((s) => s.customerName);

  const [address, setAddress] = useState("412 Elm Street, Apt 3B");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("card");
  const [placing, setPlacing] = useState(false);

  if (!placing && (!restaurant || enriched.length === 0)) {
    return <Navigate to="/restaurants" replace />;
  }

  // Between clearing the cart and the route actually swapping to the order
  // page, this component can still be asked to render once more with an
  // emptied cart (React keeps the old lazy route mounted while the new
  // one's chunk loads) — show a lightweight placeholder instead of the
  // full form, which would otherwise crash on the now-missing restaurant.
  if (!restaurant || enriched.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="size-6 text-primary" />
      </div>
    );
  }

  function handlePlaceOrder() {
    setPlacing(true);
    const id = `ORD-${orderSeq++}`;
    const order: Order = {
      id,
      customerId: "guest",
      customerName: customerName ?? "Guest diner",
      restaurantId: restaurant!.id,
      restaurantName: restaurant!.name,
      items: enriched.map(({ line, item }) => ({
        menuItemId: item.id,
        name: item.name,
        quantity: line.quantity,
        priceCents: item.priceCents,
      })),
      status: "placed",
      subtotalCents,
      deliveryFeeCents,
      totalCents,
      deliveryAddress: address,
      createdAt: new Date().toISOString(),
      etaMins: restaurant!.deliveryTimeMins[1],
    };
    window.setTimeout(() => {
      placeOrder(order);
      // Navigate away before clearing the cart: Checkout's own empty-cart
      // guard would otherwise re-fire and redirect to /restaurants out
      // from under the just-placed order (a real race we hit — clearing
      // first let Checkout re-render once more before the route swapped).
      navigate(`/orders/${id}`);
      clearCart();
    }, 600);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-semibold">Checkout</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="p-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="address">
                  <MapPin className="mr-1 inline size-3.5" />
                  Delivery address
                </FieldLabel>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="notes">Delivery notes (optional)</FieldLabel>
                <Textarea
                  id="notes"
                  placeholder="E.g. leave at the door, ring the bell twice…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </Card>

          <Card className="p-5">
            <h2 className="font-heading font-semibold">Payment method</h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="mt-3 gap-3">
              {PAYMENT_METHODS.map((method) => (
                <Label
                  key={method.value}
                  htmlFor={method.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-colors",
                    payment === method.value ? "border-primary bg-primary/5" : "border-border",
                  )}
                >
                  <RadioGroupItem value={method.value} id={method.value} />
                  <method.icon className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{method.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-heading font-semibold">{restaurant.name}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {enriched.map(({ line, item }) => (
                <li key={line.menuItemId} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">
                    {line.quantity} × {item.name}
                  </span>
                  <span className="tabular-nums">{formatMoney(item.priceCents * line.quantity)}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
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
          </Card>

          <Button size="lg" className="w-full" onClick={handlePlaceOrder} disabled={placing}>
            {placing ? "Placing order…" : `Place order · ${formatMoney(totalCents)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
