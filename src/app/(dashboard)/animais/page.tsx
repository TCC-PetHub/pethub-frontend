"use client";

import { useState } from "react";

import { Building2, CalendarDays } from "lucide-react";

import PortalShell from "@/components/PortalShell";
import Select from "@/components/Select";
import { pets } from "@/features/animals/data";

import {
  Badge,
  DemoTag,
  Empty,
  FilterField,
  Filters,
  Heading,
  HeadingText,
  HeadingTitle,
  PageButton,
  Pagination,
  PaginationControls,
  PetBody,
  PetCard,
  PetGrid,
  PetHeader,
  PetInfo,
  PetMeta,
  PetName,
  PetOrg,
  PetPhoto,
} from "./styles";

const PAGE_SIZE = 6;

const STATUS_TONE = {
  Disponível: "green",
  "Em tratamento": "amber",
  Adotado: "mint",
} as const;

const ALL_LABEL: Record<string, string> = {
  breed: "Qualquer raça",
  age: "Qualquer idade",
};

function isUpToOneYear(age: string) {
  return age.includes("meses") || age === "1 ano";
}

export default function AnimalsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const definitions = [
    { key: "species", label: "Espécie", options: ["Cão", "Gato"] },
    {
      key: "breed",
      label: "Raça",
      options: [...new Set(pets.map((p) => p.breed))],
    },
    { key: "size", label: "Porte", options: ["Pequeno", "Médio", "Grande"] },
    { key: "age", label: "Idade", options: ["Até 1 ano", "Acima de 1 ano"] },
    {
      key: "status",
      label: "Status",
      options: ["Disponível", "Em tratamento", "Adotado"],
    },
    {
      key: "organization",
      label: "Organização",
      options: [...new Set(pets.map((p) => p.organization))],
    },
  ];

  const filtered = pets.filter((pet) =>
    definitions.every(({ key }) => {
      const value = filters[key];
      if (!value) return true;
      if (key === "age") {
        return value === "Até 1 ano"
          ? isUpToOneYear(pet.age)
          : !isUpToOneYear(pet.age);
      }
      return pet[key as keyof typeof pet] === value;
    }),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visiblePets = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(key: string, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  return (
    <PortalShell>
      <Heading>
        <div>
          <HeadingTitle>Catálogo de Animais</HeadingTitle>
          <HeadingText>
            Gerenciamento de animais cadastrados, status e adoções
          </HeadingText>
        </div>
        <DemoTag>
          <CalendarDays size={15} />
          Dados de demonstração
        </DemoTag>
      </Heading>

      <Filters aria-label="Filtros do catálogo">
        {definitions.map(({ key, label, options }) => (
          <FilterField key={key}>
            {label}
            <Select
              value={filters[key] || ""}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            >
              <option value="">{ALL_LABEL[key] ?? "Todos"}</option>
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>
          </FilterField>
        ))}
      </Filters>

      <PetGrid>
        {visiblePets.map((pet) => (
          <PetCard key={pet.id} href={`/animais/${pet.id}`}>
            <PetPhoto aria-label={`Foto de ${pet.name} ainda não cadastrada`} />
            <PetBody>
              <PetHeader>
                <PetName>{pet.name}</PetName>
                <Badge
                  tone={STATUS_TONE[pet.status as keyof typeof STATUS_TONE]}
                >
                  {pet.status}
                </Badge>
              </PetHeader>
              <PetInfo>
                {pet.breed} ・ {pet.sex}
              </PetInfo>
              <PetMeta>Idade: {pet.age}</PetMeta>
              <PetOrg>
                <Building2 size={14} />
                {pet.organization}
              </PetOrg>
            </PetBody>
          </PetCard>
        ))}
      </PetGrid>

      {!filtered.length && (
        <Empty>Nenhum animal encontrado com esses filtros.</Empty>
      )}

      <Pagination>
        <span>
          Mostrando {visiblePets.length} de {filtered.length} animais
          cadastrados
        </span>
        <PaginationControls>
          <PageButton
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              type="button"
              key={i}
              current={page === i + 1}
              aria-current={page === i + 1 ? "page" : undefined}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
          <PageButton
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Próximo
          </PageButton>
        </PaginationControls>
      </Pagination>
    </PortalShell>
  );
}
