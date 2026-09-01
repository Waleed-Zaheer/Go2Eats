import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bike, Clock3, MapPin, Search, ShieldCheck, Sparkles, Star, Store } from "lucide-react";

import { CUISINE_ART } from "@/lib/cuisine-art";
import { usePartnersStore } from "@/store/partners-store";
import { RestaurantCard } from "@/components/customer/restaurant-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const CUISINE_ENTRIES = Object.entries(CUISINE_ART);

const STEPS = [
  {
    icon: Search,
    title: "Find your craving",
    body: "Browse hundreds of local restaurants by cuisine, rating, or delivery time.",
  },
  {
    icon: Sparkles,
    title: "Customize & order",
    body: "Build your order, add notes, and check out in under a minute.",
  },
  {
    icon: Bike,
    title: "Track it live",
    body: "Watch your food go from the kitchen to your door in real time.",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const restaurants = usePartnersStore((s) => s.restaurants).filter((r) => r.status === "active");
  const promoted = restaurants.filter((r) => r.promoted);
  const topRated = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 8);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    navigate(query ? `/restaurants?q=${encodeURIComponent(query)}` : "/restaurants");
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--accent),transparent)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24 lg:px-8">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              <Sparkles className="size-3.5" />
              Now delivering in 12 neighborhoods
            </span>
            <h1 className="font-heading text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
              Food you love,
              <br />
              at your door — fast.
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              Order from the best local restaurants near you, and track every bite from kitchen to doorstep.
            </p>

            <form onSubmit={handleSearch} className="flex max-w-md flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search restaurants or dishes"
                  className="h-12 rounded-full pl-10"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 rounded-full px-6">
                Find food
              </Button>
            </form>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-primary text-primary" />
                4.8 average rating
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="size-4" />
                25 min average delivery
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                600+ restaurants
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {promoted.slice(0, 3).map((r, i) => {
              const art = CUISINE_ART[r.cuisines[0]];
              const Icon = art.icon;
              return (
                <div
                  key={r.id}
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${art.gradient} flex aspect-[3/4] flex-col justify-end p-3 shadow-sm ${i === 1 ? "translate-y-6" : ""}`}
                >
                  <Icon className={`absolute top-4 right-4 size-8 opacity-60 ${art.tint}`} strokeWidth={1.4} />
                  <span className="rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                    {r.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cuisines */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-xl font-semibold">What are you craving?</h2>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {CUISINE_ENTRIES.map(([key, art]) => {
            const Icon = art.icon;
            return (
              <Link
                key={key}
                to={`/restaurants?cuisine=${key}`}
                className="flex shrink-0 flex-col items-center gap-2"
              >
                <div className={`flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${art.gradient}`}>
                  <Icon className={`size-7 ${art.tint}`} strokeWidth={1.4} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{art.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Promoted */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-heading text-xl font-semibold">Featured on GotoEats</h2>
          <Link to="/restaurants" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promoted.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-2xl font-semibold">How GotoEats works</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center gap-3 text-center">
                <div className="relative flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="size-6" />
                  <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading font-semibold">{step.title}</h3>
                <p className="max-w-56 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top rated */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-heading text-xl font-semibold">Top rated near you</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topRated.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* Partner CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Card className="flex-row items-center gap-5 overflow-hidden p-6">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Store className="size-6" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-heading font-semibold">Own a restaurant?</h3>
              <p className="text-sm text-muted-foreground">Reach new customers and manage orders from one dashboard.</p>
            </div>
            <Button variant="outline" render={<Link to="/restaurant/login">Get started</Link>} />
          </Card>
          <Card className="flex-row items-center gap-5 overflow-hidden p-6">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Bike className="size-6" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-heading font-semibold">Deliver with GotoEats</h3>
              <p className="text-sm text-muted-foreground">Flexible hours, weekly payouts, and rider support.</p>
            </div>
            <Button variant="outline" render={<Link to="/rider/login">Start earning</Link>} />
          </Card>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          Verified restaurants · Secure checkout · 24/7 support
        </div>
      </section>
    </div>
  );
}
