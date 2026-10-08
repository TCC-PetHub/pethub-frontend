"use client";
import Select from "@/components/Select";
import { useState } from "react";
import Link from "next/link";
import { Building2, CalendarDays } from "lucide-react";
import PortalShell from "@/components/PortalShell";
import s from "@/app/(auth)/animais/styles";
import { pets } from "@/features/animals/data";
export default function AnimalsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const pageSize = 6;
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
  const filtered = pets.filter((p) =>
    definitions.every(
      ({ key }) =>
        !filters[key] ||
        (key === "age"
          ? filters[key] === "Até 1 ano"
            ? p.age.includes("meses") || p.age === "1 ano"
            : !p.age.includes("meses") && p.age !== "1 ano"
          : p[key as keyof typeof p] === filters[key]),
    ),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  return (
    <PortalShell>
      <div className={s.heading}>
        <div>
          <h1>Catálogo de Animais</h1>
          <p>Gerenciamento de animais cadastrados, status e adoções</p>
        </div>
        <span className={s.outline}>
          <CalendarDays size={15} />
          Dados de demonstração
        </span>
      </div>
      <section className={s.filters} aria-label="Filtros do catálogo">
        {definitions.map((d) => (
          <label key={d.key}>
            {d.label}
            <Select
              value={filters[d.key] || ""}
              onChange={(e) => {
                setFilters({ ...filters, [d.key]: e.target.value });
                setPage(1);
              }}
            >
              <option value="">
                {d.key === "breed"
                  ? "Qualquer raça"
                  : d.key === "age"
                    ? "Qualquer idade"
                    : "Todos"}
              </option>
              {d.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </Select>
          </label>
        ))}
      </section>
      <div className={s.petGrid}>
        {filtered.slice((page - 1) * pageSize, page * pageSize).map((p) => (
          <Link className={s.card} key={p.id} href={`/animais/${p.id}`}>
            <div
              className={s.petPhoto}
              aria-label={`Foto de ${p.name} ainda não cadastrada`}
            />
            <div className={s.petBody}>
              <div className={s.row}>
                <h2>{p.name}</h2>
                <span
                  className={`${s.badge} ${p.status === "Em tratamento" ? s.amber : p.status === "Adotado" ? s.mint : s.green}`}
                >
                  {p.status}
                </span>
              </div>
              <p>
                {p.breed} ・ {p.sex}
              </p>
              <p className={s.muted}>Idade: {p.age}</p>
              <div className={s.petOrg}>
                <Building2 size={14} />
                {p.organization}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <p className={s.empty}>Nenhum animal encontrado com esses filtros.</p>
      )}
      <footer className={s.pagination}>
        <span>
          Mostrando{" "}
          {Math.min(
            pageSize,
            Math.max(0, filtered.length - (page - 1) * pageSize),
          )}{" "}
          de {filtered.length} animais cadastrados
        </span>
        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Anterior
          </button>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              aria-current={page === i + 1 ? "page" : undefined}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button disabled={page === pages} onClick={() => setPage(page + 1)}>
            Próximo
          </button>
        </div>
      </footer>
    </PortalShell>
  );
}
