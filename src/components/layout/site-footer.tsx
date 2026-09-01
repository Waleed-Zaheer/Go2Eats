import { Link } from "react-router-dom";
import { ChefHat, Globe, Mail, Phone } from "lucide-react";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { to: "/", label: "About GotoEats" },
      { to: "/", label: "Careers" },
      { to: "/", label: "Blog" },
    ],
  },
  {
    heading: "For diners",
    links: [
      { to: "/restaurants", label: "Browse restaurants" },
      { to: "/orders", label: "Track an order" },
      { to: "/login", label: "Sign in" },
    ],
  },
  {
    heading: "Partner portals",
    links: [
      { to: "/restaurant", label: "Restaurant portal" },
      { to: "/rider", label: "Rider portal" },
      { to: "/admin", label: "Admin console" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-5 lg:px-8">
        <div className="col-span-2 space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ChefHat className="size-4.5" />
            </span>
            <span className="font-heading text-lg font-semibold">GotoEats</span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            Warm food, fast — from the restaurants your neighborhood already loves.
          </p>
          <div className="flex items-center gap-4 pt-2 text-muted-foreground">
            <span className="flex items-center gap-1.5 text-sm">
              <Mail className="size-4" />
              hello@gotoeats.com
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <Phone className="size-4" />
              (555) 019-2200
            </span>
            <Globe className="size-4" />
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading} className="space-y-3">
            <h3 className="text-sm font-semibold">{col.heading}</h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        © {new Date().getFullYear()} GotoEats. All rights reserved.
      </div>
    </footer>
  );
}
