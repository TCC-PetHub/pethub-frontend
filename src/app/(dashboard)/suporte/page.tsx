"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  BookOpen,
  Headphones,
  HelpCircle,
  MessageCircle,
  Search,
  Send,
  Wrench,
  X,
} from "lucide-react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PortalShell from "@/components/PortalShell";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";

import {
  Badge,
  CloseButton,
  FaqAnswer,
  FaqItem,
  FaqPanel,
  FaqQuestion,
  Field,
  FormActions,
  FormGrid,
  FormHint,
  FormPanel,
  FormTitle,
  Heading,
  HeadingText,
  HeadingTitle,
  HelpBox,
  HelpText,
  HelpTitle,
  Layout,
  Modal,
  ModalTitle,
  Muted,
  Notice,
  PanelTitle,
  Table,
  TableNote,
  TableScroll,
  TextButton,
  TicketHeader,
  TicketPanel,
  TypeButton,
  TypeOptions,
} from "./styles";

type Ticket = {
  id: string;
  subject: string;
  description: string;
  type: string;
  date: string;
  status: string;
  attachment?: string;
};

const STORAGE_KEY = "pethub:support";
const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;

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

const requestTypes = [
  { name: "Reclamação", icon: BookOpen },
  { name: "Dúvida", icon: HelpCircle },
  { name: "Pergunta", icon: MessageCircle },
  { name: "Problema", icon: Wrench },
];

export default function SupportPage() {
  const [type, setType] = useState("Problema");
  const [tickets, setTickets] = useState(seed);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [notice, setNotice] = useState("");
  const [attachmentError, setAttachmentError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selected && !dialog.open) dialog.showModal();
    else if (!selected && dialog.open) dialog.close();
  }, [selected]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        if (Array.isArray(saved)) setTickets(saved);
      } catch {}
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("attachment");
    const attachment = file instanceof File ? file : null;

    if (attachment && attachment.size > MAX_ATTACHMENT_SIZE) {
      setAttachmentError("O anexo deve ter até 10 MB.");
      return;
    }

    setAttachmentError("");

    const ticket: Ticket = {
      id: `SUP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      subject: String(data.get("subject")).trim(),
      description: String(data.get("description")).trim(),
      type,
      date: new Date().toLocaleDateString("pt-BR"),
      status: "Em análise",
      attachment: attachment?.name || undefined,
    };
    const next = [ticket, ...tickets];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setTickets(next);
      form.reset();
      setNotice(
        `Solicitação ${ticket.id} salva neste navegador. Nenhum dado foi enviado a uma equipe de atendimento.`,
      );
    } catch {
      setNotice("Não foi possível salvar a solicitação. Tente novamente.");
    }
  }

  const normalizedSearch = search.toLocaleLowerCase("pt-BR");
  const visibleFaq = faq.filter(({ q, a }) =>
    `${q} ${a}`.toLocaleLowerCase("pt-BR").includes(normalizedSearch),
  );
  const visibleTickets = tickets.filter(
    (ticket) => !statusFilter || ticket.status === statusFilter,
  );

  return (
    <PortalShell>
      <Heading>
        <div>
          <HeadingTitle>Suporte</HeadingTitle>
          <HeadingText>
            Precisa de ajuda, Carlos? Envie uma dúvida, pergunte ou registre um
            problema.
          </HeadingText>
        </div>
      </Heading>

      <Layout>
        <FormPanel>
          <form onSubmit={submit}>
            <FormTitle>Enviar uma solicitação</FormTitle>
            <Muted>
              Conte o que aconteceu ou envie sua pergunta para a equipe PetHub.
            </Muted>

            <Field as="span" id="request-type">
              Tipo de solicitação *
            </Field>
            <TypeOptions role="group" aria-labelledby="request-type">
              {requestTypes.map(({ name, icon: Icon }) => (
                <TypeButton
                  type="button"
                  key={name}
                  selected={type === name}
                  aria-pressed={type === name}
                  onClick={() => setType(name)}
                >
                  <Icon size={16} />
                  {name}
                </TypeButton>
              ))}
            </TypeOptions>

            <FormGrid>
              <Field>
                Área relacionada *
                <Select name="area" required>
                  <option>Minha conta</option>
                  <option>Adoção</option>
                  <option>Animais</option>
                  <option>Doações</option>
                  <option>Outro</option>
                </Select>
              </Field>

              <Field>
                E-mail para retorno *
                <Input
                  name="email"
                  type="email"
                  required
                  defaultValue="carlos.alberto@email.com"
                />
              </Field>
            </FormGrid>

            <Field>
              Assunto *
              <Input
                name="subject"
                required
                maxLength={120}
                placeholder="Resuma sua solicitação"
              />
            </Field>

            <Field>
              Descrição *
              <Textarea
                name="description"
                required
                minLength={10}
                placeholder="Descreva o ocorrido. Inclua os passos e o resultado esperado."
              />
            </Field>

            <Field>
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
            </Field>

            <FormActions>
              <FormHint>
                Demonstração: o anexo terá apenas o nome registrado.
              </FormHint>
              <Button variant="primary" type="submit">
                <Send size={14} />
                Enviar solicitação
              </Button>
            </FormActions>

            {notice && <Notice role="status">{notice}</Notice>}
          </form>
        </FormPanel>

        <aside>
          <FaqPanel>
            <PanelTitle>Perguntas frequentes</PanelTitle>
            <Muted>Respostas rápidas para usar o PetHub.</Muted>
            <Input
              type="search"
              icon={<Search size={16} />}
              aria-label="Buscar perguntas"
              placeholder="Buscar uma dúvida..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {visibleFaq.map(({ q, a }) => (
              <FaqItem key={q}>
                <FaqQuestion>{q}</FaqQuestion>
                <FaqAnswer>{a}</FaqAnswer>
              </FaqItem>
            ))}
          </FaqPanel>

          <HelpBox>
            <HelpTitle>
              <Headphones size={17} />
              Estamos aqui para ajudar
            </HelpTitle>
            <HelpText>
              Descreva o que aconteceu e informe como podemos ajudar. Você pode
              acompanhar suas solicitações logo abaixo.
            </HelpText>
          </HelpBox>
        </aside>
      </Layout>

      <TicketPanel>
        <TicketHeader>
          <div>
            <PanelTitle>Minhas solicitações</PanelTitle>
            <Muted>Acompanhe o andamento e consulte os detalhes.</Muted>
          </div>
          <Select
            aria-label="Filtrar solicitações por status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option>Em análise</option>
            <option>Respondida</option>
            <option>Resolvida</option>
          </Select>
        </TicketHeader>

        <TableScroll>
          <Table>
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
              {visibleTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <strong>{ticket.id}</strong>
                    <br />
                    {ticket.date}
                  </td>
                  <td>
                    <strong>{ticket.subject}</strong>
                    <br />
                    {ticket.description}
                  </td>
                  <td>{ticket.type}</td>
                  <td>
                    <Badge
                      tone={ticket.status === "Em análise" ? "amber" : "mint"}
                    >
                      {ticket.status}
                    </Badge>
                  </td>
                  <td>
                    <TextButton
                      type="button"
                      onClick={() => setSelected(ticket)}
                    >
                      Ver detalhes ›
                    </TextButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableScroll>

        <TableNote>
          Solicitações demonstrativas armazenadas neste navegador.
        </TableNote>
      </TicketPanel>

      <Modal
        ref={dialogRef}
        aria-label="Detalhes da solicitação"
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
      >
        {selected && (
          <>
            <CloseButton
              type="button"
              aria-label="Fechar detalhes"
              onClick={() => setSelected(null)}
            >
              <X size={20} />
            </CloseButton>
            <ModalTitle>{selected.subject}</ModalTitle>
            <p>
              {selected.id} • {selected.date}
            </p>
            <p>Status: {selected.status}</p>
            <p>{selected.description}</p>
            {selected.attachment && (
              <p>Anexo registrado: {selected.attachment}</p>
            )}
            <Muted>Registro demonstrativo, sem envio ao atendimento.</Muted>
          </>
        )}
      </Modal>
    </PortalShell>
  );
}
