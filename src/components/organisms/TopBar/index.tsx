"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import Button from "@/components/atoms/Button";
import { toast } from "@/components/atoms/Toast";
import Logo from "@/components/atoms/Logo";
import UserCard from "@/components/molecules/UserCard";
import NavigationLinks from "@/components/molecules/NavigationLinks";
import {
  useAuth,
  PUBLIC_HOME,
  AUTHENTICATED_HOME,
} from "@/contexts/AuthContext";
import { topBarStyles } from "./styles";

function subscribeProfile(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("pethub:profile-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("pethub:profile-updated", callback);
  };
}
function getProfileSnapshot() {
  try {
    return localStorage.getItem("pethub:profile") || "";
  } catch {
    return "";
  }
}

// Organismo compartilhado: sessão, conta e navegação têm uma única fonte.
export default function TopBar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const profileSnapshot = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    () => "",
  );
  let name = user?.name ?? "Usuário";
  try {
    const profile = JSON.parse(profileSnapshot);
    if (typeof profile?.name === "string") name = profile.name;
  } catch {}
  const authenticated = isAuthenticated;
  const accountRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    if (!accountOpen && !menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAccountOpen(false);
        setMenuOpen(false);
      }
    }
    function closeAccount(event: PointerEvent) {
      if (!accountRef.current?.contains(event.target as Node))
        setAccountOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeAccount);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeAccount);
    };
  }, [accountOpen, menuOpen]);

  return (
    <header className={`${topBarStyles()} topbar`}>
      <div className="topbar-inner">
        <div className="topbar-left">
          {authenticated && (
            <button
              type="button"
              className="topbar-toggle"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="topbar-mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <Logo href={authenticated ? AUTHENTICATED_HOME : PUBLIC_HOME} />
        </div>
        {authenticated && (
          <div className="topbar-nav">
            <NavigationLinks />
          </div>
        )}
        <div className="topbar-actions" ref={accountRef}>
          {authenticated ? (
            <>
              <UserCard
                variant="compact"
                name={name}
                role={user?.role === "organization" ? "ONG / Protetor" : "Adotante"}
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen(!accountOpen)}
              />
              {accountOpen && (
                <div className="topbar-dropdown" role="menu">
                  <button
                    type="button"
                    role="menuitem"
                    className="topbar-dropdown-item"
                    onClick={async () => {
                      setAccountOpen(false);
                      setMenuOpen(false);
                      try {
                        await logout();
                        router.replace("/login");
                        router.refresh();
                      } catch {
                        toast.error("Não foi possível sair. Tente novamente.");
                      }
                    }}
                  >
                    <LogOut size={16} aria-hidden />
                    Sair
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
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
                  onClick={() => router.push("/login?perfil=organization")}
                >
                  Entrar como Organizador
                </Button>
              </span>
            </>
          )}
        </div>
      </div>
      {authenticated && menuOpen && (
        <div id="topbar-mobile-menu" className="topbar-mobile">
          <NavigationLinks
            orientation="vertical"
            onNavigate={() => setMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
