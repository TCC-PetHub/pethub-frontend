/**
 * Dados fictícios para desenvolvimento.
 * Quando a API estiver pronta, troque os imports por chamadas reais
 * mantendo estes tipos.
 */

export interface MockUser {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface Campaign {
  id: string;
  title: string;
  ong: string;
  tag: string;
  tone: "amber" | "blue" | "age";
  raised: number;
  goal: number;
}

export interface Animal {
  id: string;
  name: string;
  breed: string;
  city: string;
  age: "Filhote" | "Jovem" | "Adulto" | "Idoso";
  sex: "Macho" | "Fêmea";
  photoUrl?: string;
}

export interface Partner {
  id: string;
  name: string;
  animals: number;
}

export const MOCK_ADOPTER: MockUser = {
  name: "Carlos Alberto",
  role: "Adotante",
  avatarUrl: "https://i.pravatar.cc/120?img=12",
};

export const MOCK_COORDINATOR: MockUser = {
  name: "Mariana Souza",
  role: "Coord. Nacional",
  avatarUrl: "https://i.pravatar.cc/120?img=47",
};

export const FILTERS = ["Cães", "Gatos", "Filhotes", "Porte médio"];

export const CAMPAIGNS: Campaign[] = [
  {
    id: "racao-200-caes",
    title: "Ração para 200 Cães",
    ong: "ONG Amigos de Patas",
    tag: "Alimentação",
    tone: "amber",
    raised: 12300,
    goal: 14000,
  },
  {
    id: "reforma-abrigo",
    title: "Reforma do Abrigo",
    ong: "Instituto ProAnima",
    tag: "Infraestrutura",
    tone: "blue",
    raised: 21800,
    goal: 40000,
  },
  {
    id: "castracao-comunitaria",
    title: "Castração Comunitária",
    ong: "SOS Vida Animal",
    tag: "Saúde",
    tone: "age",
    raised: 7800,
    goal: 9000,
  },
];

export const ANIMALS: Animal[] = [
  {
    id: "pipoca",
    name: "Pipoca",
    breed: "SRD (Sem Raça Definida)",
    city: "São Paulo - SP",
    age: "Filhote",
    sex: "Macho",
  },
  {
    id: "luna",
    name: "Luna",
    breed: "Persa",
    city: "Rio de Janeiro - RJ",
    age: "Adulto",
    sex: "Fêmea",
  },
  {
    id: "thor",
    name: "Thor",
    breed: "Labrador",
    city: "Brasília - DF",
    age: "Jovem",
    sex: "Macho",
  },
  {
    id: "mel",
    name: "Mel",
    breed: "Golden Retriever",
    city: "Belo Horizonte - MG",
    age: "Adulto",
    sex: "Fêmea",
  },
  {
    id: "bolinha",
    name: "Bolinha",
    breed: "Beagle",
    city: "Salvador - BA",
    age: "Idoso",
    sex: "Macho",
  },
  {
    id: "floquinho",
    name: "Floquinho",
    breed: "Siamês",
    city: "São Paulo - SP",
    age: "Adulto",
    sex: "Macho",
  },
];

export const PARTNERS: Partner[] = [
  { id: "amigos-de-patas", name: "Amigos de Patas", animals: 45 },
  { id: "proanima", name: "Instituto ProAnima", animals: 32 },
  { id: "sos-vida-animal", name: "SOS Vida Animal", animals: 28 },
  { id: "abrigo-sao-francisco", name: "Abrigo São Francisco", animals: 19 },
];

/** Ajuste os hrefs para as rotas reais do projeto (o item ativo depende da URL). */
export { USER_NAV_ITEMS as MOCK_NAV_ITEMS } from "@/components/NavigationLinks/items";
