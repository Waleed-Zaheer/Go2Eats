import { Link, Navigate, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { useSessionStore } from "@/store/session-store";
import { AuthLayout } from "@/components/shared/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function AdminLogin() {
  const navigate = useNavigate();
  const isAdmin = useSessionStore((s) => s.isAdmin);
  const signIn = useSessionStore((s) => s.signInAdmin);

  if (isAdmin) return <Navigate to="/admin" replace />;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    signIn();
    toast.success("Signed in to the admin console");
    navigate("/admin");
  }

  return (
    <AuthLayout
      title="Admin console"
      subtitle="Run the GotoEats marketplace."
      panelTitle="Full platform control"
      panelBody="Approve restaurants and riders, monitor live orders, and keep the marketplace healthy."
      panelIcon={ShieldCheck}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="admin-email">Admin email</FieldLabel>
            <Input id="admin-email" type="email" defaultValue="admin@gotoeats.com" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="admin-password">Password</FieldLabel>
            <Input id="admin-password" type="password" defaultValue="demo-password" required />
          </Field>
        </FieldGroup>
        <Button type="submit" className="w-full" size="lg">
          Sign in
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Demo mode — any credentials sign you in to the admin console.
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
