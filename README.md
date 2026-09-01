# GotoEats

A multi-restaurant food delivery marketplace — a customer-facing ordering app plus three
operator portals (restaurant, rider, admin), all in one Vite + React 19 + TypeScript SPA.

> **Status: fully designed and built as a frontend, on mock data — no backend yet.** Every
> screen below is real and working. What's missing is a server: there's no database, no auth
> provider, and no payment processor. State lives in [Zustand](https://zustand.docs.pmnd.rs/)
> stores backed by `localStorage`, seeded from `src/lib/mock-data.ts`. See
> [REQUIRED.md](./REQUIRED.md) for what a real backend would need to replace.

---

## What's here

| Area | Routes | What it does |
| --- | --- | --- |
| **Customer app** | `/`, `/restaurants`, `/restaurants/:slug`, `/checkout`, `/orders`, `/orders/:id`, `/login`, `/signup`, `/account` | Browse restaurants by cuisine/rating/delivery time, order from a menu, checkout, and track an order through a live status stepper. |
| **Restaurant portal** | `/restaurant/*` (behind `/restaurant/login`) | Dashboard with today's stats and an incoming-order queue, a drag-and-drop order Kanban board, menu management (add/edit/toggle availability), analytics charts, and restaurant settings. |
| **Rider portal** | `/rider/*` (behind `/rider/login`) | Go online, accept available deliveries, work an active delivery through pickup → en route → delivered, and view earnings/payout history. |
| **Admin console** | `/admin/*` (behind `/admin/login`) | Platform-wide GMV/order stats, approve or suspend restaurants and riders, a global order table, and customer management. |

All four areas are logged in via **demo auth** — the login forms are pre-filled and any
submission signs you in (as the seeded restaurant/rider, or as a platform admin). There's no
real password check because there's no backend to check it against.

Placing an order, accepting it in the restaurant portal, picking it up as a rider, and
approving/suspending a partner in the admin console all operate on the **same shared
in-memory state** (`src/store/orders-store.ts`, `src/store/partners-store.ts`), so actions in
one portal are visible in the others in real time within the same browser session.

---

## Design system

Built entirely on **[my-snippets](../my-snippets)** — this workspace's own hand-written
component registry (76 accessible components, no Radix, no shadcn package dependency) —
rather than stock shadcn/ui. See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for why that switch
was made.

- **Brand**: a warm coral/orange primary (`--primary`) on a soft warm-neutral ground, tuned
  specifically for GotoEats in `src/index.css` — not a reskin of my-snippets' own gold theme.
- **Fonts**: Public Sans (body) + Space Grotesk (headings), self-hosted via `@fontsource-variable`.
- **Illustration**: restaurant/menu imagery is deliberately *not* stock photography — each
  cuisine gets a distinct gradient + icon treatment (`src/lib/cuisine-art.tsx`) instead, so
  there's no broken-image risk and the look stays consistent in light and dark mode.
- **Charts**: the registry's own hand-rolled SVG bar-chart engine (no `recharts`).
- **Money**: stored as integer cents throughout (`priceCents`, `totalCents`, …), formatted at
  the edges with `src/lib/format.ts`.

## Getting started

```bash
npm install
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build
npm run lint     # eslint
npm run preview  # preview the production build
```

No environment variables are required — see [REQUIRED.md](./REQUIRED.md).

## Deploying

Configured for Vercel: `vercel.json` rewrites every path to `index.html` (this is a
client-side-routed SPA, so the platform needs to hand every URL to React Router rather than
404ing on a hard refresh of, say, `/restaurant/orders`). Vercel auto-detects the Vite
framework preset — no other configuration needed. Connect the repo and deploy.

## Layout

```text
Go2Eats/
├── src/
│   ├── components/
│   │   ├── ui/            components lifted from the my-snippets registry
│   │   ├── layout/         site header/footer, cart sheet, portal sidebar shell
│   │   ├── customer/       restaurant card, menu item row
│   │   └── shared/         stat card, status badges, page header, auth layout
│   ├── pages/
│   │   ├── customer/       Home, Restaurants, RestaurantDetail, Checkout, Orders, …
│   │   ├── restaurant/     Dashboard, Orders (Kanban), Menu, Analytics, Settings
│   │   ├── rider/          Dashboard, Delivery, Earnings
│   │   └── admin/          Dashboard, Restaurants, Riders, Orders, Users
│   ├── store/              cart, orders, partners, session — Zustand + localStorage
│   ├── lib/
│   │   ├── mock-data.ts    restaurants, menu items, orders, riders, customers
│   │   ├── types.ts, format.ts, cuisine-art.tsx
│   │   └── primitives/     headless hooks behind the ui/ components (focus trap, etc.)
│   ├── App.tsx             route tree
│   └── index.css           design tokens + custom Tailwind v4 variants
├── vercel.json
└── vite.config.ts
```
