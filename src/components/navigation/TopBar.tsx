"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { LogOut, Menu, X } from "lucide-react";

import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import UserCard from "@/components/common/UserCard";

interface NavigationItem {
  label: string;
  href: string;
  /** Força a comparação exata do caminho para marcar o item como ativo. */
  exact?: boolean;
}

interface TopBarUser {
  name: string;
  role?: string;
  avatarUrl?: string;
}

interface TopBarProps {
  /** "public": visitante não logado. "authenticated": usuário logado. */
  variant?: "public" | "authenticated";
  user?: TopBarUser;
  navItems?: NavigationItem[];
  onLogout?: () => void;
}

const DEFAULT_NAV_ITEMS: NavigationItem[] = [
  { label: "Início", href: "/" },
  { label: "Animais", href: "/animais" },
  { label: "Doações", href: "/doacoes" },
  { label: "Mensagens", href: "/mensagens" },
  { label: "Mapa", href: "/mapa" },
];

function NavLinks({
  items,
  orientation = "horizontal",
  ariaLabel,
}: {
  items: NavigationItem[];
  orientation?: "horizontal" | "vertical";
  ariaLabel: string;
}) {
  const pathname = usePathname();

  function isActive({ href, exact }: NavigationItem) {
    if (exact ?? href === "/") return pathname === href;

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav aria-label={ariaLabel}>
      <ul className={`nav-list nav-${orientation}`}>
        {items.map((item) => {
          const active = isActive(item);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link ${active ? "nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        .nav-list {
          display: flex;
          gap: 8px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nav-vertical {
          flex-direction: column;
        }

        .nav-list :global(.nav-link) {
          display: block;
          padding: 8px 16px;
          border-radius: var(--radii-md);
          color: var(--colors-textSecondary);
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          outline: none;
          transition: all 200ms ease;
        }

        .nav-list :global(.nav-link:hover) {
          color: var(--colors-primary);
        }

        .nav-list :global(.nav-link:focus-visible) {
          box-shadow: 0 0 0 3px var(--colors-primaryLight);
        }

        .nav-list :global(.nav-link-active) {
          background-color: var(--colors-adoptedBackground);
          color: var(--colors-primary);
          font-weight: 600;
        }
      `}</style>
    </nav>
  );
}

export default function TopBar({
  variant = "public",
  user,
  navItems = DEFAULT_NAV_ITEMS,
  onLogout,
}: TopBarProps) {
  const router = useRouter();
  const accountRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const authenticated = variant === "authenticated";

  useEffect(() => {
    if (!accountOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!accountRef.current?.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setAccountOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accountOpen]);

  return (
    <header className="topbar">
      <div
        className={`topbar-inner ${authenticated ? "topbar-inner-auth" : ""}`}
      >
        <div className="topbar-left">
          {authenticated && (
            <button
              type="button"
              className="topbar-toggle"
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="topbar-mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          <Logo />
        </div>

        {authenticated && (
          <div className="topbar-nav">
            <NavLinks items={navItems} ariaLabel="Navegação principal" />
          </div>
        )}

        {authenticated ? (
          <div className="topbar-actions" ref={accountRef}>
            {user && (
              <UserCard
                variant="compact"
                name={user.name}
                role={user.role}
                avatarUrl={user.avatarUrl}
                onClick={() => setAccountOpen((previous) => !previous)}
                aria-haspopup="menu"
                aria-expanded={accountOpen}
              />
            )}

            {accountOpen && (
              <div className="topbar-dropdown" role="menu">
                <button
                  type="button"
                  role="menuitem"
                  className="topbar-dropdown-item"
                  onClick={() => {
                    setAccountOpen(false);
                    onLogout?.();
                  }}
                >
                  <LogOut size={16} aria-hidden />
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="topbar-actions">
            <Button
              size="sm"
              variant="tertiary"
              fullWidth={false}
              onClick={() => router.push("/login")}
            >
              Entrar
            </Button>

            <span className="topbar-organizer">
              <Button
                size="sm"
                variant="secondary"
                fullWidth={false}
                onClick={() => router.push("/login?tipo=organizador")}
                style={{
                  backgroundColor: "var(--colors-background)",
                  border: "1px solid var(--colors-primaryLight)",
                  color: "var(--colors-primaryLight)",
                }}
              >
                Entrar como Organizador
              </Button>
            </span>
          </div>
        )}
      </div>

      {authenticated && menuOpen && (
        <div
          id="topbar-mobile-menu"
          className="topbar-mobile"
          onClick={() => setMenuOpen(false)}
        >
          <NavLinks
            items={navItems}
            orientation="vertical"
            ariaLabel="Menu móvel"
          />
        </div>
      )}

      <style jsx>{`
        .topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid var(--colors-border);
          background-color: var(--colors-background);
        }

        .topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          max-width: 1120px;
          height: 64px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .topbar-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: none;
          border-radius: var(--radii-md);
          background: transparent;
          color: var(--colors-textSecondary);
          cursor: pointer;
        }

        .topbar-toggle:hover {
          background-color: var(--colors-backgroundSecondary);
        }

        .topbar-toggle:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px var(--colors-primaryLight);
        }

        .topbar-nav {
          display: none;
        }

        .topbar-actions {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .topbar-organizer {
          display: none;
        }

        .topbar-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 168px;
          padding: 4px;
          border: 1px solid var(--colors-border);
          border-radius: var(--radii-lg);
          background-color: var(--colors-background);
          box-shadow: var(--shadows-md);
        }

        .topbar-dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 12px;
          border: none;
          border-radius: var(--radii-md);
          background: transparent;
          color: var(--colors-negative);
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .topbar-dropdown-item:hover {
          background-color: var(--colors-negativeBackground);
        }

        .topbar-dropdown-item:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px var(--colors-primaryLight);
        }

        .topbar-mobile {
          padding: 8px 16px 16px;
          border-top: 1px solid var(--colors-border);
          background-color: var(--colors-background);
          box-shadow: var(--shadows-md);
        }

        @media (min-width: 640px) {
          .topbar-organizer {
            display: block;
          }
        }

        @media (min-width: 768px) {
          .topbar-inner-auth {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
          }

          .topbar-inner-auth .topbar-actions {
            justify-self: end;
          }

          .topbar-nav {
            display: block;
          }

          .topbar-toggle,
          .topbar-mobile {
            display: none;
          }
        }

        @media (min-width: 1024px) {
          .topbar-inner {
            padding: 0 24px;
          }
        }
      `}</style>
    </header>
  );
}