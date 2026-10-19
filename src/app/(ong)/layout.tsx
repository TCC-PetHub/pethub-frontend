import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import OrganizationShell from "@/components/layout/OrganizationShell";
import { homeByRole } from "@/config/navigation";
import { requireSession } from "@/lib/auth/session";

export default async function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireSession();
  if (user.role !== "organization") redirect(homeByRole[user.role]);

  return <OrganizationShell>{children}</OrganizationShell>;
}
