"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { applications, initialProfile } from "./data";
export function useUserPortal() {
  const [profile, setProfile] = useState(initialProfile);
  const [notifications, setNotifications] = useState(false);
  const [filter, setFilter] = useState("Todas");
  const [requests, setRequests] = useState(applications);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<
    (typeof applications)[number] | null
  >(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalOpen = editing || selected !== null;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("pethub:profile") || "null",
        );
        if (
          saved &&
          Object.keys(initialProfile).every(
            (key) => typeof saved[key] === "string",
          )
        )
          setProfile(saved);
        setNotifications(
          localStorage.getItem("pethub:notifications") === "true",
        );
        const savedRequests = JSON.parse(
          localStorage.getItem("pethub:adoptionRequests") || "[]",
        );
        if (Array.isArray(savedRequests))
          setRequests([
            ...savedRequests.filter(
              (item) =>
                item &&
                typeof item.name === "string" &&
                typeof item.description === "string" &&
                typeof item.organization === "string" &&
                typeof item.date === "string" &&
                typeof item.status === "string" &&
                typeof item.tone === "string",
            ),
            ...applications,
          ]);
      } catch {
        /* Mantém os dados de demonstração quando o armazenamento não está disponível. */
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (modalOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [modalOpen]);

  function closeModal() {
    setEditing(false);
    setSelected(null);
  }
  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updated = Object.fromEntries(
      Object.keys(initialProfile).map((key) => [
        key,
        String(data.get(key)).trim(),
      ]),
    ) as typeof initialProfile;
    setProfile(updated);
    try {
      localStorage.setItem("pethub:profile", JSON.stringify(updated));
      window.dispatchEvent(new Event("pethub:profile-updated"));
    } catch {
      /* Perfil preservado na sessão. */
    }
    closeModal();
  }
  const visible = requests.filter(
    (item) =>
      filter === "Todas" ||
      (filter === "Em Análise" && item.tone === "analysis") ||
      (filter === "Pendentes" && item.tone === "pending") ||
      (filter === "Aprovadas" && item.tone === "approved"),
  );


  return { profile, notifications, setNotifications, filter, setFilter, requests, editing, setEditing, selected, setSelected, dialogRef, closeModal, saveProfile, visible };
}
