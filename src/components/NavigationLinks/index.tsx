"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import {
  getActiveNavigationHref,
  USER_NAV_ITEMS,
} from "@/components/NavigationLinks/items";
function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}
export default function NavigationLinks({
  orientation = "horizontal",
  onNavigate,
}: {
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hash = useSyncExternalStore(
    subscribeHash,
    () => window.location.hash,
    () => "",
  );
  // A query chega no HTML inicial; o fragmento só fica disponível no navegador.
  const activeHref = getActiveNavigationHref(
    pathname,
    hash,
    searchParams.get("secao"),
  );
  return (
    <nav
      aria-label={
        orientation === "vertical" ? "Menu móvel" : "Navegação principal"
      }
    >
      <ul className={`nav-list nav-${orientation}`}>
        {USER_NAV_ITEMS.map((item) => {
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={item.href === activeHref ? "page" : undefined}
                className={`nav-link ${item.href === activeHref ? "nav-link-active" : ""}`}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
