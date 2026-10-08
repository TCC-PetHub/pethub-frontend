"use client";
import Input from "@/components/Input";


import Link from "next/link";
import {
  Heart,
  Star,
  Mail,
  Phone,
  MapPin,
  House,
  Users,
  PawPrint,
  Pencil,
  X,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import styles, { userStyles } from "@/app/(auth)/usuario/styles";

import { useUserPortal } from "@/features/user/useUserPortal";
export default function UserPage() {
  const { profile, notifications, setNotifications, requests, editing, setEditing, dialogRef, closeModal, saveProfile } = useUserPortal();
  return (<div className={`${userStyles()} ${styles.page}`}>
    <TopBar />
    <main className={styles.main}>
      <>
        <section
          className={`${styles.card} ${styles.profile}`}
          aria-label="Seu perfil"
        >
          <div className={styles.avatarSpace} aria-hidden />
          <div className={styles.identity}>
            <div className={styles.nameRow}>
              <h1>{profile.name}</h1>
              <span className={styles.verified}>Conta Verificada</span>
            </div>
            <div className={styles.contacts}>
              <span>
                <Mail />
                {profile.email}
              </span>
              <span>
                <Phone />
                {profile.phone}
              </span>
              <span>
                <MapPin />
                {profile.city}
              </span>
            </div>
          </div>
          <button
            className={styles.secondary}
            onClick={() => setEditing(true)}
          >
            <Pencil size={14} />
            Editar Perfil
          </button>
        </section>
        <div className={styles.dashboard}>
          <div className={styles.leftColumn}>
            <div className={styles.stats}>
              <Link
                href="/usuario/adocoes"
                className={`${styles.card} ${styles.stat}`}
                aria-label="Minhas adoções: ver solicitações"
              >
                <div className={styles.statLabel}>
                  MINHAS ADOÇÕES
                  <Heart size={16} />
                </div>
                <div className={styles.statValue}>
                  <strong>{requests.length}</strong>
                  <span>Solicitações feitas</span>
                </div>
                <small>
                  {
                    requests.filter((item) =>
                      ["analysis", "pending"].includes(item.tone),
                    ).length
                  }{" "}
                  em andamento •{" "}
                  {
                    requests.filter((item) => item.tone === "completed")
                      .length
                  }{" "}
                  concluída
                </small>
              </Link>
              <div className={`${styles.card} ${styles.stat}`}>
                <div className={styles.statLabel}>
                  ANIMAIS FAVORITOS
                  <Star size={16} color="var(--colors-warning)" />
                </div>
                <div className={styles.statValue}>
                  <strong>5</strong>
                  <span>Salvos para acompanhar</span>
                </div>
                <small>4 cães • 1 gato</small>
              </div>
            </div>
            <section className={`${styles.card} ${styles.notifications}`}>
              <div>
                <h2>Receber atualizações de campanhas e novidades</h2>
                <p>
                  Envio de e-mails sobre mutirões de vacinação, feiras de
                  adoção e campanhas da sua área.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications}
                aria-label="Receber atualizações por e-mail"
                className={`${styles.switch} ${notifications ? styles.switchOn : ""}`}
                onClick={() => {
                  const value = !notifications;
                  setNotifications(value);
                  try {
                    localStorage.setItem(
                      "pethub:notifications",
                      String(value),
                    );
                  } catch {
                    /* Mantém a preferência na sessão. */
                  }
                }}
              >
                <span />
              </button>
            </section>
          </div>
          <aside className={styles.rightColumn}>
            <section className={`${styles.card} ${styles.panel}`}>
              <h2>Preferências de Adoção</h2>
              <div className={styles.preference}>
                <h3>ESPÉCIES PREFERIDAS</h3>
                <div className={styles.chips}>
                  <span>Cães</span>
                  <span>Gatos</span>
                </div>
              </div>
              <div className={styles.preference}>
                <h3>PORTE DO ANIMAL</h3>
                <div className={styles.chips}>
                  <span>Médio</span>
                  <span>Grande</span>
                </div>
              </div>
              <div className={styles.preference}>
                <h3>NECESSIDADES ESPECIAIS</h3>
                <span className={styles.outlineChip}>
                  Sim, aceito pets especiais
                </span>
              </div>
            </section>
            <section className={`${styles.card} ${styles.panel}`}>
              <h2>Meu Ambiente</h2>
              <ul className={styles.environment}>
                <li>
                  <House />
                  Casa com quintal cercado
                </li>
                <li>
                  <Users />
                  Moro com 3 adultos (sem crianças pequenas)
                </li>
                <li>
                  <PawPrint />
                  Já possuo 1 pet (cão idoso sociável)
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </>

    </main>
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={closeModal}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <button
        className={styles.close}
        onClick={closeModal}
        aria-label="Fechar"
      >
        <X size={20} />
      </button>
      {editing && (
        <form onSubmit={saveProfile}>
          <h2>Editar Perfil</h2>
          {Object.entries({
            name: "Nome",
            email: "E-mail",
            phone: "Telefone",
            city: "Cidade / Estado",
          }).map(([key, label]) => (
            <label key={key}>
              {label}
              <Input
                name={key}
                defaultValue={profile[key as keyof typeof profile]}
                required
                type={
                  key === "email" ? "email" : key === "phone" ? "tel" : "text"
                }
              />
            </label>
          ))}
          <button className={styles.primary} type="submit">
            Salvar alterações
          </button>
        </form>
      )}
    </dialog>

  </div>);
}
