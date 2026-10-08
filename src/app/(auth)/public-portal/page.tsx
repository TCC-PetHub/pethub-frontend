"use client";

import { useState, type FormEvent } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowRight, Heart, MapPin, PawPrint, Search } from "lucide-react";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Logo from "@/components/atoms/Logo";
import TopBar from "@/components/organisms/TopBar";
import { useHomeHref } from "@/contexts/AuthContext";
import { ANIMALS, CAMPAIGNS, FILTERS, PARTNERS } from "@/mocks/pethub";

import {
  AnimalPhoto,
  Badge,
  Card,
  CardBody,
  CardMeta,
  CardTitle,
  CardTop,
  Chip,
  Chips,
  Footer,
  FooterBottom,
  FooterGrid,
  FooterList,
  FooterText,
  FooterTitle,
  Grid,
  Hero,
  HeroText,
  HeroTitle,
  IconBox,
  Inner,
  Page,
  PartnerCard,
  PartnerFooter,
  PartnerName,
  ProgressFill,
  ProgressTrack,
  ProgressValues,
  SearchAction,
  SearchField,
  SearchForm,
  Section,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  SeeAll,
  Tag,
  TagRow,
} from "./styles";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export default function HomePage() {
  const router = useRouter();
  const homeHref = useHomeHref();

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  function toggleFilter(filter: string) {
    setFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (query.trim()) params.set("busca", query.trim());
    if (filters.length) params.set("filtros", filters.join(","));

    router.push(`/animais?${params.toString()}`);
  }

  return (
    <Page>
      <TopBar />

      <main>
        <Hero>
          <Inner>
            <Badge tone="amber">Adoção responsável, de verdade</Badge>

            <HeroTitle>Encontre seu novo melhor amigo</HeroTitle>
            <HeroText>
              Milhares de cães e gatos resgatados estão esperando por um lar
              amoroso em todo o Brasil. Comece sua busca agora e mude uma vida.
            </HeroText>

            <SearchForm onSubmit={handleSearch} role="search">
              <SearchField>
                <Input
                  type="search"
                  aria-label="Buscar animais"
                  placeholder="Buscar por raça, cidade, abrigo..."
                  icon={<Search size={16} />}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </SearchField>
              <SearchAction>
                <Button type="submit" variant="tertiary">
                  Buscar
                </Button>
              </SearchAction>
            </SearchForm>

            <Chips>
              {FILTERS.map((filter) => (
                <Chip
                  key={filter}
                  type="button"
                  active={filters.includes(filter)}
                  aria-pressed={filters.includes(filter)}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </Chip>
              ))}
            </Chips>
          </Inner>
        </Hero>

        <Section id="campanhas" tone="mint">
          <Inner>
            <SectionHeader>
              <div>
                <Badge tone="teal">Campanhas em destaque</Badge>
                <SectionTitle>Ajude quem cuida: faça sua doação</SectionTitle>
                <SectionSubtitle>
                  Contribua com valores e acompanhe o impacto em tempo real,
                  direto pelas ONGs responsáveis.
                </SectionSubtitle>
              </div>
              <SeeAll href="/doacoes">
                Ver todas as campanhas <ArrowRight size={14} aria-hidden />
              </SeeAll>
            </SectionHeader>

            <Grid cols={3}>
              {CAMPAIGNS.map((campaign) => {
                const percent = Math.min(
                  100,
                  Math.round((campaign.raised / campaign.goal) * 100),
                );

                return (
                  <Card key={campaign.id}>
                    <CardBody>
                      <CardTop>
                        <IconBox>
                          <Heart size={16} aria-hidden />
                        </IconBox>
                        <Tag tone={campaign.tone}>{campaign.tag}</Tag>
                      </CardTop>

                      <div>
                        <CardTitle>{campaign.title}</CardTitle>
                        <CardMeta>{campaign.ong}</CardMeta>
                      </div>

                      <ProgressValues>
                        <strong>
                          {currency.format(campaign.raised)} arrecadados
                        </strong>
                        <span>Meta: {currency.format(campaign.goal)}</span>
                      </ProgressValues>

                      <ProgressTrack
                        role="progressbar"
                        aria-valuenow={percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${percent}% da meta atingida`}
                      >
                        <ProgressFill style={{ width: `${percent}%` }} />
                      </ProgressTrack>
                      <CardMeta>{percent}% da meta atingida</CardMeta>

                      <Button
                        variant="tertiary"
                        onClick={() => router.push(`/doacoes/${campaign.id}`)}
                      >
                        Doar Agora
                      </Button>
                    </CardBody>
                  </Card>
                );
              })}
            </Grid>
          </Inner>
        </Section>

        <Section id="animais">
          <Inner>
            <SectionHeader>
              <div>
                <SectionTitle>Prontos para um novo lar</SectionTitle>
                <SectionSubtitle>
                  Conheça alguns dos amigos mais recentes adicionados ao portal.
                </SectionSubtitle>
              </div>
              <SeeAll href="/animais">
                Ver todos os animais <ArrowRight size={14} aria-hidden />
              </SeeAll>
            </SectionHeader>

            <Grid cols={3}>
              {ANIMALS.map((animal) => (
                <Card key={animal.id}>
                  <AnimalPhoto aria-hidden>
                    {/* Trocar por <Image /> quando houver foto */}
                    <PawPrint size={40} />
                  </AnimalPhoto>
                  <CardBody>
                    <TagRow>
                      <Tag tone="age">{animal.age}</Tag>
                      <Tag tone={animal.sex === "Macho" ? "male" : "female"}>
                        {animal.sex}
                      </Tag>
                    </TagRow>
                    <CardTitle>
                      <Link
                        href={`/animais/${animal.id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {animal.name}
                      </Link>
                    </CardTitle>
                    <CardMeta>{animal.breed}</CardMeta>
                    <CardMeta>
                      <MapPin size={12} aria-hidden /> {animal.city}
                    </CardMeta>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Inner>
        </Section>

        <Section id="parceiros" style={{ paddingTop: 0 }}>
          <Inner>
            <SectionHeader>
              <div>
                <SectionTitle>ONGs Parceiras</SectionTitle>
                <SectionSubtitle>
                  Instituições e protetores sérios que alimentam o ecossistema
                  nacional PetHub.
                </SectionSubtitle>
              </div>
            </SectionHeader>

            <Grid cols={4}>
              {PARTNERS.map((partner) => (
                <PartnerCard key={partner.id}>
                  <PartnerName>{partner.name}</PartnerName>
                  <PartnerFooter>
                    <span>Animais para adotar:</span>
                    <strong>{partner.animals}</strong>
                  </PartnerFooter>
                </PartnerCard>
              ))}
            </Grid>
          </Inner>
        </Section>
      </main>

      <Footer>
        <Inner>
          <FooterGrid>
            <div>
              <Logo light href={homeHref} />
              <FooterText>
                Conectando amigos, ONGs e famílias para o caminho seguro da
                adoção e da proteção animal em todo o território nacional.
              </FooterText>
            </div>

            <nav aria-label="Encontre">
              <FooterTitle>Encontre</FooterTitle>
              <FooterList>
                <li>
                  <Link href="/animais?filtros=Cães">Adoção de cães</Link>
                </li>
                <li>
                  <Link href="/animais?filtros=Gatos">Adoção de gatos</Link>
                </li>
                <li>
                  <Link href="/perdidos">Perdidos e achados</Link>
                </li>
                <li>
                  <Link href="/ongs">ONGs cadastradas</Link>
                </li>
              </FooterList>
            </nav>

            <nav aria-label="Parceiros">
              <FooterTitle>Parceiros</FooterTitle>
              <FooterList>
                <li>
                  <Link href="/cadastro-ong">Cadastrar minha ONG</Link>
                </li>
                <li>
                  <Link href="/doacoes">Portal de doações</Link>
                </li>
                <li>
                  <Link href="/termos-adocao">Termos de adoção</Link>
                </li>
                <li>
                  <Link href="/suporte">Suporte técnico</Link>
                </li>
              </FooterList>
            </nav>

            <div>
              <FooterTitle>Contato</FooterTitle>
              <FooterList>
                <li>contato@pethub.org.br</li>
                <li>(11) 0000-0000</li>
                <li>São Paulo, SP</li>
              </FooterList>
            </div>
          </FooterGrid>

          <FooterBottom>
            © {new Date().getFullYear()} PetHub Proteção Animal. Todos os
            direitos reservados.
          </FooterBottom>
        </Inner>
      </Footer>
    </Page>
  );
}
