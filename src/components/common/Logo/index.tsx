import { PawPrint } from "lucide-react";

import { LogoLink, Mark, Text, Wrapper } from "./styles";

interface LogoProps {
  /** Versão para fundos escuros (footer). */
  light?: boolean;
  className?: string;
  /** Se informado, a logo vira um link para esse destino. */
  href?: string;
}

export default function Logo({ light = false, className, href }: LogoProps) {
  const logo = (
    <Wrapper className={className}>
      <Mark>
        <PawPrint size={22} aria-hidden />
      </Mark>

      <Text light={light}>
        <strong>PetHub</strong>
        <small>Proteção Animal</small>
      </Text>
    </Wrapper>
  );

  if (!href) return logo;

  return (
    <LogoLink href={href} aria-label="PetHub, ir para a página inicial">
      {logo}
    </LogoLink>
  );
}
