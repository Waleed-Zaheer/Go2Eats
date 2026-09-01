import { Link } from "react-router-dom";
import { PackageSearch } from "lucide-react";

import { formatDay, formatMoney } from "@/lib/format";
import { useOrdersStore } from "@/store/orders-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/shared/status-badge";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function Orders() {
  const orders = useOrdersStore((s) => s.orders);
  const sorted = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-semibold">Your orders</h1>

      {sorted.length === 0 ? (
        <Empty className="mt-10 border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PackageSearch />
            </EmptyMedia>
            <EmptyTitle>No orders yet</EmptyTitle>
            <EmptyDescription>Once you place an order, it'll show up here.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" render={<Link to="/restaurants">Browse restaurants</Link>} />
          </EmptyContent>
        </Empty>
      ) : (
        <div className="mt-6 space-y-3">
          {sorted.map((order) => (
            <Link key={order.id} to={`/orders/${order.id}`}>
              <Card className="flex-row items-center gap-4 p-4 transition-shadow hover:shadow-md">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-medium">{order.restaurantName}</h3>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDay(order.createdAt)} · {order.id}
                  </p>
                </div>
                <span className="shrink-0 font-medium tabular-nums">{formatMoney(order.totalCents)}</span>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
