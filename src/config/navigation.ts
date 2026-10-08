import {
  BarChart3,
  FileInput,
  Headphones,
  HeartHandshake,
  History,
  LayoutDashboard,
  Map,
  Megaphone,
  PawPrint,
  Settings,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

export type Role = "adopter" | "organization" | "admin";

export interface NavigationItem {
  label: string;
  href: string;
  exact?: boolean;
  paths?: string[];
  section?: string;
  icon?: LucideIcon;
}

export const navigationByRole: Record<Role, NavigationItem[]> = {
  adopter: [
    {
      label: "Início",
      href: "/usuario",
      exact: true,
      paths: ["/usuario", "/usuario/adocoes", "/public-portal"],
    },
    {
      label: "Animais",
      href: "/animais",
    },
    {
      label: "Doações",
      href: "/public-portal?secao=campanhas#campanhas",
      section: "campanhas",
    },
    {
      label: "Mapas",
      href: "/public-portal?secao=parceiros#parceiros",
      section: "parceiros",
    },
    {
      label: "Suporte",
      href: "/suporte",
    },
  ],

  organization: [
    { label: "Dashboard", href: "/Painel", exact: true, icon: LayoutDashboard },
    { label: "Animais", href: "/Painel/animais", icon: PawPrint },
    { label: "Adoção", href: "/Painel/adocao", icon: HeartHandshake },
    { label: "Mapa", href: "/Painel/mapa", icon: Map },
    { label: "Histórico", href: "/Painel/historico", icon: History },
    { label: "Importação", href: "/Painel/importacao", icon: FileInput },
    { label: "Campanhas", href: "/Painel/campanhas", icon: Megaphone },
    { label: "Candidatos", href: "/Painel/candidatos", icon: UserCheck },
    { label: "Relatórios", href: "/Painel/relatorios", icon: BarChart3 },
    { label: "Configurações", href: "/Painel/configuracoes", icon: Settings },
    { label: "Suporte", href: "/Painel/suporte", icon: Headphones },
  ],

  admin: [
    {
      label: "Visão Geral",
      href: "/admin",
      exact: true,
    },
    {
      label: "Usuários",
      href: "/admin/usuarios",
    },
    {
      label: "Organizações",
      href: "/admin/organizacoes",
    },
    {
      label: "Aprovações",
      href: "/admin/aprovacoes",
    },
    {
      label: "Denúncias e Alertas",
      href: "/admin/denuncias",
    },
    {
      label: "Configurações",
      href: "/admin/configuracoes",
    },
  ],
};

export const homeByRole: Record<Role, string> = {
  adopter: "/usuario",
  organization: "/Painel",
  admin: "/admin",
};

export const profileByRole: Record<Role, string> = {
  adopter: "/usuario",
  organization: "/Painel/configuracoes",
  admin: "/admin/configuracoes",
};

export const roleLabel: Record<Role, string> = {
  adopter: "Adotante",
  organization: "ONG / Protetor",
  admin: "Administrador",
};
