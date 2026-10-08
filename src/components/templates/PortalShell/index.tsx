"use client";
import type { ReactNode } from "react";
import TopBar from "@/components/organisms/TopBar";
import styles, { portalStyles } from "./styles";

// Template: estrutura visual compartilhada, sem dados próprios da conta.
export default function PortalShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${portalStyles()} ${styles.page}`}>
      <TopBar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
