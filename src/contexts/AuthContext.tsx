"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Destinos da logo. Hoje os dois apontam para o mesmo lugar (o item "Início"
// do MOCK_NAV_ITEMS é /public-portal); se a área logada ganhar rota própria,
// basta trocar AUTHENTICATED_HOME.
export const PUBLIC_HOME = "/public-portal";
export const AUTHENTICATED_HOME = "/public-portal";

const STORAGE_KEY = "pethub:authenticated";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Restaura a sessão mock depois da hidratação (evita mismatch com o SSR).
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        setIsAuthenticated(true);
      }
    } catch {
      // localStorage indisponível: segue deslogado.
    }
  }, []);

  function persist(value: boolean) {
    setIsAuthenticated(value);
    try {
      if (value) localStorage.setItem(STORAGE_KEY, "true");
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignora falha de storage
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: () => persist(true),
        logout: () => persist(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }
  return context;
}

// Destino do clique na logo, conforme o usuário esteja logado ou não.
export function useHomeHref() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? AUTHENTICATED_HOME : PUBLIC_HOME;
}