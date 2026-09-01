import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";

import { formatMoney } from "@/lib/format";
import { Dish } from "@/lib/cuisine-art";
import type { Restaurant } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      to={`/restaurants/${restaurant.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-[4/3] w-full">
        <Dish cuisine={restaurant.cuisines[0]} className="size-full" iconClassName="size-14 transition-transform duration-300 group-hover:scale-110" />
        {restaurant.promoted ? (
          <Badge className="absolute top-3 left-3 shadow-sm">Promoted</Badge>
        ) : null}
        {!restaurant.isOpen ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-[1px]">
            <Badge variant="secondary" className="shadow-sm">Closed now</Badge>
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base leading-tight font-semibold">{restaurant.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
            <Star className="size-3.5 fill-primary text-primary" />
            {restaurant.rating.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground capitalize">
          {restaurant.cuisines.join(" · ")}
        </p>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {restaurant.deliveryTimeMins[0]}–{restaurant.deliveryTimeMins[1]} min
          </span>
          <span>{formatMoney(restaurant.deliveryFeeCents)} delivery</span>
          <span>{restaurant.distanceKm.toFixed(1)} km</span>
        </div>
      </div>
    </Link>
  );
}
