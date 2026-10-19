"use client";

import type { ReactNode } from "react";

import TopBar from "@/components/layout/TopBar";

import { Main, Page } from "./styles";

// Template: estrutura visual compartilhada, sem dados próprios da conta.
export default function PortalShell({ children }: { children: ReactNode }) {
  return (
    <Page>
      <TopBar />
      <Main>{children}</Main>
    </Page>
  );
}
