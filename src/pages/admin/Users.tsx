import { useMemo, useState } from "react";
import { Ban, CheckCircle2, MoreHorizontal, Search } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { formatDay, formatMoney } from "@/lib/format";
import { CUSTOMERS } from "@/lib/mock-data";
import type { Customer } from "@/lib/types";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function AdminUsers() {
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
  }, [customers, query]);

  function setBlocked(id: string, blocked: boolean, name: string) {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, status: blocked ? "blocked" : "active" } : c)));
    toast[blocked ? "error" : "success"](blocked ? `${name} blocked` : `${name} unblocked`);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description={`${customers.length} registered diners`} />

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customers" className="pl-9" />
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-primary/15 text-xs text-primary">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDay(c.joinedAt)}</TableCell>
                  <TableCell className="tabular-nums">{c.ordersCount}</TableCell>
                  <TableCell className="tabular-nums">{formatMoney(c.totalSpentCents)}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === "active" ? "outline" : "destructive"} className={c.status === "active" ? "border-transparent bg-success/10 text-success" : undefined}>
                      {c.status === "active" ? "Active" : "Blocked"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${c.name}`}>
                            <MoreHorizontal className="size-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        {c.status === "active" ? (
                          <DropdownMenuItem variant="destructive" onClick={() => setBlocked(c.id, true, c.name)}>
                            <Ban />
                            Block customer
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => setBlocked(c.id, false, c.name)}>
                            <CheckCircle2 />
                            Unblock customer
                          </DropdownMenuItem>
                        )}
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
