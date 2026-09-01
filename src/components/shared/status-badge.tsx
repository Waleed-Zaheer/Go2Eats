import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus, PartnerStatus, RiderStatus } from "@/lib/types";

const TONE = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-info/10 text-info dark:bg-info/15",
  warning: "bg-warning/15 text-warning-foreground dark:bg-warning/20",
  success: "bg-success/10 text-success dark:bg-success/15",
  destructive: "bg-destructive/10 text-destructive dark:bg-destructive/20",
} as const;

const ORDER_STATUS_META: Record<OrderStatus, { label: string; tone: keyof typeof TONE }> = {
  placed: { label: "Placed", tone: "neutral" },
  accepted: { label: "Accepted", tone: "info" },
  preparing: { label: "Preparing", tone: "warning" },
  ready: { label: "Ready for pickup", tone: "warning" },
  picked_up: { label: "Picked up", tone: "info" },
  out_for_delivery: { label: "Out for delivery", tone: "info" },
  delivered: { label: "Delivered", tone: "success" },
  cancelled: { label: "Cancelled", tone: "destructive" },
};

const PARTNER_STATUS_META: Record<PartnerStatus, { label: string; tone: keyof typeof TONE }> = {
  active: { label: "Active", tone: "success" },
  pending: { label: "Pending review", tone: "warning" },
  suspended: { label: "Suspended", tone: "destructive" },
};

const RIDER_STATUS_META: Record<RiderStatus, { label: string; tone: keyof typeof TONE }> = {
  online: { label: "Online", tone: "success" },
  busy: { label: "On delivery", tone: "warning" },
  offline: { label: "Offline", tone: "neutral" },
};

function ToneBadge({ label, tone, className }: { label: string; tone: keyof typeof TONE; className?: string }) {
  return (
    <Badge variant="outline" className={cn("border-transparent font-medium", TONE[tone], className)}>
      {label}
    </Badge>
  );
}

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  const meta = ORDER_STATUS_META[status];
  return <ToneBadge label={meta.label} tone={meta.tone} className={className} />;
}

export function PartnerStatusBadge({ status, className }: { status: PartnerStatus; className?: string }) {
  const meta = PARTNER_STATUS_META[status];
  return <ToneBadge label={meta.label} tone={meta.tone} className={className} />;
}

export function RiderStatusBadge({ status, className }: { status: RiderStatus; className?: string }) {
  const meta = RIDER_STATUS_META[status];
  return (
    <ToneBadge
      label={meta.label}
      tone={meta.tone}
      className={cn("gap-1.5 pl-1.5", className)}
    />
  );
}
