import type { Metadata } from "next";
import { globalStyles } from "@/styles";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
