"use client";

import type { HTMLAttributes } from "react";

import { ChevronDown, User } from "lucide-react";

interface UserCardProps
  extends Omit<HTMLAttributes<HTMLElement>, "children" | "onClick"> {
  name: string;
  role?: string;
  avatarUrl?: string;
  variant?: "card" | "compact";
  indicator?: "dot" | "chevron" | "none";
  onClick?: () => void;
}

export default function UserCard({
  name,
  role,
  avatarUrl,
  variant = "card",
  indicator,
  onClick,
  className = "",
  ...props
}: UserCardProps) {
  const resolvedIndicator =
    indicator ?? (variant === "card" ? "dot" : "chevron");

  const classes = `user-card user-card-${variant} ${
    onClick ? "user-card-button" : ""
  } ${className}`;

  const content = (
    <>
      <span className="user-card-avatar" aria-hidden>
        {avatarUrl ? (
          <img src={avatarUrl} alt="" />
        ) : (
          <User size={variant === "card" ? 24 : 16} />
        )}
      </span>

      <span className="user-card-text">
        <strong>{name}</strong>
        {role && <small>{role}</small>}
      </span>

      {resolvedIndicator === "dot" && (
        <span className="user-card-dot" aria-hidden />
      )}
      {resolvedIndicator === "chevron" && (
        <ChevronDown size={14} className="user-card-chevron" aria-hidden />
      )}

      {/*
        Estilos globais (com prefixo "user-card") em vez de escopados:
        o conteúdo é montado fora do elemento que contém o <style>,
        então o escopo do styled-jsx não chegaria nos elementos internos.
      */}
      <style jsx global>{`
        .user-card {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
          border: 1px solid var(--colors-border);
          background-color: var(--colors-background);
          color: var(--colors-text);
          font-family: var(--fonts-sans, Arial, Helvetica, sans-serif);
          text-align: left;
        }

        .user-card-button {
          cursor: pointer;
          transition: background-color 200ms ease;
        }

        .user-card-button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px var(--colors-primaryLight);
        }

        /* ---- card ---- */
        .user-card-card {
          width: 100%;
          padding: 12px 16px;
          border-radius: 28px;
          box-shadow: var(--shadows-sm);
        }

        .user-card-card .user-card-avatar {
          width: 48px;
          height: 48px;
        }

        .user-card-card .user-card-text strong {
          font-size: 18px;
          font-weight: 700;
        }

        .user-card-card .user-card-text small {
          font-size: 14px;
        }

        /* ---- compact ---- */
        .user-card-compact {
          gap: 10px;
          padding: 6px 14px 6px 6px;
          border-radius: var(--radii-full);
          background-color: var(--colors-backgroundSecondary);
        }

        .user-card-compact.user-card-button:hover {
          background-color: var(--colors-border);
        }

        .user-card-compact .user-card-avatar {
          width: 32px;
          height: 32px;
        }

        .user-card-compact .user-card-text {
          display: none;
        }

        .user-card-compact .user-card-text strong {
          font-size: 13px;
          font-weight: 600;
        }

        .user-card-compact .user-card-text small {
          font-size: 11px;
        }

        @media (min-width: 640px) {
          .user-card-compact .user-card-text {
            display: flex;
          }
        }

        /* ---- comum ---- */
        .user-card-avatar {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: var(--radii-full);
          background-color: var(--colors-adoptedBackground);
          color: var(--colors-primary);
          font-weight: 700;
        }

        .user-card-avatar img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-card-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
          line-height: 1.3;
        }

        .user-card-text strong {
          overflow: hidden;
          color: var(--colors-text);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-card-text small {
          overflow: hidden;
          color: var(--colors-textMuted);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-card-dot {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          margin-left: auto;
          border-radius: var(--radii-full);
          background-color: var(--colors-textSecondary);
        }

        .user-card-chevron {
          flex-shrink: 0;
          color: var(--colors-textMuted);
        }
      `}</style>
    </>
  );

  return onClick ? (
    <button type="button" className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  ) : (
    <div className={classes} {...props}>
      {content}
    </div>
  );
}