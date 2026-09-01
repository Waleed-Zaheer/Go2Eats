import { useMemo, useState } from "react";
import { Ban, CheckCircle2, MoreHorizontal, Search } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { formatDay } from "@/lib/format";
import { usePartnersStore } from "@/store/partners-store";
import { PageHeader } from "@/components/shared/page-header";
import { PartnerStatusBadge } from "@/components/shared/status-badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
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

export default function AdminRestaurants() {
  const restaurants = usePartnersStore((s) => s.restaurants);
  const setStatus = usePartnersStore((s) => s.setRestaurantStatus);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return restaurants;
    return restaurants.filter(
      (r) => r.name.toLowerCase().includes(q) || r.ownerName.toLowerCase().includes(q),
    );
  }, [restaurants, query]);

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
      <PageHeader title="Restaurants" description={`${restaurants.length} partners on the platform`} />

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search restaurants or owners" className="pl-9" />
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restaurant</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Joined</TableHead>
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
                          {r.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{r.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{r.cuisines.join(", ")}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.ownerName}</TableCell>
                  <TableCell className="tabular-nums">{r.rating.toFixed(1)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDay(r.joinedAt)}</TableCell>
                  <TableCell><PartnerStatusBadge status={r.status} /></TableCell>
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
                        {r.status === "pending" ? (
                          <DropdownMenuItem onClick={() => approve(r.id, r.name)}>
                            <CheckCircle2 />
                            Approve
                          </DropdownMenuItem>
                        ) : null}
                        {r.status === "active" ? (
                          <DropdownMenuItem variant="destructive" onClick={() => suspend(r.id, r.name)}>
                            <Ban />
                            Suspend
                          </DropdownMenuItem>
                        ) : null}
                        {r.status === "suspended" ? (
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
