"use client";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  BookOpen,
  HelpCircle,
  MessageCircle,
  Wrench,
  Search,
  Send,
  Headphones,
  X,
} from "lucide-react";
import PortalShell from "@/components/PortalShell";
import s from "./styles";
type Ticket = {
  id: string;
  subject: string;
  description: string;
  type: string;
  date: string;
  status: string;
  attachment?: string;
};
const seed: Ticket[] = [
  {
    id: "SUP-1051",
    subject: "Não consigo enviar uma foto",
    description: "Dificuldade para anexar uma foto ao cadastro.",
    type: "Problema",
    date: "10/02/2026",
    status: "Em análise",
  },
  {
    id: "SUP-1048",
    subject: "Como acompanhar minha adoção?",
    description: "Gostaria de acompanhar o andamento da solicitação.",
    type: "Pergunta",
    date: "05/02/2026",
    status: "Respondida",
  },
  {
    id: "SUP-1027",
    subject: "Atualização do meu telefone",
    description: "Atualização dos dados de contato no perfil.",
    type: "Dúvida",
    date: "01/02/2026",
    status: "Resolvida",
  },
];
const faq = [
  {
    q: "Como acompanhar minha solicitação de adoção?",
    a: "Acesse Início na barra superior e clique no card Minhas adoções para consultar o status e os detalhes de cada solicitação.",
  },
  {
    q: "Como visualizar meus dados pessoais?",
    a: "Acesse Início na barra superior. No seu perfil, use Editar Perfil para atualizar nome, e-mail, telefone e cidade.",
  },
  {
    q: "Como conversar com a ONG responsável?",
    a: "Consulte a organização responsável no perfil do animal. A plataforma não possui mensagens; utilize os canais oficiais da organização.",
  },
  {
    q: "Como reportar um problema na plataforma?",
    a: "Selecione Problema no formulário, descreva o que aconteceu e envie a solicitação.",
  },
];
export default function SupportPage() {
  const [type, setType] = useState("Problema");
  const [tickets, setTickets] = useState(seed);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [notice, setNotice] = useState("");
  const [attachmentError, setAttachmentError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [selected]);
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("pethub:support") || "null",
        );
        if (Array.isArray(saved)) setTickets(saved);
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("attachment") as File;
    if (file?.size > 10 * 1024 * 1024) {
      setAttachmentError("O anexo deve ter até 10 MB.");
      return;
    }
    setAttachmentError("");
    const ticket = {
      id: `SUP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      subject: String(data.get("subject")).trim(),
      description: String(data.get("description")).trim(),
      type,
      date: new Date().toLocaleDateString("pt-BR"),
      status: "Em análise",
      attachment: file?.name || undefined,
    };
    const next = [ticket, ...tickets];
    try {
      localStorage.setItem("pethub:support", JSON.stringify(next));
      setTickets(next);
      form.reset();
      setNotice(
        `Solicitação ${ticket.id} salva neste navegador. Nenhum dado foi enviado a uma equipe de atendimento.`,
      );
    } catch {
      setNotice("Não foi possível salvar a solicitação. Tente novamente.");
    }
  }
  return (
    <PortalShell>
      <div className={s.heading}>
        <div>
          <h1>Suporte</h1>
          <p>
            Precisa de ajuda, Carlos? Envie uma dúvida, pergunte ou registre um
            problema.
          </p>
        </div>
      </div>
      <div className={s.supportLayout}>
        <section className={`${s.card} ${s.formPanel}`}>
          <form onSubmit={submit}>
            <h2>Enviar uma solicitação</h2>
            <p className={s.muted}>
              Conte o que aconteceu ou envie sua pergunta para a equipe PetHub.
            </p>
            <label>Tipo de solicitação *</label>
            <div className={s.typeOptions}>
              {[
                { name: "Reclamação", icon: BookOpen },
                { name: "Dúvida", icon: HelpCircle },
                { name: "Pergunta", icon: MessageCircle },
                { name: "Problema", icon: Wrench },
              ].map(({ name, icon: Icon }) => (
                <button
                  type="button"
                  key={name}
                  aria-pressed={type === name}
                  className={type === name ? s.selectedType : ""}
                  onClick={() => setType(name)}
                >
                  <Icon size={16} />
                  {name}
                </button>
              ))}
            </div>
            <div className={s.formGrid}>
              <label>
                Área relacionada *
                <Select name="area" required>
                  <option>Minha conta</option>
                  <option>Adoção</option>
                  <option>Animais</option>
                  <option>Doações</option>
                  <option>Outro</option>
                </Select>
              </label>
              <label>
                E-mail para retorno *
                <Input
                  name="email"
                  type="email"
                  required
                  defaultValue="carlos.alberto@email.com"
                />
              </label>
            </div>
            <label>
              Assunto *
              <Input
                name="subject"
                required
                maxLength={120}
                placeholder="Resuma sua solicitação"
              />
            </label>
            <label>
              Descrição *
              <Textarea
                name="description"
                required
                minLength={10}
                placeholder="Descreva o ocorrido. Inclua os passos e o resultado esperado."
              />
            </label>
            <label>
              Anexo (opcional)
              <Input
                type="file"
                name="attachment"
                accept=".png,.jpg,.jpeg,.pdf"
                fileLabel="Adicionar arquivo"
                fileHint="PNG, JPG ou PDF, até 10 MB"
                error={attachmentError}
                onChange={() => setAttachmentError("")}
              />
            </label>
            <div className={s.formActions}>
              <small className={s.muted}>
                Demonstração: o anexo terá apenas o nome registrado.
              </small>
              <button type="submit" className={s.primary}>
                <Send size={14} />
                Enviar solicitação
              </button>
            </div>
            {notice && (
              <p role="status" className={s.notice}>
                {notice}
              </p>
            )}
          </form>
        </section>
        <aside>
          <section className={`${s.card} ${s.faq}`}>
            <h2>Perguntas frequentes</h2>
            <p className={s.muted}>Respostas rápidas para usar o PetHub.</p>
            <Input
              type="search"
              icon={<Search size={16} />}
              aria-label="Buscar perguntas"
              placeholder="Buscar uma dúvida..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {faq
              .filter((f) =>
                `${f.q} ${f.a}`
                  .toLocaleLowerCase("pt-BR")
                  .includes(search.toLocaleLowerCase("pt-BR")),
              )
              .map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
          </section>
          <section className={s.help}>
            <h2>
              <Headphones size={17} />
              Estamos aqui para ajudar
            </h2>
            <p>
              Descreva o que aconteceu e informe como podemos ajudar. Você pode
              acompanhar suas solicitações logo abaixo.
            </p>
          </section>
        </aside>
      </div>
      <section className={`${s.card} ${s.ticketPanel}`}>
        <div className={s.row}>
          <div>
            <h2>Minhas solicitações</h2>
            <p className={s.muted}>
              Acompanhe o andamento e consulte os detalhes.
            </p>
          </div>
          <Select
            aria-label="Filtrar solicitações por status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option>Em análise</option>
            <option>Respondida</option>
            <option>Resolvida</option>
          </Select>
        </div>
        <div className={s.tableScroll}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>PROTOCOLO / DATA</th>
                <th>ASSUNTO / ÚLTIMA ATUALIZAÇÃO</th>
                <th>TIPO</th>
                <th>STATUS</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {tickets
                .filter((t) => !status || t.status === status)
                .map((t) => (
                  <tr key={t.id}>
                    <td>
                      <strong>{t.id}</strong>
                      <br />
                      {t.date}
                    </td>
                    <td>
                      <strong>{t.subject}</strong>
                      <br />
                      {t.description}
                    </td>
                    <td>{t.type}</td>
                    <td>
                      <span
                        className={`${s.badge} ${t.status === "Em análise" ? s.amber : s.mint}`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={s.textButton}
                        onClick={() => setSelected(t)}
                      >
                        Ver detalhes ›
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p className={s.muted}>
          Solicitações demonstrativas armazenadas neste navegador.
        </p>
      </section>
      <dialog
        ref={dialogRef}
        aria-label="Detalhes da solicitação"
        className={s.modal}
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
      >
        {selected && (
          <>
            <button
              className={s.close}
              aria-label="Fechar detalhes"
              onClick={() => setSelected(null)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setSelected(null);
              }}
            >
              <X size={20} />
            </button>
            <h2>{selected.subject}</h2>
            <p>
              {selected.id} • {selected.date}
            </p>
            <p>Status: {selected.status}</p>
            <p>{selected.description}</p>
            {selected.attachment && (
              <p>Anexo registrado: {selected.attachment}</p>
            )}
            <p className={s.muted}>
              Registro demonstrativo, sem envio ao atendimento.
            </p>
          </>
        )}
      </dialog>
    </PortalShell>
  );
}
