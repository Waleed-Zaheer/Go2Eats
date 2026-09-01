import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { useSessionStore } from "@/store/session-store";
import { AuthLayout } from "@/components/shared/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function Signup() {
  const navigate = useNavigate();
  const signIn = useSessionStore((s) => s.signInCustomer);
  const [name, setName] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    signIn(name || "Guest");
    toast.success("Account created — welcome to GotoEats!");
    navigate("/");
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Order from your favorite local restaurants in minutes."
      panelTitle="Join 2M+ diners"
      panelBody="Get exclusive deals, faster checkout, and live order tracking every time you order."
      panelIcon={Sparkles}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input id="name" placeholder="Ada Lovelace" value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
          <Field>
            <FieldLabel htmlFor="signup-email">Email</FieldLabel>
            <Input id="signup-email" type="email" placeholder="you@example.com" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="signup-password">Password</FieldLabel>
            <Input id="signup-password" type="password" placeholder="••••••••" required />
          </Field>
        </FieldGroup>
        <Button type="submit" className="w-full" size="lg">
          Create account
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
