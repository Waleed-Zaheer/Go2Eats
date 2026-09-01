import { useMemo } from "react";
import { toast } from "@/components/ui/sonner";

import { formatMoney } from "@/lib/format";
import type { OrderStatus } from "@/lib/types";
import { useSessionStore } from "@/store/session-store";
import { useOrdersStore } from "@/store/orders-store";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Kanban,
  KanbanBoard,
  KanbanCard,
  KanbanColumn,
  KanbanColumnCount,
  KanbanColumnHeader,
  KanbanColumnList,
  KanbanColumnTitle,
} from "@/components/ui/kanban";

const COLUMNS: { id: OrderStatus; title: string }[] = [
  { id: "placed", title: "New" },
  { id: "accepted", title: "Accepted" },
  { id: "preparing", title: "Preparing" },
  { id: "ready", title: "Ready for pickup" },
  { id: "out_for_delivery", title: "Out for delivery" },
  { id: "delivered", title: "Completed" },
];

export default function RestaurantOrders() {
  const restaurantId = useSessionStore((s) => s.restaurantId)!;
  const allOrders = useOrdersStore((s) => s.orders);
  const orders = allOrders.filter((o) => o.restaurantId === restaurantId);
  const setStatus = useOrdersStore((s) => s.setStatus);

  const board = useMemo(() => {
    const map: Record<string, string[]> = Object.fromEntries(COLUMNS.map((c) => [c.id, []]));
    for (const order of orders) {
      if (order.status === "cancelled") continue;
      const column = order.status === "picked_up" ? "out_for_delivery" : order.status;
      map[column]?.push(order.id);
    }
    return map;
  }, [orders]);

  const cancelled = orders.filter((o) => o.status === "cancelled");

  function handleValueChange(next: Record<string, string[]>) {
    for (const column of COLUMNS) {
      for (const orderId of next[column.id] ?? []) {
        const order = orders.find((o) => o.id === orderId);
        if (!order) continue;
        const currentColumn = order.status === "picked_up" ? "out_for_delivery" : order.status;
        if (currentColumn !== column.id) {
          setStatus(orderId, column.id);
          toast.message(`${orderId} moved to "${column.title}"`);
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="Drag a card to update its status." />

      <Kanban value={board} onValueChange={handleValueChange} className="w-full">
        <KanbanBoard>
          {COLUMNS.map((column) => (
            <KanbanColumn key={column.id} id={column.id}>
              <KanbanColumnHeader>
                <KanbanColumnTitle>{column.title}</KanbanColumnTitle>
                <KanbanColumnCount />
              </KanbanColumnHeader>
              <KanbanColumnList>
                {(board[column.id] ?? []).map((orderId) => {
                  const order = orders.find((o) => o.id === orderId)!;
                  return (
                    <KanbanCard key={orderId} id={orderId}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{order.id}</p>
                        <span className="text-sm font-medium tabular-nums">{formatMoney(order.totalCents)}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{order.customerName}</p>
                      <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                        {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                      </p>
                    </KanbanCard>
                  );
                })}
              </KanbanColumnList>
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </Kanban>

      {cancelled.length > 0 ? (
        <div>
          <h2 className="mb-2 text-sm font-medium text-muted-foreground">Cancelled</h2>
          <div className="flex flex-wrap gap-2">
            {cancelled.map((o) => (
              <Badge key={o.id} variant="destructive">{o.id} · {o.customerName}</Badge>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
