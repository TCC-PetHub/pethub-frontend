import { css } from "@/styles";

export const userStyles = css({
  "&": {
    minHeight: "100vh",
    background: "var(--colors-backgroundPage)",
    color: "var(--colors-text)",
    fontFamily: "var(--fonts-sans)",
  },
  ".main": {
    maxWidth: "1120px",
    margin: "auto",
    padding: "40px 32px 80px",
  },
  ".card": {
    background: "var(--colors-background)",
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-lg)",
    boxShadow: "var(--shadows-card)",
  },
  ".profile": {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    padding: "32px 24px",
    marginBottom: "24px",
    minHeight: "124px",
  },
  ".avatarSpace": {
    width: "68px",
    flexShrink: "0",
  },
  ".identity": {
    flex: "1",
    minWidth: "0",
  },
  ".nameRow": {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  ".nameRow h1": {
    fontSize: "var(--fontSizes-size22)",
    margin: "0",
  },
  ".verified": {
    background: "var(--colors-adoptedBackground)",
    color: "var(--colors-primary)",
    borderRadius: "var(--radii-control)",
    fontSize: "var(--fontSizes-size10)",
    fontWeight: "600",
    padding: "4px 7px",
  },
  ".contacts": {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
    color: "var(--colors-textMuted)",
    fontSize: "var(--fontSizes-size11)",
    marginTop: "10px",
  },
  ".contacts span": {
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },
  ".contacts svg": {
    width: "13px",
    height: "13px",
  },
  ".secondary,\n.primary": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    fontSize: "var(--fontSizes-size11)",
    fontWeight: "600",
    padding: "8px 12px",
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-control)",
    background: "var(--colors-background)",
    color: "var(--colors-textSecondary)",
    whiteSpace: "nowrap",
  },
  ".primary": {
    background: "var(--colors-primaryLight)",
    borderColor: "var(--colors-primaryLight)",
    color: "var(--colors-background)",
  },
  ".secondary:hover": {
    background: "var(--colors-backgroundSecondary)",
  },
  ".primary:hover": {
    background: "var(--colors-primaryHover)",
  },
  ".dashboard": {
    display: "grid",
    gridTemplateColumns: "2.15fr 1fr",
    gap: "20px",
  },
  ".leftColumn,\n.rightColumn": {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  ".stats": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  ".stat": {
    padding: "20px",
    minHeight: "116px",
  },
  ".statLabel": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "var(--colors-textMuted)",
    fontSize: "var(--fontSizes-size11)",
    fontWeight: "600",
  },
  ".statLabel svg": {
    color: "var(--colors-primaryLight)",
  },
  ".statValue": {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
    margin: "8px 0",
  },
  ".statValue strong": {
    fontSize: "var(--fontSizes-3xl)",
  },
  ".statValue span,\n.stat small": {
    fontSize: "var(--fontSizes-size10)",
    color: "var(--colors-textMuted)",
  },
  ".stat:hover": {
    borderColor: "var(--colors-primaryBorder)",
  },
  ".notifications": {
    padding: "22px 20px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
    justifyContent: "space-between",
  },
  ".notifications h2": {
    fontSize: "var(--fontSizes-xs)",
    margin: "0 0 5px",
  },
  ".notifications p": {
    fontSize: "var(--fontSizes-size11)",
    lineHeight: "1.5",
    color: "var(--colors-textMuted)",
    margin: "0",
    maxWidth: "460px",
  },
  ".switch": {
    border: "0",
    borderRadius: "var(--radii-pill)",
    background: "var(--colors-border)",
    width: "38px",
    height: "20px",
    padding: "2px",
    flexShrink: "0",
  },
  ".switch span": {
    display: "block",
    height: "16px",
    width: "16px",
    borderRadius: "var(--radii-circle)",
    background: "var(--colors-background)",
    boxShadow: "var(--shadows-switch)",
    transition: "transform 0.2s",
  },
  ".switchOn": {
    background: "var(--colors-primaryLight)",
  },
  ".switchOn span": {
    transform: "translateX(18px)",
  },
  ".panel": {
    padding: "22px 20px",
  },
  ".panel h2": {
    margin: "0 0 16px",
    paddingBottom: "14px",
    borderBottom: "1px solid var(--colors-border)",
    fontSize: "var(--fontSizes-sm)",
  },
  ".preference": {
    marginTop: "14px",
  },
  ".preference h3": {
    fontSize: "var(--fontSizes-size10)",
    color: "var(--colors-textMuted)",
    margin: "0 0 7px",
  },
  ".chips": {
    display: "flex",
    gap: "6px",
  },
  ".chips span": {
    background: "var(--colors-adoptedBackground)",
    color: "var(--colors-primary)",
    borderRadius: "var(--radii-pill)",
    padding: "5px 10px",
    fontSize: "var(--fontSizes-size10)",
    fontWeight: "600",
  },
  ".outlineChip": {
    display: "inline-block",
    border: "1px solid var(--colors-primaryLight)",
    borderRadius: "var(--radii-control)",
    padding: "5px 8px",
    fontSize: "var(--fontSizes-size11)",
    color: "var(--colors-primary)",
  },
  ".environment": {
    listStyle: "none",
    padding: "0",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    gap: "9px",
    color: "var(--colors-textMuted)",
    fontSize: "var(--fontSizes-size11)",
  },
  ".environment li": {
    display: "flex",
    gap: "7px",
    alignItems: "flex-start",
    lineHeight: "1.4",
  },
  ".environment svg": {
    width: "13px",
    height: "13px",
    color: "var(--colors-primaryLight)",
    flexShrink: "0",
  },
  ".heading": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "24px",
  },
  ".heading h1": {
    fontSize: "var(--fontSizes-xl)",
    margin: "0 0 6px",
  },
  ".heading p": {
    fontSize: "var(--fontSizes-size11)",
    color: "var(--colors-textMuted)",
    margin: "0",
  },
  ".filters": {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  ".filters button": {
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-control)",
    background: "var(--colors-background)",
    color: "var(--colors-textMuted)",
    fontSize: "var(--fontSizes-size11)",
    padding: "7px 12px",
  },
  ".filters .activeFilter": {
    background: "var(--colors-primaryLight)",
    color: "var(--colors-background)",
    borderColor: "var(--colors-primaryLight)",
  },
  ".applications": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
  },
  ".application": {
    display: "flex",
    gap: "20px",
    padding: "16px",
    minHeight: "154px",
  },
  ".petSpace": {
    width: "102px",
    flexShrink: "0",
  },
  ".applicationBody": {
    flex: "1",
    minWidth: "0",
  },
  ".applicationTop": {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "8px",
  },
  ".application h2": {
    fontSize: "var(--fontSizes-md)",
    margin: "0",
  },
  ".badge": {
    fontSize: "var(--fontSizes-size9)",
    fontWeight: "600",
    padding: "4px 6px",
    borderRadius: "var(--radii-sm)",
    whiteSpace: "nowrap",
  },
  ".analysis": {
    color: "var(--colors-inTreatment)",
    background: "var(--colors-inTreatmentBackground)",
  },
  ".completed": {
    color: "var(--colors-background)",
    background: "var(--colors-positiveDark)",
  },
  ".pending": {
    color: "var(--colors-pending)",
    background: "var(--colors-pendingBackground)",
  },
  ".approved": {
    color: "var(--colors-available)",
    background: "var(--colors-positiveBackground)",
  },
  ".description": {
    fontSize: "var(--fontSizes-size10)",
    color: "var(--colors-primary)",
    fontWeight: "600",
    margin: "8px 0",
  },
  ".organization": {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "var(--fontSizes-size10)",
    color: "var(--colors-textMuted)",
    margin: "0",
  },
  ".application footer": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    borderTop: "1px solid var(--colors-border)",
    marginTop: "30px",
    paddingTop: "10px",
  },
  ".application footer small": {
    fontSize: "var(--fontSizes-size9)",
    color: "var(--colors-textSubtle)",
  },
  ".application footer > div": {
    display: "flex",
    gap: "6px",
  },
  ".application footer button": {
    fontSize: "var(--fontSizes-size10)",
    padding: "6px 9px",
  },
  ".dialog": {
    width: "calc(100% - 32px)",
    maxWidth: "460px",
    padding: "32px",
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-lg)",
    color: "var(--colors-text)",
    boxShadow: "var(--shadows-dialog)",
  },
  ".dialog::backdrop": {
    background: "var(--colors-overlay)",
  },
  ".dialog h2": {
    fontSize: "var(--fontSizes-xl)",
    margin: "0 20px 20px 0",
  },
  ".dialog p": {
    fontSize: "var(--fontSizes-sm)",
    lineHeight: "1.6",
    color: "var(--colors-textSecondary)",
  },
  ".dialog label": {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
    fontSize: "var(--fontSizes-size13)",
  },
  ".close": {
    position: "absolute",
    right: "14px",
    top: "14px",
    background: "transparent",
    border: "0",
    color: "var(--colors-textMuted)",
  },
  "& button:focus-visible,\n& a:focus-visible,": {
    outline: "3px solid var(--colors-focus)",
    outlineOffset: "3px",
  },
  "@media (min-width: 1400px)": {
    ".main": {
      maxWidth: "1280px",
    },
    ".application": {
      minHeight: "175px",
    },
    ".application footer": {
      marginTop: "40px",
    },
  },
  "@media (max-width: 1000px)": {
    ".petSpace": {
      width: "65px",
    },
    ".applicationTop": {
      flexWrap: "wrap",
    },
    ".application footer": {
      flexWrap: "wrap",
    },
    ".profile": {
      gap: "16px",
    },
    ".avatarSpace": {
      width: "48px",
    },
  },
  "@media (max-width: 767px)": {
    ".main": {
      padding: "24px 16px 48px",
    },
    ".dashboard": {
      gridTemplateColumns: "1fr",
    },
    ".profile": {
      flexWrap: "wrap",
      padding: "24px 20px",
    },
    ".avatarSpace": {
      display: "none",
    },
    ".profile > .secondary": {
      marginLeft: "auto",
    },
    ".contacts": {
      gap: "10px",
    },
    ".heading": {
      alignItems: "flex-start",
      flexDirection: "column",
    },
    ".applications": {
      gridTemplateColumns: "1fr",
    },
    ".applicationTop": {
      flexWrap: "nowrap",
    },
    ".petSpace": {
      width: "80px",
    },
    ".application footer": {
      flexWrap: "nowrap",
    },
    ".panel": {
      padding: "20px",
    },
    ".nameRow h1": {
      fontSize: "var(--fontSizes-xl)",
    },
  },
  "@media (max-width: 420px)": {
    ".stats": {
      gap: "10px",
    },
    ".stat": {
      padding: "16px 12px",
    },
    ".statValue": {
      gap: "6px",
    },
    ".statValue span": {
      fontSize: "var(--fontSizes-size9)",
    },
    ".petSpace": {
      width: "32px",
    },
    ".application": {
      gap: "12px",
    },
    ".applicationTop": {
      flexWrap: "wrap",
    },
    ".application footer": {
      flexWrap: "wrap",
    },
    ".contacts": {
      flexDirection: "column",
    },
    ".notifications": {
      gap: "12px",
    },
  },
});

const styles = {
  page: "page",
  main: "main",
  card: "card",
  profile: "profile",
  avatarSpace: "avatarSpace",
  identity: "identity",
  nameRow: "nameRow",
  verified: "verified",
  contacts: "contacts",
  secondary: "secondary",
  primary: "primary",
  dashboard: "dashboard",
  leftColumn: "leftColumn",
  rightColumn: "rightColumn",
  stats: "stats",
  stat: "stat",
  statLabel: "statLabel",
  statValue: "statValue",
  notifications: "notifications",
  switch: "switch",
  switchOn: "switchOn",
  panel: "panel",
  preference: "preference",
  chips: "chips",
  outlineChip: "outlineChip",
  environment: "environment",
  heading: "heading",
  filters: "filters",
  activeFilter: "activeFilter",
  applications: "applications",
  application: "application",
  petSpace: "petSpace",
  applicationBody: "applicationBody",
  applicationTop: "applicationTop",
  badge: "badge",
  analysis: "analysis",
  completed: "completed",
  pending: "pending",
  approved: "approved",
  description: "description",
  organization: "organization",
  dialog: "dialog",
  close: "close",
} as const;
export default styles;
