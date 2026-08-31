# Go2Eats

> **Status: scaffold only — no application code yet.**
>
> The toolchain, design system, and fonts are set up and working, but `src/App.tsx` is still
> placeholder text. Nothing about the product has been built. This README describes what is
> actually here today rather than an intended product, so it doesn't mislead a future reader
> (including you, in six months).

---

## What exists

A Vite + React 19 + TypeScript project with a complete shadcn/ui component layer installed
and a custom font pairing configured. It builds and lints, and the dev server runs — there is
just no application on top of it yet.

| Piece | State |
| --- | --- |
| Build toolchain | Vite 7 + React 19 + TypeScript 5.9, SWC Fast Refresh |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, `tw-animate-css` |
| Component library | **30 shadcn/ui components** installed in `src/components/ui/` |
| Primitives | Radix UI (`radix-ui` package), `class-variance-authority`, `tailwind-merge` |
| Icons | `lucide-react` |
| Theming | `next-themes` (light/dark), `sonner` for toasts |
| Fonts | Delius and Inconsolata, self-hosted in `src/fonts/` |
| Linting | ESLint 9 flat config with `typescript-eslint`, react-hooks, react-refresh |
| Application code | **None.** `App.tsx` renders three lines of placeholder text. |

### Installed components

`accordion` `alert` `alert-dialog` `avatar` `badge` `breadcrumb` `button` `card` `checkbox`
`dialog` `dropdown-menu` `input` `label` `navigation-menu` `scroll-area` `select` `separator`
`sheet` `sidebar` `skeleton` `slider` `sonner` `spinner` `switch` `table` `tabs` `textarea`
`toggle` `toggle-group` `tooltip`

Notably this includes `sidebar` and `navigation-menu`, which suggests an app-shell layout was
the intended direction.

---

## Architecture

There isn't one yet — and that's the honest answer. What has been *decided* implicitly by the
dependency choices:

- **Client-only SPA.** Vite with no server, no router, and no data-fetching library installed.
  Adding routing (`react-router`) and a server or API client are still open decisions.
- **shadcn/ui conventions.** Components are owned in-repo (`src/components/ui/`) rather than
  imported from a package, so they're yours to modify. `src/lib/utils.ts` provides the
  standard `cn()` helper.
- **No state management, no forms, no validation** libraries are installed yet.

If this becomes a real food-ordering product, the decisions still to make are: routing,
where the menu/restaurant data comes from, auth, and cart/order state.

---

## Getting started

```bash
npm install
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build
npm run lint     # eslint
npm run preview  # preview the production build
```

No environment variables and no services are required — see [REQUIRED.md](./REQUIRED.md).

---

## Layout

```text
Go2Eats/
├── src/
│   ├── components/
│   │   ├── ui/          30 shadcn/ui components
│   │   └── variants.tsx
│   ├── fonts/           Delius, Inconsolata (self-hosted)
│   ├── hooks/use-mobile.ts
│   ├── lib/utils.ts     cn()
│   ├── App.tsx          ← placeholder
│   └── main.tsx
├── eslint.config.js
└── vite.config.ts
```
