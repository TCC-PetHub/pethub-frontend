"use client";

import { styled } from "@/styles";

const Container = styled("main", {
  minHeight: "100vh",
  backgroundColor: "$backgroundSecondary",
  padding: "$2xl",
});

const Title = styled("h1", {
  color: "$primary",
  fontSize: "$4xl",
});

const Description = styled("p", {
  color: "$textSecondary",
  fontSize: "$lg",
});

const Button = styled("button", {
  backgroundColor: "$primary",
  color: "$background",
  border: "none",
  borderRadius: "$md",
  padding: "$md $xl",

  "&:hover": {
    backgroundColor: "$primaryLight",
  },
});

export default function Home() {
  return (
    <Container>
      <Title>PetHub</Title>
      <Description>
        Plataforma Nacional de Integração para Proteção Animal.
      </Description>
      <Button>Conheça o PetHub</Button>
    </Container>
  );
}
