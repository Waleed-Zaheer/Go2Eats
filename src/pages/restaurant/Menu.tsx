import { useState } from "react";
import { Flame, Leaf, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

import { formatMoney } from "@/lib/format";
import { MENU_CATEGORIES, getMenuItemsFor } from "@/lib/mock-data";
import { useSessionStore } from "@/store/session-store";
import type { MenuItem } from "@/lib/types";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function emptyItem(restaurantId: string): MenuItem {
  return {
    id: `m-new-${Date.now()}`,
    restaurantId,
    categoryId: MENU_CATEGORIES[0].id,
    name: "",
    description: "",
    priceCents: 0,
    isVeg: false,
    available: true,
  };
}

export default function RestaurantMenu() {
  const restaurantId = useSessionStore((s) => s.restaurantId)!;
  const [items, setItems] = useState<MenuItem[]>(() => getMenuItemsFor(restaurantId));
  const [editing, setEditing] = useState<MenuItem | null>(null);

  function toggleAvailable(id: string, available: boolean) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, available } : i)));
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Item removed from menu");
  }

  function saveItem(item: MenuItem) {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      return exists ? prev.map((i) => (i.id === item.id ? item : i)) : [item, ...prev];
    });
    toast.success(`Saved "${item.name}"`);
    setEditing(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Menu"
        description={`${items.length} items across ${MENU_CATEGORIES.length} categories`}
        actions={
          <Button onClick={() => setEditing(emptyItem(restaurantId))}>
            <Plus className="size-4" />
            Add item
          </Button>
        }
      />

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {item.isVeg ? <Leaf className="size-3.5 text-success" /> : null}
                      <span className="font-medium">{item.name}</span>
                      {item.isPopular ? <Badge variant="secondary">Popular</Badge> : null}
                      {item.spicyLevel ? <Flame className="size-3.5 text-destructive" /> : null}
                    </div>
                    <p className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">{item.description}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {MENU_CATEGORIES.find((c) => c.id === item.categoryId)?.name}
                  </TableCell>
                  <TableCell className="tabular-nums">{formatMoney(item.priceCents)}</TableCell>
                  <TableCell>
                    <Switch checked={item.available} onCheckedChange={(v) => toggleAvailable(item.id, v)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => setEditing(item)} aria-label={`Edit ${item.name}`}>
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-md">
          {editing ? (
            <MenuItemForm key={editing.id} item={editing} onSave={saveItem} />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MenuItemForm({ item, onSave }: { item: MenuItem; onSave: (item: MenuItem) => void }) {
  const [draft, setDraft] = useState(item);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
    >
      <DialogHeader>
        <DialogTitle>{item.name ? "Edit item" : "Add menu item"}</DialogTitle>
      </DialogHeader>

      <FieldGroup className="py-4">
        <Field>
          <FieldLabel htmlFor="item-name">Name</FieldLabel>
          <Input
            id="item-name"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="item-description">Description</FieldLabel>
          <Textarea
            id="item-description"
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="item-price">Price (USD)</FieldLabel>
            <Input
              id="item-price"
              type="number"
              step="0.01"
              min="0"
              value={(draft.priceCents / 100).toFixed(2)}
              onChange={(e) => setDraft({ ...draft, priceCents: Math.round(Number(e.target.value) * 100) })}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="item-category">Category</FieldLabel>
            <Select value={draft.categoryId} onValueChange={(v) => setDraft({ ...draft, categoryId: v })}>
              <SelectTrigger id="item-category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MENU_CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="item-veg"
            checked={draft.isVeg}
            onCheckedChange={(v) => setDraft({ ...draft, isVeg: v === true })}
          />
          <FieldLabel htmlFor="item-veg" className="font-normal">Vegetarian</FieldLabel>
        </div>
      </FieldGroup>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline">Cancel</Button>} />
        <Button type="submit">Save item</Button>
      </DialogFooter>
    </form>
  );
}
