import { useState } from "react";
import { toast } from "@/components/ui/sonner";

import { getRestaurantById } from "@/lib/mock-data";
import { useSessionStore } from "@/store/session-store";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";

export default function RestaurantSettings() {
  const restaurantId = useSessionStore((s) => s.restaurantId)!;
  const restaurant = getRestaurantById(restaurantId)!;
  const [isOpen, setIsOpen] = useState(restaurant.isOpen);
  const [autoAccept, setAutoAccept] = useState(false);

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Settings" description="Manage your restaurant profile and preferences." />

      <Card className="p-5">
        <h2 className="font-heading font-semibold">Restaurant profile</h2>
        <FieldGroup className="mt-4">
          <Field>
            <FieldLabel htmlFor="rest-name">Restaurant name</FieldLabel>
            <Input id="rest-name" defaultValue={restaurant.name} />
          </Field>
          <Field>
            <FieldLabel htmlFor="rest-address">Address</FieldLabel>
            <Input id="rest-address" defaultValue={restaurant.address} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="rest-fee">Delivery fee (USD)</FieldLabel>
              <Input id="rest-fee" type="number" step="0.01" defaultValue={(restaurant.deliveryFeeCents / 100).toFixed(2)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="rest-min">Minimum order (USD)</FieldLabel>
              <Input id="rest-min" type="number" step="0.01" defaultValue={(restaurant.minOrderCents / 100).toFixed(2)} />
            </Field>
          </div>
        </FieldGroup>
      </Card>

      <Card className="p-5">
        <h2 className="font-heading font-semibold">Availability</h2>
        <FieldGroup className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="open-toggle">Accepting orders</Label>
              <FieldDescription>Turn off to pause new orders temporarily.</FieldDescription>
            </div>
            <Switch id="open-toggle" checked={isOpen} onCheckedChange={setIsOpen} />
          </div>
          <FieldSeparator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-accept">Auto-accept orders</Label>
              <FieldDescription>Skip manual review for incoming orders.</FieldDescription>
            </div>
            <Switch id="auto-accept" checked={autoAccept} onCheckedChange={setAutoAccept} />
          </div>
        </FieldGroup>
      </Card>

      <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
    </div>
  );
}
