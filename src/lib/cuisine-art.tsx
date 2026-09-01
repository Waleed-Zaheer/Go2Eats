import {
  Beef,
  Cake,
  ChefHat,
  Coffee,
  Fish,
  Flame,
  Leaf,
  Pizza,
  Salad,
  Sandwich,
  Soup,
  type LucideIcon,
} from "lucide-react";

import type { Cuisine } from "@/lib/types";

type CuisineArt = {
  label: string;
  icon: LucideIcon;
  gradient: string;
  tint: string;
};

export const CUISINE_ART: Record<Cuisine, CuisineArt> = {
  pizza: {
    label: "Pizza",
    icon: Pizza,
    gradient: "from-rose-200 via-orange-200 to-amber-100 dark:from-rose-950 dark:via-orange-950 dark:to-amber-950",
    tint: "text-rose-600 dark:text-rose-300",
  },
  burgers: {
    label: "Burgers",
    icon: Beef,
    gradient: "from-amber-200 via-orange-200 to-yellow-100 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950",
    tint: "text-amber-700 dark:text-amber-300",
  },
  sushi: {
    label: "Sushi",
    icon: Fish,
    gradient: "from-teal-200 via-cyan-100 to-sky-100 dark:from-teal-950 dark:via-cyan-950 dark:to-sky-950",
    tint: "text-teal-600 dark:text-teal-300",
  },
  italian: {
    label: "Italian",
    icon: ChefHat,
    gradient: "from-emerald-200 via-lime-100 to-yellow-100 dark:from-emerald-950 dark:via-lime-950 dark:to-yellow-950",
    tint: "text-emerald-700 dark:text-emerald-300",
  },
  indian: {
    label: "Indian",
    icon: Flame,
    gradient: "from-orange-200 via-red-200 to-amber-100 dark:from-orange-950 dark:via-red-950 dark:to-amber-950",
    tint: "text-orange-700 dark:text-orange-300",
  },
  chinese: {
    label: "Chinese",
    icon: Soup,
    gradient: "from-red-200 via-rose-100 to-orange-100 dark:from-red-950 dark:via-rose-950 dark:to-orange-950",
    tint: "text-red-600 dark:text-red-300",
  },
  mexican: {
    label: "Mexican",
    icon: Flame,
    gradient: "from-lime-200 via-yellow-100 to-orange-100 dark:from-lime-950 dark:via-yellow-950 dark:to-orange-950",
    tint: "text-lime-700 dark:text-lime-300",
  },
  salads: {
    label: "Salads",
    icon: Salad,
    gradient: "from-lime-200 via-emerald-100 to-teal-100 dark:from-lime-950 dark:via-emerald-950 dark:to-teal-950",
    tint: "text-emerald-700 dark:text-emerald-300",
  },
  desserts: {
    label: "Desserts",
    icon: Cake,
    gradient: "from-pink-200 via-fuchsia-100 to-rose-100 dark:from-pink-950 dark:via-fuchsia-950 dark:to-rose-950",
    tint: "text-pink-600 dark:text-pink-300",
  },
  coffee: {
    label: "Coffee",
    icon: Coffee,
    gradient: "from-stone-300 via-amber-100 to-orange-100 dark:from-stone-800 dark:via-amber-950 dark:to-orange-950",
    tint: "text-stone-700 dark:text-stone-300",
  },
  bbq: {
    label: "BBQ",
    icon: Beef,
    gradient: "from-red-300 via-orange-200 to-amber-100 dark:from-red-950 dark:via-orange-950 dark:to-amber-950",
    tint: "text-red-700 dark:text-red-300",
  },
  vegan: {
    label: "Vegan",
    icon: Leaf,
    gradient: "from-green-200 via-emerald-100 to-lime-100 dark:from-green-950 dark:via-emerald-950 dark:to-lime-950",
    tint: "text-green-700 dark:text-green-300",
  },
};

export const FALLBACK_ART: CuisineArt = {
  label: "Food",
  icon: Sandwich,
  gradient: "from-orange-200 via-amber-100 to-rose-100 dark:from-orange-950 dark:via-amber-950 dark:to-rose-950",
  tint: "text-orange-700 dark:text-orange-300",
};

export function getCuisineArt(cuisine?: Cuisine): CuisineArt {
  if (!cuisine) return FALLBACK_ART;
  return CUISINE_ART[cuisine] ?? FALLBACK_ART;
}

export function Dish({
  cuisine,
  className,
  iconClassName,
}: {
  cuisine?: Cuisine;
  className?: string;
  iconClassName?: string;
}) {
  const art = getCuisineArt(cuisine);
  const Icon = art.icon;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${art.gradient} ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,white,transparent_45%),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,white,transparent_88%),transparent_55%)]" />
      <Icon
        strokeWidth={1.4}
        className={`relative drop-shadow-sm ${art.tint} ${iconClassName ?? "size-10"}`}
      />
    </div>
  );
}
