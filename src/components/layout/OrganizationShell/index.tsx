"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { LogOut, Menu, X } from "lucide-react";

import Logo from "@/components/common/Logo";
import { toast } from "@/components/common/Toast";
import {
  homeByRole,
  navigationByRole,
  roleLabel,
  type NavigationItem,
} from "@/config/navigation";
import { useAuth } from "@/contexts/AuthContext";

import {
  Avatar,
  CloseButton,
  Content,
  LogoutButton,
  MobileBar,
  MobileToggle,
  NavItem,
  NavList,
  Overlay,
  Shell,
  Sidebar,
  SidebarHeader,
  UserCard,
  UserInfo,
} from "./styles";

// false no servidor e no primeiro render da hidratação, true depois.
const subscribeNoop = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

function isActive(pathname: string, item: NavigationItem) {
  const current = pathname.toLowerCase();
  const href = item.href.toLowerCase();

  if (item.exact) return current === href;
  return current === href || current.startsWith(`${href}/`);
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function OrganizationShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);

  const items = navigationByRole.organization;
  const name = user?.name ?? "Usuário";

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  async function handleLogout() {
    setOpen(false);

    try {
      await logout();
      router.replace("/login");
      router.refresh();
    } catch {
      toast.error("Não foi possível sair. Tente novamente.");
    }
  }

  return (
    <Shell>
      <MobileBar>
        <MobileToggle
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="organization-sidebar"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} aria-hidden />
        </MobileToggle>
        <Logo href={homeByRole.organization} />
      </MobileBar>

      <Overlay open={open} onClick={() => setOpen(false)} aria-hidden />

      <Sidebar id="organization-sidebar" open={open} aria-label="Menu da ONG">
        <SidebarHeader>
          <Logo href={homeByRole.organization} />
          <CloseButton
            type="button"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          >
            <X size={18} aria-hidden />
          </CloseButton>
        </SidebarHeader>

        <NavList>
          {items.map((item) => {
            const Icon = item.icon;
            const active = mounted && isActive(pathname, item);

            return (
              <li key={item.href}>
                <NavItem
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {Icon && <Icon size={18} aria-hidden />}
                  {item.label}
                </NavItem>
              </li>
            );
          })}
        </NavList>

        <UserCard>
          <Avatar aria-hidden>{initials(name)}</Avatar>
          <UserInfo>
            <strong>{name}</strong>
            <span>{roleLabel.organization}</span>
          </UserInfo>
          <LogoutButton
            type="button"
            aria-label="Sair"
            title="Sair"
            onClick={handleLogout}
          >
            <LogOut size={16} aria-hidden />
          </LogoutButton>
        </UserCard>
      </Sidebar>

      <Content>{children}</Content>
    </Shell>
  );
}
