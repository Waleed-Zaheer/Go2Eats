import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { CUISINE_ART } from "@/lib/cuisine-art";
import { usePartnersStore } from "@/store/partners-store";
import type { Cuisine } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RestaurantCard } from "@/components/customer/restaurant-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

type SortKey = "rating" | "delivery" | "distance";

export default function Restaurants() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const initialCuisine = params.get("cuisine") as Cuisine | null;
  const [cuisines, setCuisines] = useState<Set<Cuisine>>(
    initialCuisine ? new Set([initialCuisine]) : new Set(),
  );
  const [sort, setSort] = useState<SortKey>("rating");
  const [openOnly, setOpenOnly] = useState(false);
  const allRestaurants = usePartnersStore((s) => s.restaurants);

  function toggleCuisine(c: Cuisine) {
    setCuisines((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }

  const results = useMemo(() => {
    let list = allRestaurants.filter((r) => r.status === "active");
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (r) => r.name.toLowerCase().includes(q) || r.cuisines.some((c) => c.includes(q)),
      );
    }
    if (cuisines.size) {
      list = list.filter((r) => r.cuisines.some((c) => cuisines.has(c)));
    }
    if (openOnly) list = list.filter((r) => r.isOpen);

    return [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "delivery") return a.deliveryTimeMins[0] - b.deliveryTimeMins[0];
      return a.distanceKm - b.distanceKm;
    });
  }, [allRestaurants, query, cuisines, sort, openOnly]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-semibold">Restaurants near you</h1>
        <p className="text-sm text-muted-foreground">{results.length} restaurants found</p>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setParams((p) => {
                if (e.target.value) p.set("q", e.target.value);
                else p.delete("q");
                return p;
              }, { replace: true });
            }}
            placeholder="Search restaurants or cuisines"
            className="h-11 rounded-full pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="h-11 w-44 rounded-full">
              <SlidersHorizontal className="size-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Top rated</SelectItem>
              <SelectItem value="delivery">Fastest delivery</SelectItem>
              <SelectItem value="distance">Nearest</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 rounded-full border border-border px-3.5 py-2">
            <Switch id="open-only" checked={openOnly} onCheckedChange={setOpenOnly} />
            <Label htmlFor="open-only" className="text-sm text-muted-foreground">
              Open now
            </Label>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.entries(CUISINE_ART) as [Cuisine, (typeof CUISINE_ART)[Cuisine]][]).map(([key, art]) => {
          const active = cuisines.has(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleCuisine(key)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-muted",
              )}
            >
              <art.icon className="size-3.5" strokeWidth={1.6} />
              {art.label}
              {active ? <X className="size-3" /> : null}
            </button>
          );
        })}
      </div>

      {results.length === 0 ? (
        <Empty className="mt-16 border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>No restaurants match your filters</EmptyTitle>
            <EmptyDescription>Try a different search term or clear a filter.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery("");
                setCuisines(new Set());
                setOpenOnly(false);
              }}
            >
              Reset filters
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}
    </div>
  );
}
