import { Navigate, useNavigate } from "react-router-dom";
import { LogOut, Mail, MapPin, User } from "lucide-react";

import { useSessionStore } from "@/store/session-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle, ItemDescription } from "@/components/ui/item";

export default function Account() {
  const customerName = useSessionStore((s) => s.customerName);
  const signOut = useSessionStore((s) => s.signOutCustomer);
  const navigate = useNavigate();

  if (!customerName) return <Navigate to="/login" replace />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-semibold">Account</h1>

      <Card className="mt-6 flex-row items-center gap-4 p-5">
        <Avatar className="size-14">
          <AvatarFallback className="bg-primary/15 text-lg text-primary">
            {customerName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-heading font-semibold">{customerName}</p>
          <p className="text-sm text-muted-foreground">Member since today</p>
        </div>
      </Card>

      <Card className="mt-4 p-4">
        <ItemGroup>
          <Item variant="outline">
            <ItemMedia variant="icon">
              <User />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Full name</ItemTitle>
              <ItemDescription>{customerName}</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemMedia variant="icon">
              <Mail />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Email</ItemTitle>
              <ItemDescription>{customerName.toLowerCase()}@example.com</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemMedia variant="icon">
              <MapPin />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Saved address</ItemTitle>
              <ItemDescription>412 Elm Street, Apt 3B</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Card>

      <Button
        variant="outline"
        className="mt-6"
        onClick={() => {
          signOut();
          navigate("/");
        }}
      >
        <LogOut className="size-4" />
        Sign out
      </Button>
    </div>
  );
}
