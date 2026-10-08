"use client";

import Link from "next/link";

import {
  Heart,
  House,
  Mail,
  MapPin,
  Pencil,
  PawPrint,
  Phone,
  Star,
  Users,
  X,
} from "lucide-react";

import Input, { type StandardInputProps } from "@/components/Input";
import TopBar from "@/components/TopBar";
import { useUserPortal } from "@/features/user/useUserPortal";

import {
  ActionButton,
  AvatarSpace,
  Chip,
  Chips,
  CloseButton,
  Column,
  Contacts,
  Dashboard,
  Dialog,
  DialogForm,
  DialogTitle,
  EditButton,
  Environment,
  FieldLabel,
  Identity,
  Main,
  NameRow,
  Notifications,
  Page,
  Panel,
  Preference,
  Profile,
  Stat,
  StatLabel,
  StatValue,
  Stats,
  Switch,
  VerifiedBadge,
} from "./styles";

const NOTIFICATIONS_STORAGE_KEY = "pethub:notifications";

const PROFILE_FIELDS: ReadonlyArray<{
  key: "name" | "email" | "phone" | "city";
  label: string;
  type: NonNullable<StandardInputProps["type"]>;
}> = [
  { key: "name", label: "Nome", type: "text" },
  { key: "email", label: "E-mail", type: "email" },
  { key: "phone", label: "Telefone", type: "tel" },
  { key: "city", label: "Cidade / Estado", type: "text" },
];

const PREFERRED_SPECIES = ["Cães", "Gatos"];
const PREFERRED_SIZES = ["Médio", "Grande"];

const ENVIRONMENT = [
  { icon: House, text: "Casa com quintal cercado" },
  { icon: Users, text: "Moro com 3 adultos (sem crianças pequenas)" },
  { icon: PawPrint, text: "Já possuo 1 pet (cão idoso sociável)" },
];

export default function UserPage() {
  const {
    profile,
    notifications,
    setNotifications,
    requests,
    editing,
    setEditing,
    dialogRef,
    closeModal,
    saveProfile,
  } = useUserPortal();

  const inProgress = requests.filter((item) =>
    ["analysis", "pending"].includes(item.tone),
  ).length;
  const completed = requests.filter((item) => item.tone === "completed").length;

  function toggleNotifications() {
    const value = !notifications;
    setNotifications(value);

    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, String(value));
    } catch {
      /* Mantém a preferência apenas na sessão. */
    }
  }

  return (
    <Page>
      <TopBar />

      <Main>
        <Profile aria-label="Seu perfil">
          <AvatarSpace aria-hidden />

          <Identity>
            <NameRow>
              <h1>{profile.name}</h1>
              <VerifiedBadge>Conta Verificada</VerifiedBadge>
            </NameRow>

            <Contacts>
              <span>
                <Mail aria-hidden />
                {profile.email}
              </span>
              <span>
                <Phone aria-hidden />
                {profile.phone}
              </span>
              <span>
                <MapPin aria-hidden />
                {profile.city}
              </span>
            </Contacts>
          </Identity>

          <EditButton type="button" onClick={() => setEditing(true)}>
            <Pencil size={14} aria-hidden />
            Editar Perfil
          </EditButton>
        </Profile>

        <Dashboard>
          <Column>
            <Stats>
              <Stat
                as={Link}
                href="/usuario/adocoes"
                interactive
                aria-label="Minhas adoções: ver solicitações"
              >
                <StatLabel>
                  MINHAS ADOÇÕES
                  <Heart size={16} aria-hidden />
                </StatLabel>
                <StatValue>
                  <strong>{requests.length}</strong>
                  <span>Solicitações feitas</span>
                </StatValue>
                <small>
                  {inProgress} em andamento • {completed}{" "}
                  {completed === 1 ? "concluída" : "concluídas"}
                </small>
              </Stat>

              <Stat>
                <StatLabel iconColor="warning">
                  ANIMAIS FAVORITOS
                  <Star size={16} aria-hidden />
                </StatLabel>
                <StatValue>
                  <strong>5</strong>
                  <span>Salvos para acompanhar</span>
                </StatValue>
                <small>4 cães • 1 gato</small>
              </Stat>
            </Stats>

            <Notifications>
              <div>
                <h2>Receber atualizações de campanhas e novidades</h2>
                <p>
                  Envio de e-mails sobre mutirões de vacinação, feiras de adoção
                  e campanhas da sua área.
                </p>
              </div>

              <Switch
                type="button"
                role="switch"
                aria-checked={notifications}
                aria-label="Receber atualizações por e-mail"
                checked={notifications}
                onClick={toggleNotifications}
              >
                <span />
              </Switch>
            </Notifications>
          </Column>

          <Column as="aside">
            <Panel>
              <h2>Preferências de Adoção</h2>

              <Preference>
                <h3>ESPÉCIES PREFERIDAS</h3>
                <Chips>
                  {PREFERRED_SPECIES.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </Chips>
              </Preference>

              <Preference>
                <h3>PORTE DO ANIMAL</h3>
                <Chips>
                  {PREFERRED_SIZES.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </Chips>
              </Preference>

              <Preference>
                <h3>NECESSIDADES ESPECIAIS</h3>
                <Chips>
                  <Chip outline>Sim, aceito pets especiais</Chip>
                </Chips>
              </Preference>
            </Panel>

            <Panel>
              <h2>Meu Ambiente</h2>
              <Environment>
                {ENVIRONMENT.map(({ icon: Icon, text }) => (
                  <li key={text}>
                    <Icon aria-hidden />
                    {text}
                  </li>
                ))}
              </Environment>
            </Panel>
          </Column>
        </Dashboard>
      </Main>

      <Dialog
        ref={dialogRef}
        aria-labelledby="edit-profile-title"
        onCancel={closeModal}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}
      >
        <CloseButton type="button" onClick={closeModal} aria-label="Fechar">
          <X size={20} aria-hidden />
        </CloseButton>

        {editing && (
          <DialogForm onSubmit={saveProfile}>
            <DialogTitle id="edit-profile-title">Editar Perfil</DialogTitle>

            {PROFILE_FIELDS.map(({ key, label, type }) => (
              <FieldLabel key={key}>
                {label}
                <Input
                  variant="compact"
                  name={key}
                  defaultValue={profile[key]}
                  type={type}
                  required
                />
              </FieldLabel>
            ))}

            <ActionButton variant="primary" type="submit">
              Salvar alterações
            </ActionButton>
          </DialogForm>
        )}
      </Dialog>
    </Page>
  );
}
