"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";

import type { NavigationItem } from "@/config/navigation";

function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getActiveNavigationHref(
  items: NavigationItem[],
  pathname: string,
  hash: string,
  sectionName?: string | null,
) {
  const section = items.find(
    (item) =>
      pathname === "/public-portal" &&
      !!item.section &&
      item.section === (sectionName || hash.replace(/^#/, "")),
  );
  if (section) return section.href;

  return items
    .filter(
      (item) =>
        !item.href.includes("#") &&
        (item.paths || [item.href]).some(
          (route) =>
            pathname === route ||
            (!item.exact && pathname.startsWith(`${route}/`)),
        ),
    )
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
}

interface NavigationLinksProps {
  items: NavigationItem[];
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

export default function NavigationLinks({
  items,
  orientation = "horizontal",
  onNavigate,
}: NavigationLinksProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hash = useSyncExternalStore(
    subscribeHash,
    () => window.location.hash,
    () => "",
  );

  const activeHref = getActiveNavigationHref(
    items,
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
        {items.map((item) => (
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
        ))}
      </ul>
    </nav>
  );
}
