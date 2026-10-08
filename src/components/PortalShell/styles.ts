import { css } from "@/styles";

export const portalStyles = css({
  "&": {
    minHeight: "100vh",
    background: "var(--colors-backgroundPage)",
    color: "var(--colors-text)",
    fontFamily: "var(--fonts-sans)",
    fontSize: "var(--fontSizes-sm)",
  },
  ".main": {
    maxWidth: "1280px",
    margin: "auto",
    padding: "30px 24px 55px",
  },
  ".heading": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "22px",
  },
  ".heading h1": {
    fontSize: "var(--fontSizes-size23)",
    margin: "0 0 6px",
  },
  ".heading p": {
    fontSize: "var(--fontSizes-xs)",
    color: "var(--colors-textMuted)",
    margin: "0",
  },
  ".card": {
    background: "var(--colors-background)",
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-lg)",
    overflow: "hidden",
  },
  ".row": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
  },
  ".row h2": {
    margin: "0",
  },
  ".outline,\n.primary": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-control)",
    padding: "8px 12px",
    background: "var(--colors-background)",
    fontFamily: "var(--fonts-sans)",
    fontSize: "var(--fontSizes-size11)",
    fontWeight: 600,
    color: "var(--colors-textSecondary)",
    whiteSpace: "nowrap",
  },
  ".primary": {
    background: "var(--colors-primaryLight)",
    borderColor: "var(--colors-primaryLight)",
    color: "var(--colors-background)",
  },
  ".primary:hover": {
    background: "var(--colors-primaryHover)",
  },
  ".outline:hover": {
    background: "var(--colors-backgroundSecondary)",
  },
  ".filters": {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "14px",
    background: "var(--colors-background)",
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-lg)",
    padding: "20px",
    margin: "0 -24px 22px",
  },
  "& label": {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    fontSize: "var(--fontSizes-size11)",
    color: "var(--colors-textSecondary)",
  },
  ".petGrid": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "18px",
  },
  ".petGrid > .card": {
    transition: "border-color 0.15s",
  },
  ".petGrid > .card:hover": {
    borderColor: "var(--colors-primaryLight)",
  },
  ".petPhoto": {
    height: "170px",
    background: "var(--colors-background)",
  },
  ".petBody": {
    padding: "14px",
  },
  ".petBody h2": {
    fontSize: "var(--fontSizes-md)",
  },
  ".petBody p": {
    fontSize: "var(--fontSizes-size11)",
    margin: "7px 0 0",
  },
  ".muted": {
    color: "var(--colors-textMuted)",
    fontSize: "var(--fontSizes-size11)",
    lineHeight: "1.5",
  },
  ".petOrg": {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    borderTop: "1px solid var(--colors-border)",
    color: "var(--colors-textMuted)",
    fontSize: "var(--fontSizes-size11)",
    marginTop: "10px",
    paddingTop: "10px",
  },
  ".badge": {
    display: "inline-flex",
    borderRadius: "var(--radii-sm)",
    padding: "4px 7px",
    fontSize: "var(--fontSizes-size10)",
    whiteSpace: "nowrap",
  },
  ".green": {
    background: "var(--colors-positiveBackground)",
    color: "var(--colors-available)",
  },
  ".amber": {
    background: "var(--colors-inTreatmentBackground)",
    color: "var(--colors-inTreatment)",
  },
  ".mint": {
    background: "var(--colors-adoptedBackground)",
    color: "var(--colors-primaryHover)",
  },
  ".pagination": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginTop: "24px",
    borderTop: "1px solid var(--colors-border)",
    paddingTop: "16px",
    fontSize: "var(--fontSizes-size11)",
    color: "var(--colors-textMuted)",
  },
  ".pagination > div": {
    display: "flex",
    gap: "7px",
  },
  ".pagination button": {
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-input)",
    background: "var(--colors-background)",
    padding: "8px 12px",
    font: "inherit",
    color: "var(--colors-textSecondary)",
  },
  '.pagination button[aria-current="page"]': {
    background: "var(--colors-adoptedBackground)",
    borderColor: "var(--colors-adoptedBackground)",
    color: "var(--colors-primaryHover)",
  },
  "& button:disabled": {
    opacity: "0.45",
    cursor: "default",
  },
  ".empty": {
    textAlign: "center",
    padding: "50px",
    color: "var(--colors-textMuted)",
  },
  ".animalLayout": {
    display: "grid",
    gridTemplateColumns: "340px minmax(0, 1fr)",
    gap: "20px",
  },
  ".largePhoto": {
    height: "300px",
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-lg)",
  },
  ".thumbnails": {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
    margin: "12px 0",
  },
  ".thumbnails button": {
    height: "56px",
    border: "1px solid var(--colors-border)",
    background: "transparent",
    borderRadius: "var(--radii-input)",
  },
  ".thumbnails .selectedPhoto": {
    borderColor: "var(--colors-primaryLight)",
  },
  ".orgPanel": {
    padding: "16px",
  },
  ".orgPanel h3": {
    fontSize: "var(--fontSizes-size10)",
    color: "var(--colors-textMuted)",
    margin: "0 0 12px",
  },
  ".orgPanel p": {
    fontSize: "var(--fontSizes-size11)",
    color: "var(--colors-textMuted)",
    lineHeight: "1.5",
  },
  ".orgIdentity": {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    borderBottom: "1px solid var(--colors-border)",
    paddingBottom: "10px",
  },
  ".orgIdentity > span": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--colors-adoptedBackground)",
    color: "var(--colors-primaryLight)",
    borderRadius: "var(--radii-circle)",
    width: "34px",
    height: "34px",
  },
  ".orgIdentity strong": {
    fontSize: "var(--fontSizes-xs)",
  },
  ".orgIdentity p": {
    margin: "3px 0 0",
  },
  ".detail": {
    padding: "22px",
  },
  ".titleBadge": {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  ".titleBadge h1": {
    fontSize: "var(--fontSizes-size27)",
    margin: "0",
  },
  ".detail p": {
    fontSize: "var(--fontSizes-xs)",
    color: "var(--colors-textSecondary)",
    lineHeight: "1.7",
    margin: "8px 0",
  },
  ".actions": {
    display: "flex",
    gap: "8px",
  },
  ".facts": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    margin: "20px 0",
  },
  ".facts > div": {
    padding: "12px",
    background: "var(--colors-backgroundPage)",
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-input)",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  ".facts small": {
    color: "var(--colors-textSubtle)",
    fontSize: "var(--fontSizes-size9)",
    letterSpacing: "0.5px",
  },
  ".facts strong": {
    fontSize: "var(--fontSizes-size13)",
  },
  ".tabs": {
    display: "flex",
    gap: "16px",
    borderBottom: "1px solid var(--colors-border)",
    marginBottom: "20px",
    overflow: "auto",
  },
  ".tabs button": {
    font: "inherit",
    fontSize: "var(--fontSizes-size11)",
    border: "0",
    borderBottom: "2px solid transparent",
    padding: "12px 0",
    background: "none",
    color: "var(--colors-textMuted)",
    whiteSpace: "nowrap",
  },
  '.tabs button[aria-selected="true"]': {
    color: "var(--colors-primaryLight)",
    borderColor: "var(--colors-primaryLight)",
    fontWeight: "600",
  },
  ".detail h3": {
    fontSize: "var(--fontSizes-xs)",
    margin: "18px 0 8px",
  },
  ".chips": {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  ".chips span": {
    fontSize: "var(--fontSizes-size10)",
    borderRadius: "var(--radii-pill)",
    background: "var(--colors-adoptedBackground)",
    color: "var(--colors-primaryHover)",
    padding: "5px 10px",
    fontWeight: "600",
  },
  ".table": {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "var(--fontSizes-size10)",
    textAlign: "left",
    border: "1px solid var(--colors-border)",
  },
  ".table th": {
    fontWeight: "500",
    color: "var(--colors-textMuted)",
    background: "var(--colors-backgroundPage)",
  },
  ".table th,\n.table td": {
    padding: "10px",
    borderBottom: "1px solid var(--colors-border)",
    lineHeight: "1.5",
  },
  ".table td": {
    color: "var(--colors-textSecondary)",
  },
  ".table td strong": {
    color: "var(--colors-primaryHover)",
  },
  ".progress": {
    padding: "18px 22px",
    marginBottom: "22px",
    fontSize: "var(--fontSizes-size11)",
  },
  ".progress strong": {
    color: "var(--colors-primaryHover)",
    fontSize: "var(--fontSizes-size10)",
  },
  ".progress ol": {
    display: "flex",
    listStyle: "none",
    padding: "0",
    margin: "18px 0 0",
    gap: "18px",
  },
  ".progress li": {
    flex: "1",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "var(--colors-textSubtle)",
    fontSize: "var(--fontSizes-size10)",
  },
  ".progress li:not(:last-child):after": {
    content: '""',
    height: "1px",
    flex: "1",
    background: "var(--colors-borderStrong)",
    marginLeft: "4px",
  },
  ".progress li.currentStep": {
    color: "var(--colors-primaryHover)",
  },
  ".progress li.currentStep:after": {
    background: "var(--colors-primaryLight)",
  },
  ".progress li > span": {
    width: "17px",
    height: "17px",
    border: "1px solid var(--colors-borderStrong)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--radii-circle)",
    fontSize: "var(--fontSizes-size9)",
  },
  ".progress .currentStep > span": {
    background: "var(--colors-primaryLight)",
    color: "var(--colors-background)",
    borderColor: "var(--colors-primaryLight)",
  },
  ".adoptionLayout": {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    gap: "22px",
    maxWidth: "1040px",
    margin: "auto",
    alignItems: "start",
  },
  ".adoptionPet": {
    padding: "16px",
  },
  ".summaryPhoto": {
    height: "155px",
  },
  ".adoptionPet h2": {
    fontSize: "var(--fontSizes-md)",
    margin: "0 0 7px",
  },
  ".adoptionPet p": {
    color: "var(--colors-primaryHover)",
    fontSize: "var(--fontSizes-size10)",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  ".adoptionPet hr": {
    border: "0",
    borderTop: "1px solid var(--colors-border)",
    margin: "14px 0",
  },
  ".adoptionPet small": {
    fontSize: "var(--fontSizes-size10)",
    color: "var(--colors-textSubtle)",
    lineHeight: "1.5",
  },
  ".formPanel": {
    padding: "22px",
  },
  ".formPanel h2,\n.faq h2,\n.ticketPanel h2": {
    fontSize: "var(--fontSizes-size15)",
    margin: "0 0 8px",
  },
  ".formPanel form > h2": {
    borderBottom: "1px solid var(--colors-border)",
    paddingBottom: "14px",
    marginBottom: "18px",
  },
  ".formGrid": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  ".formPanel label": {
    marginBottom: "14px",
  },
  ".visitRow": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    background: "var(--colors-backgroundPage)",
    padding: "12px",
    borderRadius: "var(--radii-input)",
    fontSize: "var(--fontSizes-size11)",
  },
  ".switch": {
    width: "34px",
    height: "18px",
    padding: "2px",
    background: "var(--colors-border)",
    border: "0",
    borderRadius: "var(--radii-pill)",
    flexShrink: "0",
  },
  ".switch > span": {
    display: "block",
    width: "14px",
    height: "14px",
    background: "var(--colors-background)",
    borderRadius: "var(--radii-circle)",
    transition: "transform 0.15s",
  },
  ".switchOn": {
    background: "var(--colors-primaryLight)",
  },
  ".switchOn > span": {
    transform: "translateX(16px)",
  },
  ".formActions": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    borderTop: "1px solid var(--colors-border)",
    paddingTop: "16px",
    marginTop: "18px",
  },
  ".formActions small": {
    maxWidth: "280px",
    fontSize: "var(--fontSizes-size10)",
  },
  ".term": {
    padding: "14px",
    background: "var(--colors-backgroundPage)",
    borderRadius: "var(--radii-input)",
    fontSize: "var(--fontSizes-size13)",
    lineHeight: "1.7",
    marginBottom: "16px",
  },
  "& label.checkbox": {
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
  },
  ".checkbox input": {
    width: "16px",
  },
  ".notice": {
    padding: "10px",
    borderRadius: "var(--radii-input)",
    background: "var(--colors-positiveSoft)",
    color: "var(--colors-primaryHover)",
    fontSize: "var(--fontSizes-xs)",
    lineHeight: "1.5",
  },
  ".error": {
    color: "var(--colors-negativeStrong)",
    fontSize: "var(--fontSizes-xs)",
  },
  ".supportLayout": {
    display: "grid",
    gridTemplateColumns: "2.1fr 1fr",
    gap: "20px",
    alignItems: "start",
  },
  ".typeOptions": {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "7px",
    margin: "0 0 16px",
  },
  ".typeOptions button": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    border: "1px solid var(--colors-border)",
    borderRadius: "var(--radii-input)",
    background: "var(--colors-background)",
    color: "var(--colors-textMuted)",
    padding: "12px",
    fontSize: "var(--fontSizes-size10)",
  },
  ".typeOptions .selectedType": {
    borderColor: "var(--colors-primaryLight)",
    background: "var(--colors-backgroundMint)",
    color: "var(--colors-primaryHover)",
  },
  ".faq": {
    padding: "20px",
  },
  ".faq details": {
    borderBottom: "1px solid var(--colors-border)",
    padding: "14px 0",
    fontSize: "var(--fontSizes-size11)",
  },
  ".faq summary": {
    cursor: "pointer",
    fontWeight: "600",
    color: "var(--colors-textSecondary)",
    lineHeight: "1.5",
  },
  ".faq details p": {
    fontSize: "var(--fontSizes-size11)",
    color: "var(--colors-textMuted)",
    lineHeight: "1.6",
    marginBottom: "0",
  },
  ".help": {
    padding: "18px",
    background: "var(--colors-backgroundMint)",
    border: "1px solid var(--colors-primaryBorder)",
    borderRadius: "var(--radii-panel)",
    marginTop: "16px",
  },
  ".help h2": {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "var(--fontSizes-xs)",
    color: "var(--colors-primaryHover)",
    margin: "0",
  },
  ".help p": {
    fontSize: "var(--fontSizes-size11)",
    color: "var(--colors-textMuted)",
    lineHeight: "1.6",
  },
  ".ticketPanel": {
    padding: "20px",
    marginTop: "22px",
  },
  ".ticketPanel .row": {
    marginBottom: "14px",
  },
  ".ticketPanel select": {
    width: "auto",
  },
  ".ticketPanel p": {
    margin: "5px 0 0",
  },
  ".textButton": {
    border: "0",
    background: "transparent",
    color: "var(--colors-primaryHover)",
    fontSize: "var(--fontSizes-size11)",
    whiteSpace: "nowrap",
  },
  ".tableScroll": {
    overflowX: "auto",
  },
  ".modalBackdrop": {
    position: "fixed",
    inset: "0",
    background: "var(--colors-overlay)",
    zIndex: "30",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  ".modal": {
    position: "relative",
    width: "calc(100% - 32px)",
    maxWidth: "480px",
    background: "var(--colors-background)",
    borderRadius: "var(--radii-lg)",
    padding: "28px",
    lineHeight: "1.6",
    border: "1px solid var(--colors-border)",
  },
  ".close": {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "0",
    background: "transparent",
    color: "var(--colors-textMuted)",
  },
  "& button:focus-visible,\n& a:focus-visible,\n& summary:focus-visible":
    {
      outline: "3px solid var(--colors-focus)",
      outlineOffset: "3px",
    },
  "@media (max-width: 1000px)": {
    ".filters": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    ".animalLayout": {
      gridTemplateColumns: "260px minmax(0, 1fr)",
    },
    ".detail > .row": {
      alignItems: "flex-start",
      flexDirection: "column",
    },
    ".tabs": {
      gap: "12px",
    },
    ".supportLayout": {
      gridTemplateColumns: "1.7fr 1fr",
    },
    ".typeOptions button": {
      padding: "10px 4px",
    },
  },
  "@media (max-width: 767px)": {
    ".main": {
      padding: "24px 16px 40px",
    },
    ".heading h1": {
      fontSize: "var(--fontSizes-size21)",
    },
    ".heading": {
      alignItems: "flex-start",
    },
    ".heading > .outline": {
      display: "none",
    },
    ".filters": {
      margin: "0 0 18px",
      padding: "14px",
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    ".petGrid": {
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "12px",
    },
    ".petPhoto": {
      height: "140px",
    },
    ".animalLayout,\n  .supportLayout,\n  .adoptionLayout": {
      gridTemplateColumns: "1fr",
    },
    ".animalLayout > aside": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    },
    ".largePhoto": {
      height: "220px",
    },
    ".thumbnails": {
      gridColumn: "1",
      margin: "0",
    },
    ".orgPanel": {
      gridColumn: "2",
      gridRow: "1/3",
    },
    ".detail": {
      padding: "18px",
    },
    ".adoptionPet": {
      display: "none",
    },
    ".progress ol": {
      gap: "8px",
    },
    ".progress li": {
      fontSize: "var(--fontSizes-size9)",
    },
    ".progress li:not(:last-child):after": {
      display: "none",
    },
    ".formPanel": {
      padding: "18px",
    },
    ".pagination": {
      flexWrap: "wrap",
    },
    ".table": {
      minWidth: "520px",
    },
    ".detail .table": {
      minWidth: "0",
    },
    ".ticketPanel": {
      padding: "16px",
    },
    ".ticketPanel > .row": {
      alignItems: "flex-start",
    },
    ".ticketPanel select": {
      maxWidth: "140px",
    },
    ".heading p": {
      lineHeight: "1.6",
    },
    ".progress .row": {
      fontSize: "var(--fontSizes-size10)",
    },
  },
  "@media (max-width: 440px)": {
    ".petGrid": {
      gridTemplateColumns: "1fr",
    },
    ".petPhoto": {
      height: "170px",
    },
    ".formGrid": {
      gridTemplateColumns: "1fr",
      gap: "0",
    },
    ".animalLayout > aside": {
      display: "block",
    },
    ".thumbnails": {
      margin: "12px 0",
    },
    ".facts": {
      gap: "6px",
    },
    ".facts > div": {
      padding: "9px",
    },
    ".facts strong": {
      fontSize: "var(--fontSizes-size11)",
    },
    ".actions": {
      flexWrap: "wrap",
    },
    ".progress": {
      padding: "14px",
    },
    ".progress li": {
      alignItems: "flex-start",
    },
    ".formActions": {
      alignItems: "flex-start",
    },
    ".row": {
      gap: "8px",
    },
    ".petBody .row": {
      flexWrap: "wrap",
    },
  },
  ".modal::backdrop": {
    background: "var(--colors-overlay)",
  },
});

const styles = {
  page: "page",
  main: "main",
  heading: "heading",
  card: "card",
  row: "row",
  outline: "outline",
  primary: "primary",
  filters: "filters",
  petGrid: "petGrid",
  petPhoto: "petPhoto",
  petBody: "petBody",
  muted: "muted",
  petOrg: "petOrg",
  badge: "badge",
  green: "green",
  amber: "amber",
  mint: "mint",
  pagination: "pagination",
  empty: "empty",
  animalLayout: "animalLayout",
  largePhoto: "largePhoto",
  thumbnails: "thumbnails",
  selectedPhoto: "selectedPhoto",
  orgPanel: "orgPanel",
  orgIdentity: "orgIdentity",
  detail: "detail",
  titleBadge: "titleBadge",
  actions: "actions",
  facts: "facts",
  tabs: "tabs",
  chips: "chips",
  table: "table",
  progress: "progress",
  currentStep: "currentStep",
  adoptionLayout: "adoptionLayout",
  adoptionPet: "adoptionPet",
  summaryPhoto: "summaryPhoto",
  formPanel: "formPanel",
  faq: "faq",
  ticketPanel: "ticketPanel",
  formGrid: "formGrid",
  visitRow: "visitRow",
  switch: "switch",
  switchOn: "switchOn",
  formActions: "formActions",
  term: "term",
  checkbox: "checkbox",
  notice: "notice",
  error: "error",
  supportLayout: "supportLayout",
  typeOptions: "typeOptions",
  selectedType: "selectedType",
  help: "help",
  textButton: "textButton",
  tableScroll: "tableScroll",
  modalBackdrop: "modalBackdrop",
  modal: "modal",
  close: "close",
} as const;
export default styles;
