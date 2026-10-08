import { notFound } from "next/navigation";

import AdoptionForm from "@/components/animais/AdoptionForm";
import PortalShell from "@/components/layout/PortalShell";
import { findPet } from "@/features/animals/data";

export default async function AdoptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pet = findPet(id);

  if (!pet || pet.status !== "Disponível") notFound();

  return (
    <PortalShell>
      <AdoptionForm pet={pet} />
    </PortalShell>
  );
}
