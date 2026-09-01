import { useMemo, useState } from "react";
import { Ban, CheckCircle2, MoreHorizontal, Search, Star } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { formatDay, formatMoney } from "@/lib/format";
import { usePartnersStore } from "@/store/partners-store";
import { PageHeader } from "@/components/shared/page-header";
import { PartnerStatusBadge, RiderStatusBadge } from "@/components/shared/status-badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminRiders() {
  const riders = usePartnersStore((s) => s.riders);
  const setStatus = usePartnersStore((s) => s.setRiderStatus);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return riders;
    return riders.filter((r) => r.name.toLowerCase().includes(q));
  }, [riders, query]);

  function approve(id: string, name: string) {
    setStatus(id, "active");
    toast.success(`${name} approved`);
  }
  function suspend(id: string, name: string) {
    setStatus(id, "suspended");
    toast.error(`${name} suspended`);
  }
  function reactivate(id: string, name: string) {
    setStatus(id, "active");
    toast.success(`${name} reactivated`);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Riders" description={`${riders.length} riders on the platform`} />

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search riders" className="pl-9" />
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rider</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Deliveries</TableHead>
                <TableHead>Earned today</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-primary/15 text-xs text-primary">
                          {r.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{r.name}</p>
                        <p className="text-xs text-muted-foreground">Joined {formatDay(r.joinedAt)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground capitalize">{r.vehicle}</TableCell>
                  <TableCell className="tabular-nums">
                    <span className="flex items-center gap-1">
                      <Star className="size-3.5 fill-primary text-primary" />
                      {r.rating.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="tabular-nums">{r.completedDeliveries.toLocaleString()}</TableCell>
                  <TableCell className="tabular-nums">{formatMoney(r.earningsTodayCents)}</TableCell>
                  <TableCell><RiderStatusBadge status={r.status} /></TableCell>
                  <TableCell><PartnerStatusBadge status={r.partnerStatus} /></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${r.name}`}>
                            <MoreHorizontal className="size-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        {r.partnerStatus === "pending" ? (
                          <DropdownMenuItem onClick={() => approve(r.id, r.name)}>
                            <CheckCircle2 />
                            Approve
                          </DropdownMenuItem>
                        ) : null}
                        {r.partnerStatus === "active" ? (
                          <DropdownMenuItem variant="destructive" onClick={() => suspend(r.id, r.name)}>
                            <Ban />
                            Suspend
                          </DropdownMenuItem>
                        ) : null}
                        {r.partnerStatus === "suspended" ? (
                          <DropdownMenuItem onClick={() => reactivate(r.id, r.name)}>
                            <CheckCircle2 />
                            Reactivate
                          </DropdownMenuItem>
                        ) : null}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
