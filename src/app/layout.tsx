import { globalStyles } from "@/styles";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { AuthProvider } from "@/contexts/AuthContext";

globalStyles();

export const metadata: Metadata = {
  title: "PetHub",
  description: "Plataforma Nacional de Integração para Proteção Animal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="top-right"
          closeButton={false}
          richColors={false}
          duration={4000}
        />
      </body>
    </html>
  );
}