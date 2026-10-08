"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import OrganizationRegister from "./Organization/OrganizationRegister";
import UserRegister from "./User/UserRegister";

function RegisterContent() {
  const searchParams = useSearchParams();

  return searchParams.get("perfil") === "organization" ? (
    <OrganizationRegister />
  ) : (
    <UserRegister />
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterContent />
    </Suspense>
  );
}