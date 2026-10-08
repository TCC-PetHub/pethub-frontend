import Link from "next/link";
import { PawPrint } from "lucide-react";

interface LogoProps {
  /** Versão para fundos escuros (footer). */
  light?: boolean;
  className?: string;
  /** Se informado, a logo vira um link para esse destino. */
  href?: string;
}

export default function Logo({
  light = false,
  className = "",
  href,
}: LogoProps) {
  const logo = (
    <div className={`logo ${light ? "logo-light" : ""} ${className}`}>
      <span className="logo-mark">
        <PawPrint size={22} aria-hidden />
      </span>

      <span className="logo-text">
        <strong>PetHub</strong>
        <small>Proteção Animal</small>
      </span>

      <style jsx>{`
        .logo {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          font-family: var(--fonts-sans);
          user-select: none;
        }

        .logo-mark {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radii-lg);
          background-color: var(--colors-primaryLight);
          color: var(--colors-background);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .logo-text strong {
          color: var(--colors-primaryLight);
          font-size: var(--fontSizes-lg);
          font-weight: 700;
        }

        .logo-text small {
          color: var(--colors-textMuted);
          font-size: var(--fontSizes-size10);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .logo-light .logo-text strong {
          color: var(--colors-background);
        }

        .logo-light .logo-text small {
          color: var(--colors-textSubtle);
        }
      `}</style>
    </div>
  );

  if (!href) return logo;

  // O estilo do link fica inline porque o styled-jsx não alcança o <Link>.
  return (
    <Link
      href={href}
      aria-label="PetHub, ir para a página inicial"
      style={{
        display: "inline-flex",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {logo}
    </Link>
  );
}
