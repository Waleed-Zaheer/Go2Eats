import { Link, Navigate, useNavigate } from "react-router-dom";
import { Bike } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { useSessionStore } from "@/store/session-store";
import { DEMO_RIDER_ID, RIDERS } from "@/lib/mock-data";
import { AuthLayout } from "@/components/shared/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function RiderLogin() {
  const navigate = useNavigate();
  const riderId = useSessionStore((s) => s.riderId);
  const signIn = useSessionStore((s) => s.signInRider);

  if (riderId) return <Navigate to="/rider" replace />;
  const demo = RIDERS.find((r) => r.id === DEMO_RIDER_ID)!;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    signIn();
    toast.success(`Signed in as ${demo.name}`);
    navigate("/rider");
  }

  return (
    <AuthLayout
      title="Rider portal"
      subtitle="Go online and start delivering."
      panelTitle="Earn on your schedule"
      panelBody="Accept deliveries, track your earnings, and get paid weekly — all from your phone."
      panelIcon={Bike}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="rider-phone">Phone number</FieldLabel>
            <Input id="rider-phone" type="tel" defaultValue="+1 (555) 019-2231" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="rider-password">Password</FieldLabel>
            <Input id="rider-password" type="password" defaultValue="demo-password" required />
          </Field>
        </FieldGroup>
        <Button type="submit" className="w-full" size="lg">
          Sign in as {demo.name}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Demo mode — any credentials sign you in as {demo.name}.
        </p>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Looking for the diner app?{" "}
        <Link to="/" className="font-medium text-primary hover:underline">
          Go to GotoEats
        </Link>
      </p>
    </AuthLayout>
  );
}
