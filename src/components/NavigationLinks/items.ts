export interface NavigationItem {
  label: string;
  href: string;
  exact?: boolean;
  paths?: string[];
  section?: string;
}
export const USER_NAV_ITEMS: NavigationItem[] = [
  {
    label: "Início",
    href: "/usuario",
    exact: true,
    paths: ["/usuario", "/usuario/adocoes", "/public-portal"],
  },
  { label: "Animais", href: "/animais" },
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
  { label: "Suporte", href: "/suporte" },
];

export function getActiveNavigationHref(
  pathname: string,
  hash: string,
  sectionName?: string | null,
) {
  const section = USER_NAV_ITEMS.find(
    (item) =>
      pathname === "/public-portal" &&
      item.section === (sectionName || hash.replace(/^#/, "")) &&
      !!item.section,
  );
  if (section) return section.href;
  return USER_NAV_ITEMS.filter(
    (item) =>
      !item.href.includes("#") &&
      (item.paths || [item.href]).some(
        (route) =>
          pathname === route ||
          (!item.exact && pathname.startsWith(`${route}/`)),
      ),
  ).sort((left, right) => right.href.length - left.href.length)[0]?.href;
}
