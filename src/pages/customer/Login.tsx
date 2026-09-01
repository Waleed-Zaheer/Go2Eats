import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { useSessionStore } from "@/store/session-store";
import { AuthLayout } from "@/components/shared/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const signIn = useSessionStore((s) => s.signInCustomer);
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const name = email.split("@")[0] || "Guest";
    signIn(name.charAt(0).toUpperCase() + name.slice(1));
    toast.success("Welcome back!");
    const from = (location.state as { from?: string } | null)?.from ?? "/";
    navigate(from);
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to track orders and reorder your favorites."
      panelTitle="Craving something?"
      panelBody="Sign in to pick up right where you left off — saved addresses, past orders, and favorite spots."
      panelIcon={UtensilsCrossed}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="••••••••" required />
          </Field>
        </FieldGroup>
        <Button type="submit" className="w-full" size="lg">
          Sign in
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        New to GotoEats?{" "}
        <Link to="/signup" className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
