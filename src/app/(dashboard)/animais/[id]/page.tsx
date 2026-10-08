import { notFound } from "next/navigation";

import AnimalProfile from "@/components/AnimalProfile";
import PortalShell from "@/components/PortalShell";
import { findPet } from "@/features/animals/data";

import { Heading, HeadingText, HeadingTitle } from "./styles";

export default async function AnimalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pet = findPet(id);

  if (!pet) notFound();

  return (
    <PortalShell>
      <Heading>
        <div>
          <HeadingTitle>Perfil do Animal</HeadingTitle>
          <HeadingText>
            Informações detalhadas, ficha médica e processos de adoção
          </HeadingText>
        </div>
      </Heading>

      <AnimalProfile pet={pet} />
    </PortalShell>
  );
}
