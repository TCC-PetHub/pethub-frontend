"use client";

import { Building2, X } from "lucide-react";
import TopBar from "@/components/TopBar";
import styles, { userStyles } from "@/app/(auth)/usuario/styles";

import { useUserPortal } from "@/features/user/useUserPortal";
export default function ApplicationsPage() {
  const { filter, setFilter, selected, setSelected, visible, dialogRef, closeModal } = useUserPortal();
  return (<div className={`${userStyles()} ${styles.page}`}>
    <TopBar />
    <main className={styles.main}>
      <>
        <div className={styles.heading}>
          <div>
            <h1>Minhas Solicitações de Adoção</h1>
            <p>Acompanhe o andamento dos seus processos de adoção</p>
          </div>
          <div className={styles.filters} aria-label="Filtrar solicitações">
            {["Todas", "Em Análise", "Pendentes", "Aprovadas"].map(
              (label) => (
                <button
                  key={label}
                  aria-pressed={filter === label}
                  className={filter === label ? styles.activeFilter : ""}
                  onClick={() => setFilter(label)}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>
        <div className={styles.applications}>
          {visible.map((item, index) => (
            <article key={`${item.name}-${index}`} className={`${styles.card} ${styles.application}`}>
              <div className={styles.petSpace} aria-hidden />
              <div className={styles.applicationBody}>
                <div className={styles.applicationTop}>
                  <h2>{item.name}</h2>
                  <span className={`${styles.badge} ${styles[item.tone as keyof typeof styles]}`}>{item.status}</span>
                </div>
                <p className={styles.description}>{item.description}</p>
                <p className={styles.organization}><Building2 size={13} />{item.organization}</p>
                <footer>
                  <small>Solicitado em {item.date}</small>
                  <div><button className={styles.primary} onClick={() => setSelected(item)}>Ver Detalhes</button></div>
                </footer>
              </div>
            </article>
          ))}
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
      {selected && (
        <>
          <h2>{`Adoção de ${selected.name}`}</h2>
          <p>{selected.organization}</p>
          <>
            <p>{selected.description}</p>
            <p>
              Status: <strong>{selected.status}</strong>
            </p>
            <p>Solicitado em {selected.date}</p>
            <p>
              O acompanhamento será atualizado pela organização responsável.
            </p>
          </>
        </>
      )}
    </dialog>

  </div>);
}
