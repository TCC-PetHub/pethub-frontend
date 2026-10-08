"use client";

import { Bell, Calendar, PawPrint, type LucideIcon } from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { theme } from "@/styles";

import {
  ActivityAvatar,
  ActivityInfo,
  ActivityItem,
  ActivityList,
  ActivityTime,
  Badge,
  BarFill,
  BarHeader,
  BarRow,
  BarTrack,
  Bars,
  Card,
  CardSubtitle,
  CardTitle,
  ChartBox,
  DonutCenter,
  DonutWrap,
  Header,
  HeaderActions,
  HeaderText,
  IconButton,
  Legend,
  LegendItem,
  PeriodButton,
  Row,
  Stat,
  StatHeader,
  StatLabel,
  StatValue,
  Stats,
  Swatch,
} from "./styles";

/* -------------------------------------------------------------------------- */
/* Dados (mock)                                                               */
/* -------------------------------------------------------------------------- */

const COLORS = {
  primary: theme.colors.primaryLight.value,
  warning: theme.colors.warning.value,
  muted: theme.colors.textSubtle.value,
  grid: theme.colors.border.value,
  background: theme.colors.background.value,
  text: theme.colors.text.value,
};

const STATS: ReadonlyArray<{
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  highlight?: boolean;
}> = [
  {
    label: "Animais Cadastrados",
    value: "12.847",
    change: "+8.2%",
    trend: "up",
  },
  {
    label: "Adoções Realizadas",
    value: "3.291",
    change: "+12.4%",
    trend: "up",
    highlight: true,
  },
  {
    label: "Aguardando Adoção",
    value: "4.156",
    change: "-2.1%",
    trend: "down",
  },
  { label: "Devoluções", value: "187", change: "-1.5%", trend: "down" },
];

const MONTHLY_ADOPTIONS = [
  { month: "Jan", total: 120 },
  { month: "Fev", total: 160 },
  { month: "Mar", total: 215 },
  { month: "Abr", total: 190 },
  { month: "Mai", total: 275 },
  { month: "Jun", total: 300 },
  { month: "Jul", total: 345 },
  { month: "Ago", total: 285 },
  { month: "Set", total: 370 },
  { month: "Out", total: 420 },
  { month: "Nov", total: 440 },
  { month: "Dez", total: 470 },
];

const SPECIES = [
  { name: "Cães", value: 62, color: COLORS.primary },
  { name: "Gatos", value: 34, color: COLORS.warning },
  { name: "Outros", value: 4, color: COLORS.muted },
];

const TOP_ORGANIZATIONS = [
  { name: "ONG Amigos de Patas (SP)", adoptions: 245 },
  { name: "Instituto ProAnima (DF)", adoptions: 198 },
  { name: "SOS Vida Animal (RJ)", adoptions: 164 },
  { name: "Abrigo São Francisco (BA)", adoptions: 120 },
  { name: "Adote um Gatinho (SP)", adoptions: 95 },
];

const ACTIVITIES: ReadonlyArray<{
  pet: string;
  action: string;
  details: string;
  time: string;
  icon: LucideIcon;
}> = [
  {
    pet: "Pipoca",
    action: "adotado(a)!",
    details: "SRD • Filhote • Amarelo • Amigos de Patas (SP)",
    time: "5m",
    icon: PawPrint,
  },
  {
    pet: "Luna",
    action: "resgatado(a)",
    details: "Felis Catus • Adulto • Cinza • SOS Vida Animal (RJ)",
    time: "14m",
    icon: PawPrint,
  },
  {
    pet: "Thor",
    action: "adotado(a)!",
    details: "Pastor Alemão • Jovem • Capa Preta • Instituto ProAnima (DF)",
    time: "1h",
    icon: PawPrint,
  },
  {
    pet: "Bolinha",
    action: "resgatado(a)",
    details: "SRD • Idoso • Branco e Preto • Abrigo São Francisco (BA)",
    time: "2h",
    icon: PawPrint,
  },
];

const maxAdoptions = Math.max(...TOP_ORGANIZATIONS.map((org) => org.adoptions));

/* -------------------------------------------------------------------------- */
/* Página                                                                     */
/* -------------------------------------------------------------------------- */

export default function OrganizationDashboardPage() {
  return (
    <>
      <Header>
        <HeaderText>
          <h1>Painel de Controle</h1>
          <p>Consolidado nacional de proteção animal em tempo real</p>
        </HeaderText>

        <HeaderActions>
          <PeriodButton type="button">
            <Calendar size={14} aria-hidden />
            Últimos 12 meses
          </PeriodButton>

          <IconButton type="button" aria-label="Notificações">
            <Bell size={16} aria-hidden />
          </IconButton>
        </HeaderActions>
      </Header>

      <Stats aria-label="Indicadores gerais">
        {STATS.map(({ label, value, change, trend, highlight }) => (
          <Stat key={label} highlight={highlight}>
            <StatHeader>
              <StatLabel>{label}</StatLabel>
              <Badge trend={trend}>{change}</Badge>
            </StatHeader>
            <StatValue>{value}</StatValue>
          </Stat>
        ))}
      </Stats>

      <Row layout="charts">
        <Card>
          <CardTitle>Adoções por Mês</CardTitle>
          <CardSubtitle>Histórico acumulado do ano corrente</CardSubtitle>

          <ChartBox>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={MONTHLY_ADOPTIONS}
                margin={{ top: 8, right: 12, bottom: 0, left: 12 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="4 4"
                  stroke={COLORS.grid}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: COLORS.muted }}
                  tickMargin={12}
                />
                <YAxis hide domain={[0, "dataMax + 40"]} />
                <Tooltip
                  cursor={{ stroke: COLORS.grid }}
                  formatter={(value) => [`${value}`, "Adoções"]}
                  contentStyle={{
                    borderRadius: 8,
                    border: `1px solid ${COLORS.grid}`,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="linear"
                  dataKey="total"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                  dot={{
                    r: 3,
                    stroke: COLORS.primary,
                    strokeWidth: 2,
                    fill: COLORS.background,
                  }}
                  activeDot={{ r: 5, fill: COLORS.primary }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>
        </Card>

        <Card>
          <CardTitle>Distribuição por Espécie</CardTitle>

          <DonutWrap>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SPECIES}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="68%"
                  outerRadius="95%"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {SPECIES.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, ""]}
                  contentStyle={{
                    borderRadius: 8,
                    border: `1px solid ${COLORS.grid}`,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <DonutCenter aria-hidden>
              <strong>100%</strong>
              <span>Espécies</span>
            </DonutCenter>
          </DonutWrap>

          <Legend>
            {SPECIES.map((item) => (
              <LegendItem key={item.name}>
                <Swatch style={{ backgroundColor: item.color }} aria-hidden />
                <span>{item.name}</span>
                <strong>{item.value}%</strong>
              </LegendItem>
            ))}
          </Legend>
        </Card>
      </Row>

      <Row layout="lists">
        <Card>
          <CardTitle>Top 5 Organizações parceiras</CardTitle>
          <CardSubtitle>
            Entidades com maior volume de adoções este mês
          </CardSubtitle>

          <Bars>
            {TOP_ORGANIZATIONS.map((org, index) => (
              <BarRow key={org.name}>
                <BarHeader>
                  <span>{org.name}</span>
                  <span>
                    <strong>{org.adoptions}</strong> adoções
                  </span>
                </BarHeader>

                <BarTrack
                  role="progressbar"
                  aria-label={org.name}
                  aria-valuemin={0}
                  aria-valuemax={maxAdoptions}
                  aria-valuenow={org.adoptions}
                >
                  <BarFill
                    highlight={index === TOP_ORGANIZATIONS.length - 1}
                    style={{
                      width: `${(org.adoptions / maxAdoptions) * 100}%`,
                    }}
                  />
                </BarTrack>
              </BarRow>
            ))}
          </Bars>
        </Card>

        <Card>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardSubtitle>Últimos animais acolhidos ou adotados</CardSubtitle>

          <ActivityList>
            {ACTIVITIES.map(({ pet, action, details, time, icon: Icon }) => (
              <ActivityItem key={pet}>
                <ActivityAvatar aria-hidden>
                  <Icon size={16} />
                </ActivityAvatar>

                <ActivityInfo>
                  <p>
                    <strong>{pet}</strong> {action}
                  </p>
                  <small>{details}</small>
                </ActivityInfo>

                <ActivityTime>{time}</ActivityTime>
              </ActivityItem>
            ))}
          </ActivityList>
        </Card>
      </Row>
    </>
  );
}
