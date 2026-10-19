"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { homeByRole } from "@/config/navigation";
import type { LoginCredentials, SessionUser } from "@/lib/auth/types";

export const PUBLIC_HOME = "/public-portal";

interface AuthContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<SessionUser>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: SessionUser | null;
}) {
  const [user, setUser] = useState(initialUser);
  useEffect(() => {
    try {
      localStorage.removeItem("pethub:authenticated");
    } catch {}
    const controller = new AbortController();
    async function syncSession() {
      try {
        const response = await fetch("/api/auth/session", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (response.ok || response.status === 401) {
          const data = await response.json();
          setUser(data.user ?? null);
        }
      } catch {
        /* A network failure does not replace a verified server session. */
      }
    }
    const timer = window.setInterval(syncSession, 60_000);
    window.addEventListener("focus", syncSession);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      window.removeEventListener("focus", syncSession);
    };
  }, []);

  async function login(credentials: LoginCredentials) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Não foi possível entrar.");
    setUser(data.user);
    return data.user as SessionUser;
  }
  async function logout() {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok)
      throw new Error("Não foi possível encerrar a sessão. Tente novamente.");
    setUser(null);
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return context;
}
export function useHomeHref() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return PUBLIC_HOME;
  return homeByRole[user?.role ?? "adopter"];
}
