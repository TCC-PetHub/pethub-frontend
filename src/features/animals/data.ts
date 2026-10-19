export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  sex: string;
  age: string;
  size: string;
  organization: string;
  status: string;
}
export const pets: Pet[] = [
  {
    id: "thor",
    name: "Thor",
    species: "Cão",
    breed: "Labrador",
    sex: "Macho",
    age: "3 anos",
    size: "Grande",
    organization: "Instituto PróAnimal (DF)",
    status: "Disponível",
  },
  {
    id: "luna",
    name: "Luna",
    species: "Gato",
    breed: "Persa",
    sex: "Fêmea",
    age: "2 anos",
    size: "Pequeno",
    organization: "SOS Vida Animal (RJ)",
    status: "Em tratamento",
  },
  {
    id: "pipoca",
    name: "Pipoca",
    species: "Cão",
    breed: "SRD (Vira-lata)",
    sex: "Macho",
    age: "8 meses",
    size: "Médio",
    organization: "ONG Amigos de Patas (SP)",
    status: "Adotado",
  },
  {
    id: "bolinha",
    name: "Bolinha",
    species: "Cão",
    breed: "Beagle",
    sex: "Fêmea",
    age: "5 anos",
    size: "Médio",
    organization: "Abrigo São Francisco (BA)",
    status: "Disponível",
  },
  {
    id: "mel",
    name: "Mel",
    species: "Cão",
    breed: "Golden Retriever",
    sex: "Fêmea",
    age: "1 ano",
    size: "Grande",
    organization: "ONG Amigos de Patas (SP)",
    status: "Disponível",
  },
  {
    id: "floquinho",
    name: "Floquinho",
    species: "Gato",
    breed: "Siamês",
    sex: "Macho",
    age: "4 anos",
    size: "Pequeno",
    organization: "Adote um Gatinho (SP)",
    status: "Disponível",
  },
];
export function findPet(id: string) {
  return pets.find((pet) => pet.id === id);
}
