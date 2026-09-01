import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Check, MapPin, Navigation, Phone, Store } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { formatMoney } from "@/lib/format";
import { useOrdersStore } from "@/store/orders-store";
import { useSessionStore } from "@/store/session-store";
import { getRestaurantById } from "@/lib/mock-data";
import type { OrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const STEPS: { status: OrderStatus; label: string }[] = [
  { status: "picked_up", label: "Picked up from restaurant" },
  { status: "out_for_delivery", label: "En route to customer" },
  { status: "delivered", label: "Delivered" },
];

export default function RiderDelivery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const riderId = useSessionStore((s) => s.riderId)!;
  const order = useOrdersStore((s) => s.orders.find((o) => o.id === id));
  const setStatus = useOrdersStore((s) => s.setStatus);

  if (!order || order.riderId !== riderId) return <Navigate to="/rider" replace />;

  const restaurant = getRestaurantById(order.restaurantId);
  const currentIndex = STEPS.findIndex((s) => s.status === order.status);
  const isDelivered = order.status === "delivered";
  const nextStep = STEPS[currentIndex + 1];

  function advance() {
    if (!nextStep) return;
    setStatus(order!.id, nextStep.status);
    toast.success(nextStep.label);
    if (nextStep.status === "delivered") {
      window.setTimeout(() => navigate("/rider"), 900);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Delivery {order.id}</p>
        <h1 className="font-heading text-2xl font-semibold">{formatMoney(order.deliveryFeeCents)} payout</h1>
      </div>

      <Card className="p-5">
        <ol className="space-y-0">
          {STEPS.map((step, i) => {
            const done = i < currentIndex || isDelivered;
            const active = i === currentIndex && !isDelivered;
            return (
              <li key={step.status} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border-2",
                      done || active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="size-3.5" /> : i + 1}
                  </span>
                  {i < STEPS.length - 1 ? (
                    <span className={cn("w-0.5 flex-1", done ? "bg-primary" : "bg-border")} style={{ minHeight: 28 }} />
                  ) : null}
                </div>
                <div className={cn("pb-7 text-sm", done || active ? "font-medium" : "text-muted-foreground")}>
                  {step.label}
                </div>
              </li>
            );
          })}
        </ol>

        {!isDelivered ? (
          <Button className="w-full" size="lg" onClick={advance}>
            Mark as {nextStep?.label.toLowerCase()}
          </Button>
        ) : (
          <p className="rounded-2xl bg-success/10 p-3 text-center text-sm font-medium text-success">
            Delivered — nice work!
          </p>
        )}
      </Card>

      <Card className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Store className="size-4" />
          </div>
          <div>
            <p className="font-medium">{restaurant?.name}</p>
            <p className="text-sm text-muted-foreground">{restaurant?.address}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MapPin className="size-4" />
          </div>
          <div>
            <p className="font-medium">{order.customerName}</p>
            <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
          </div>
          <Button variant="outline" size="icon" className="ml-auto" aria-label="Call customer">
            <Phone className="size-4" />
          </Button>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="font-heading font-semibold">Order items</h2>
        <ul className="mt-2 space-y-1.5 text-sm">
          {order.items.map((item) => (
            <li key={item.menuItemId} className="flex justify-between text-muted-foreground">
              <span>{item.quantity} × {item.name}</span>
              <span className="tabular-nums">{formatMoney(item.priceCents * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Button variant="ghost" className="w-full" onClick={() => navigate("/rider")}>
        <Navigation className="size-4" />
        Back to dashboard
      </Button>
    </div>
  );
}
