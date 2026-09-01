import { Link, Navigate, useParams } from "react-router-dom";
import {
  Bike,
  Check,
  ChefHat,
  CircleDot,
  PackageCheck,
  PartyPopper,
  Phone,
  Receipt,
  Star,
  Store,
  XCircle,
} from "lucide-react";

import { formatClock, formatMoney } from "@/lib/format";
import { RIDERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ORDER_STATUS_SEQUENCE, useOrdersStore } from "@/store/orders-store";
import type { OrderStatus } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/shared/status-badge";

const STEP_META: Record<OrderStatus, { label: string; icon: typeof Check }> = {
  placed: { label: "Order placed", icon: Receipt },
  accepted: { label: "Restaurant accepted", icon: Store },
  preparing: { label: "Preparing your food", icon: ChefHat },
  ready: { label: "Ready for pickup", icon: PackageCheck },
  picked_up: { label: "Rider picked up", icon: Bike },
  out_for_delivery: { label: "Out for delivery", icon: Bike },
  delivered: { label: "Delivered", icon: PartyPopper },
  cancelled: { label: "Cancelled", icon: XCircle },
};

export default function OrderTracking() {
  const { id } = useParams();
  const order = useOrdersStore((s) => s.orders.find((o) => o.id === id));

  if (!order) return <Navigate to="/orders" replace />;

  const rider = order.riderId ? RIDERS.find((r) => r.id === order.riderId) : undefined;
  const currentIndex = ORDER_STATUS_SEQUENCE.indexOf(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Order {order.id}</p>
          <h1 className="font-heading text-2xl font-semibold">{order.restaurantName}</h1>
        </div>
        <OrderStatusBadge status={order.status} className="h-6 px-3 text-sm" />
      </div>

      {!isCancelled ? (
        <Card className="mt-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Estimated arrival</p>
              <p className="font-heading text-xl font-semibold">
                {order.status === "delivered" ? "Delivered" : `${order.etaMins} min`}
              </p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bike className="size-6" />
            </div>
          </div>

          <ol className="mt-6 space-y-0">
            {ORDER_STATUS_SEQUENCE.map((status, i) => {
              const meta = STEP_META[status];
              const done = i < currentIndex || order.status === "delivered";
              const active = i === currentIndex && order.status !== "delivered";
              return (
                <li key={status} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border-2",
                        done || active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="size-3.5" /> : <meta.icon className="size-3.5" />}
                    </span>
                    {i < ORDER_STATUS_SEQUENCE.length - 1 ? (
                      <span className={cn("w-0.5 flex-1 py-1", done ? "bg-primary" : "bg-border")} style={{ minHeight: 28 }} />
                    ) : null}
                  </div>
                  <div className={cn("pb-7 text-sm", done || active ? "font-medium" : "text-muted-foreground")}>
                    {meta.label}
                    {active ? <p className="mt-0.5 text-xs font-normal text-muted-foreground">In progress…</p> : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>
      ) : (
        <Card className="mt-6 flex items-center gap-4 p-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <XCircle className="size-6" />
          </div>
          <div>
            <p className="font-medium">This order was cancelled</p>
            <p className="text-sm text-muted-foreground">No charge was made. You can reorder any time.</p>
          </div>
        </Card>
      )}

      {rider && !isCancelled && order.status !== "delivered" ? (
        <Card className="mt-4 flex items-center gap-4 p-5">
          <Avatar className="size-11">
            <AvatarFallback className="bg-primary/15 text-primary">
              {rider.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">{rider.name}</p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="size-3.5 fill-primary text-primary" />
              {rider.rating.toFixed(2)} · {rider.vehicle}
            </p>
          </div>
          <Button variant="outline" size="icon" aria-label="Call rider">
            <Phone className="size-4" />
          </Button>
        </Card>
      ) : null}

      <Card className="mt-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold">Order summary</h2>
          <span className="text-xs text-muted-foreground">{formatClock(order.createdAt)}</span>
        </div>
        <ul className="mt-3 space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.menuItemId} className="flex justify-between">
              <span className="text-muted-foreground">{item.quantity} × {item.name}</span>
              <span className="tabular-nums">{formatMoney(item.priceCents * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-3" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Delivery fee</span>
          <span>{formatMoney(order.deliveryFeeCents)}</span>
        </div>
        <div className="mt-1 flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatMoney(order.totalCents)}</span>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CircleDot className="size-3" />
          Delivering to {order.deliveryAddress}
        </p>
      </Card>

      <div className="mt-6 flex justify-center">
        <Button variant="ghost" render={<Link to="/orders">Back to your orders</Link>} />
      </div>
    </div>
  );
}
