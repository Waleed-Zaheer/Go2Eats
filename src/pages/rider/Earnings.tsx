import { Bike, Clock3, TrendingUp, Wallet } from "lucide-react";

import { formatMoney } from "@/lib/format";
import { RIDERS } from "@/lib/mock-data";
import { useSessionStore } from "@/store/session-store";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  XAxis,
  type ChartConfig,
} from "@/components/ui/chart";

const WEEK_EARNINGS = [
  { day: "Mon", earnings: 62 },
  { day: "Tue", earnings: 58 },
  { day: "Wed", earnings: 74 },
  { day: "Thu", earnings: 69 },
  { day: "Fri", earnings: 91 },
  { day: "Sat", earnings: 108 },
  { day: "Sun", earnings: 86 },
];

const config = {
  earnings: { label: "Earnings ($)", color: "var(--primary)" },
} satisfies ChartConfig;

const PAYOUTS = [
  { id: "PO-3391", period: "Jun 30 – Jul 6", deliveries: 46, amount: 54800, status: "Paid" },
  { id: "PO-3372", period: "Jun 23 – Jun 29", deliveries: 51, amount: 61200, status: "Paid" },
  { id: "PO-3350", period: "Jun 16 – Jun 22", deliveries: 39, amount: 47100, status: "Paid" },
];

export default function RiderEarnings() {
  const riderId = useSessionStore((s) => s.riderId)!;
  const rider = RIDERS.find((r) => r.id === riderId)!;
  const weekTotal = WEEK_EARNINGS.reduce((sum, d) => sum + d.earnings, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Earnings" description="Your payouts and delivery performance." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="This week" value={formatMoney(weekTotal * 100)} icon={Wallet} trend={{ value: "11%", direction: "up" }} />
        <StatCard label="Total deliveries" value={rider.completedDeliveries.toLocaleString()} icon={Bike} />
        <StatCard label="Avg. per delivery" value="$6.40" icon={TrendingUp} />
        <StatCard label="Active hours" value="27h" icon={Clock3} />
      </div>

      <Card className="p-5">
        <h2 className="font-heading font-semibold">Earnings this week</h2>
        <ChartContainer config={config} className="mt-4 aspect-auto h-64 w-full">
          <BarChart data={WEEK_EARNINGS}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="earnings" fill="var(--color-earnings)" radius={6} />
          </BarChart>
        </ChartContainer>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payout</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Deliveries</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PAYOUTS.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.id}</TableCell>
                  <TableCell className="text-muted-foreground">{p.period}</TableCell>
                  <TableCell className="text-muted-foreground">{p.deliveries}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatMoney(p.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
