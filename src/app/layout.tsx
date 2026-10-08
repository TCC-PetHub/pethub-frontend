import "./globals.css";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth/session";
import { Toaster } from "sonner";

import { AuthProvider } from "@/contexts/AuthContext";
import StyleRegistry from "@/styles/StyleRegistry";

export const metadata: Metadata = {
  title: "PetHub",
  description: "Plataforma Nacional de Integração para Proteção Animal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser = await getSession();
  return (
    <html lang="pt-BR">
      <body>
        <StyleRegistry>
          <AuthProvider initialUser={initialUser}>
            {children}
          </AuthProvider>
          <Toaster
            position="top-right"
            closeButton={false}
            richColors={false}
            duration={4000}
          />
        </StyleRegistry>
      </body>
    </html>
  );
}
