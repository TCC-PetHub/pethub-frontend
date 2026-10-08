"use client";
import { useState } from "react";
import Link from "next/link";
import { Building2, Share2, Heart } from "lucide-react";
import s from "@/components/templates/PortalShell/styles";
import type { Pet } from "@/features/animals/data";
const tabs = [
  "Informações",
  "Histórico Veterinário",
  "Histórico de Adoção",
  "Acompanhamento",
];
export default function AnimalProfile({ pet }: { pet: Pet }) {
  const [tab, setTab] = useState(tabs[0]);
  const [photo, setPhoto] = useState(0);
  const [notice, setNotice] = useState("");
  async function share() {
    try {
      if (navigator.share)
        await navigator.share({
          title: `Conheça ${pet.name} no PetHub`,
          url: location.href,
        });
      else {
        await navigator.clipboard.writeText(location.href);
        setNotice("Link copiado para compartilhar.");
      }
    } catch {
      setNotice("Não foi possível compartilhar. Copie o endereço da página.");
    }
  }
  return (
    <>
      <div className={s.animalLayout}>
        <aside>
          <div
            className={s.largePhoto}
            role="img"
            aria-label={`Foto ${photo + 1} de ${pet.name} ainda não cadastrada`}
          />
          <div className={s.thumbnails}>
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                className={photo === i ? s.selectedPhoto : ""}
                onClick={() => setPhoto(i)}
                aria-label={`Selecionar foto ${i + 1}`}
                aria-pressed={photo === i}
              />
            ))}
          </div>
          <section className={`${s.card} ${s.orgPanel}`}>
            <h3>ORGANIZAÇÃO RESPONSÁVEL</h3>
            <div className={s.orgIdentity}>
              <span>
                <Building2 size={20} />
              </span>
              <div>
                <strong>{pet.organization}</strong>
                <p>Organização de proteção animal</p>
              </div>
            </div>
            <p>
              Organização parceira do PetHub dedicada ao cuidado e à adoção
              responsável de animais.
            </p>
          </section>
        </aside>
        <article className={`${s.card} ${s.detail}`}>
          <div className={s.row}>
            <div>
              <div className={s.titleBadge}>
                <h1>{pet.name}</h1>
                <span
                  className={`${s.badge} ${pet.status === "Em tratamento" ? s.amber : s.green}`}
                >
                  {pet.status}
                </span>
              </div>
              <p>
                {pet.breed} • {pet.sex}
              </p>
            </div>
            <div className={s.actions}>
              <button className={s.outline} onClick={share}>
                <Share2 size={14} />
                Compartilhar
              </button>
              {pet.status === "Disponível" ? (
                <Link className={s.primary} href={`/animais/${pet.id}/adotar`}>
                  <Heart size={14} />
                  Solicitar Adoção
                </Link>
              ) : (
                <span className={s.outline}>Adoção indisponível</span>
              )}
            </div>
          </div>
          {notice && (
            <p role="status" className={s.notice}>
              {notice}
            </p>
          )}
          <div className={s.facts}>
            <div>
              <small>IDADE</small>
              <strong>{pet.age}</strong>
            </div>
            <div>
              <small>PORTE</small>
              <strong>{pet.size}</strong>
            </div>
            <div>
              <small>MICROCHIP</small>
              <strong>
                {pet.id === "thor" ? "#981.024.112" : "Não informado"}
              </strong>
            </div>
          </div>
          <div
            className={s.tabs}
            role="tablist"
            aria-label="Informações do animal"
          >
            {tabs.map((t) => (
              <button
                role="tab"
                key={t}
                id={`tab-${tabs.indexOf(t)}`}
                aria-selected={tab === t}
                aria-controls="animal-panel"
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <section
            role="tabpanel"
            id="animal-panel"
            aria-labelledby={`tab-${tabs.indexOf(tab)}`}
          >
            {tab === "Informações" && (
              <>
                <h3>Sobre o {pet.name}</h3>
                <p>
                  {pet.name} é um companheiro carinhoso que merece um lar seguro
                  e acolhedor. A organização responsável pode contar mais sobre
                  sua história, rotina e necessidades durante o processo de
                  adoção.
                </p>
                <h3>Temperamento</h3>
                <div className={s.chips}>
                  {["Dócil", "Brincalhão", "Sociável", "Ativo", "Protetor"].map(
                    (t) => (
                      <span key={t}>{t}</span>
                    ),
                  )}
                </div>
                <h3>Ficha de Vacinação e Vermifugação</h3>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>Vacina / Dose</th>
                      <th>Data de Aplicação</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {pet.species === "Gato"
                          ? "Múltipla V4"
                          : "Múltipla V10"}
                      </td>
                      <td>15/12/2025</td>
                      <td>
                        <span className={`${s.badge} ${s.green}`}>
                          Aplicada
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Antirrábica</td>
                      <td>10/02/2026</td>
                      <td>
                        <span className={`${s.badge} ${s.green}`}>
                          Aplicada
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {pet.species === "Gato"
                          ? "Vermifugação"
                          : "Gripe Canina"}
                      </td>
                      <td>Não informada</td>
                      <td>
                        <span className={`${s.badge} ${s.amber}`}>
                          A confirmar
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            {tab === "Histórico Veterinário" && (
              <>
                <h3>Cuidados veterinários</h3>
                <p>
                  Status atual: {pet.status}. Os registros abaixo são
                  demonstrativos.
                </p>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>Procedimento</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Avaliação clínica</td>
                      <td>10/02/2026</td>
                    </tr>
                    <tr>
                      <td>Vacinação antirrábica</td>
                      <td>10/02/2026</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            {tab === "Histórico de Adoção" && (
              <>
                <h3>Histórico de Adoção</h3>
                <p>
                  {pet.status === "Adotado"
                    ? "Adoção concluída pela organização responsável."
                    : "Nenhuma adoção anterior registrada nesta demonstração."}
                </p>
              </>
            )}
            {tab === "Acompanhamento" && (
              <>
                <h3>Acompanhamento</h3>
                <p>
                  Os registros de acompanhamento serão disponibilizados pela
                  organização após a adoção.
                </p>
              </>
            )}
          </section>
        </article>
      </div>
    </>
  );
}
