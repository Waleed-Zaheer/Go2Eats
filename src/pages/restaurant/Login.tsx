import { Link, Navigate, useNavigate } from "react-router-dom";
import { Store } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { useSessionStore } from "@/store/session-store";
import { DEMO_RESTAURANT_ID, getRestaurantById } from "@/lib/mock-data";
import { AuthLayout } from "@/components/shared/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function RestaurantLogin() {
  const navigate = useNavigate();
  const restaurantId = useSessionStore((s) => s.restaurantId);
  const signIn = useSessionStore((s) => s.signInRestaurant);

  if (restaurantId) return <Navigate to="/restaurant" replace />;
  const demo = getRestaurantById(DEMO_RESTAURANT_ID)!;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    signIn();
    toast.success(`Signed in as ${demo.name}`);
    navigate("/restaurant");
  }

  return (
    <AuthLayout
      title="Restaurant portal"
      subtitle="Manage your menu, orders, and analytics."
      panelTitle="Grow with GotoEats"
      panelBody="Real-time order alerts, menu management, and a dashboard built for busy kitchens."
      panelIcon={Store}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="r-email">Work email</FieldLabel>
            <Input id="r-email" type="email" defaultValue="owner@bellanapoli.com" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="r-password">Password</FieldLabel>
            <Input id="r-password" type="password" defaultValue="demo-password" required />
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
