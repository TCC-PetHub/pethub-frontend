"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { LogOut, Menu, X } from "lucide-react";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import NavigationLinks from "@/components/NavigationLinks";
import { toast } from "@/components/Toast";
import UserCard from "@/components/UserCard";
import {
  AUTHENTICATED_HOME,
  PUBLIC_HOME,
  useAuth,
} from "@/contexts/AuthContext";

import {
  Actions,
  Dropdown,
  DropdownItem,
  Header,
  Inner,
  Left,
  MenuToggle,
  MobileMenu,
  Nav,
  Organizer,
} from "./styles";

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
  const { user, isAuthenticated: authenticated, logout } = useAuth();

  const profileSnapshot = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    () => "",
  );

  let name = user?.name ?? "Usuário";
  try {
    const profile = JSON.parse(profileSnapshot);
    if (typeof profile?.name === "string") name = profile.name;
  } catch {
    // perfil inválido no localStorage: mantém o nome da sessão
  }

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
      if (!accountRef.current?.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeAccount);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeAccount);
    };
  }, [accountOpen, menuOpen]);

  async function handleLogout() {
    setAccountOpen(false);
    setMenuOpen(false);

    try {
      await logout();
      router.replace("/login");
      router.refresh();
    } catch {
      toast.error("Não foi possível sair. Tente novamente.");
    }
  }

  return (
    <Header>
      <Inner>
        <Left>
          {authenticated && (
            <MenuToggle
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="topbar-mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={20} aria-hidden />
              ) : (
                <Menu size={20} aria-hidden />
              )}
            </MenuToggle>
          )}
          <Logo href={authenticated ? AUTHENTICATED_HOME : PUBLIC_HOME} />
        </Left>

        {authenticated && (
          <Nav>
            <NavigationLinks />
          </Nav>
        )}

        <Actions ref={accountRef}>
          {authenticated ? (
            <>
              <UserCard
                variant="compact"
                name={name}
                role={
                  user?.role === "organization" ? "ONG / Protetor" : "Adotante"
                }
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen(!accountOpen)}
              />

              {accountOpen && (
                <Dropdown role="menu">
                  <DropdownItem
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} aria-hidden />
                    Sair
                  </DropdownItem>
                </Dropdown>
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

              <Organizer>
                <Button
                  size="sm"
                  variant="secondary"
                  fullWidth={false}
                  onClick={() => router.push("/login?perfil=organization")}
                >
                  Entrar como Organizador
                </Button>
              </Organizer>
            </>
          )}
        </Actions>
      </Inner>

      {authenticated && menuOpen && (
        <MobileMenu id="topbar-mobile-menu">
          <NavigationLinks
            orientation="vertical"
            onNavigate={() => setMenuOpen(false)}
          />
        </MobileMenu>
      )}
    </Header>
  );
}
