import PortalShell from "@/components/PortalShell";
import s from "./styles";
import { notFound } from "next/navigation";
import AnimalProfile from "@/components/AnimalProfile";
import { findPet } from "@/features/animals/data";
export default async function AnimalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pet = findPet(id);
  if (!pet) notFound();
  return (<PortalShell>
    <div className={s.heading}>
      <div>
        <h1>Perfil do Animal</h1>
        <p>Informações detalhadas, ficha médica e processos de adoção</p>
      </div>
    </div>
    <AnimalProfile pet={pet} />
  </PortalShell>);
}
