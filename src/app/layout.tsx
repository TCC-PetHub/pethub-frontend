import { globalStyles } from "@/styles";
import type { Metadata } from "next";
import { Toaster } from "sonner";

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
        {children}
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
