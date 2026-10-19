"use client";

import { useState } from "react";

import { Building2, Heart, Share2 } from "lucide-react";

import type { Pet } from "@/features/animals/data";

import {
  Actions,
  Aside,
  Badge,
  Chips,
  Detail,
  DetailHeader,
  Fact,
  Facts,
  LargePhoto,
  Layout,
  Notice,
  OrgIdentity,
  OrgPanel,
  OrgText,
  OrgTitle,
  OutlineButton,
  OutlineTag,
  PetName,
  PrimaryLink,
  SectionTitle,
  Subtitle,
  Tab,
  Table,
  Tabs,
  Text,
  Thumbnail,
  Thumbnails,
  TitleRow,
} from "./styles";

const TABS = [
  "Informações",
  "Histórico Veterinário",
  "Histórico de Adoção",
  "Acompanhamento",
];

const TEMPERAMENT = ["Dócil", "Brincalhão", "Sociável", "Ativo", "Protetor"];

export default function AnimalProfile({ pet }: { pet: Pet }) {
  const [tab, setTab] = useState(TABS[0]);
  const [photo, setPhoto] = useState(0);
  const [notice, setNotice] = useState("");

  const isCat = pet.species === "Gato";
  const activeTabIndex = TABS.indexOf(tab);

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Conheça ${pet.name} no PetHub`,
          url: location.href,
        });
      } else {
        await navigator.clipboard.writeText(location.href);
        setNotice("Link copiado para compartilhar.");
      }
    } catch {
      setNotice("Não foi possível compartilhar. Copie o endereço da página.");
    }
  }

  return (
    <Layout>
      <Aside>
        <LargePhoto
          role="img"
          aria-label={`Foto ${photo + 1} de ${pet.name} ainda não cadastrada`}
        />
        <Thumbnails>
          {[0, 1, 2, 3].map((i) => (
            <Thumbnail
              type="button"
              key={i}
              selected={photo === i}
              aria-label={`Selecionar foto ${i + 1}`}
              aria-pressed={photo === i}
              onClick={() => setPhoto(i)}
            />
          ))}
        </Thumbnails>

        <OrgPanel>
          <OrgTitle>ORGANIZAÇÃO RESPONSÁVEL</OrgTitle>
          <OrgIdentity>
            <span>
              <Building2 size={20} />
            </span>
            <div>
              <strong>{pet.organization}</strong>
              <p>Organização de proteção animal</p>
            </div>
          </OrgIdentity>
          <OrgText>
            Organização parceira do PetHub dedicada ao cuidado e à adoção
            responsável de animais.
          </OrgText>
        </OrgPanel>
      </Aside>

      <Detail as="article">
        <DetailHeader>
          <div>
            <TitleRow>
              <PetName>{pet.name}</PetName>
              <Badge tone={pet.status === "Em tratamento" ? "amber" : "green"}>
                {pet.status}
              </Badge>
            </TitleRow>
            <Subtitle>
              {pet.breed} • {pet.sex}
            </Subtitle>
          </div>

          <Actions>
            <OutlineButton type="button" onClick={share}>
              <Share2 size={14} />
              Compartilhar
            </OutlineButton>
            {pet.status === "Disponível" ? (
              <PrimaryLink href={`/animais/${pet.id}/adotar`}>
                <Heart size={14} />
                Solicitar Adoção
              </PrimaryLink>
            ) : (
              <OutlineTag>Adoção indisponível</OutlineTag>
            )}
          </Actions>
        </DetailHeader>

        {notice && <Notice role="status">{notice}</Notice>}

        <Facts>
          <Fact>
            <small>IDADE</small>
            <strong>{pet.age}</strong>
          </Fact>
          <Fact>
            <small>PORTE</small>
            <strong>{pet.size}</strong>
          </Fact>
          <Fact>
            <small>MICROCHIP</small>
            <strong>
              {pet.id === "thor" ? "#981.024.112" : "Não informado"}
            </strong>
          </Fact>
        </Facts>

        <Tabs role="tablist" aria-label="Informações do animal">
          {TABS.map((name, index) => (
            <Tab
              type="button"
              role="tab"
              key={name}
              id={`tab-${index}`}
              active={tab === name}
              aria-selected={tab === name}
              aria-controls="animal-panel"
              onClick={() => setTab(name)}
            >
              {name}
            </Tab>
          ))}
        </Tabs>

        <section
          role="tabpanel"
          id="animal-panel"
          aria-labelledby={`tab-${activeTabIndex}`}
        >
          {tab === "Informações" && (
            <>
              <SectionTitle>Sobre o {pet.name}</SectionTitle>
              <Text>
                {pet.name} é um companheiro carinhoso que merece um lar seguro e
                acolhedor. A organização responsável pode contar mais sobre sua
                história, rotina e necessidades durante o processo de adoção.
              </Text>

              <SectionTitle>Temperamento</SectionTitle>
              <Chips>
                {TEMPERAMENT.map((trait) => (
                  <span key={trait}>{trait}</span>
                ))}
              </Chips>

              <SectionTitle>Ficha de Vacinação e Vermifugação</SectionTitle>
              <Table>
                <thead>
                  <tr>
                    <th>Vacina / Dose</th>
                    <th>Data de Aplicação</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{isCat ? "Múltipla V4" : "Múltipla V10"}</td>
                    <td>15/12/2025</td>
                    <td>
                      <Badge tone="green">Aplicada</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Antirrábica</td>
                    <td>10/02/2026</td>
                    <td>
                      <Badge tone="green">Aplicada</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>{isCat ? "Vermifugação" : "Gripe Canina"}</td>
                    <td>Não informada</td>
                    <td>
                      <Badge tone="amber">A confirmar</Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}

          {tab === "Histórico Veterinário" && (
            <>
              <SectionTitle>Cuidados veterinários</SectionTitle>
              <Text>
                Status atual: {pet.status}. Os registros abaixo são
                demonstrativos.
              </Text>
              <Table>
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
              </Table>
            </>
          )}

          {tab === "Histórico de Adoção" && (
            <>
              <SectionTitle>Histórico de Adoção</SectionTitle>
              <Text>
                {pet.status === "Adotado"
                  ? "Adoção concluída pela organização responsável."
                  : "Nenhuma adoção anterior registrada nesta demonstração."}
              </Text>
            </>
          )}

          {tab === "Acompanhamento" && (
            <>
              <SectionTitle>Acompanhamento</SectionTitle>
              <Text>
                Os registros de acompanhamento serão disponibilizados pela
                organização após a adoção.
              </Text>
            </>
          )}
        </section>
      </Detail>
    </Layout>
  );
}
