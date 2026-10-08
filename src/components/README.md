# Componentes compartilhados

Cada componente possui sua própria pasta diretamente em `src/components`, como `Input`, `Button`, `TopBar`, `NavigationLinks` e `PortalShell`.

O arquivo principal é `index.tsx`. Estilos e documentação ficam na mesma pasta quando necessários. Exemplo de import: `import Input from "@/components/Input"`.

As páginas compõem os componentes nas rotas de `src/app`. O estado e os dados do domínio ficam em `src/features`. Os campos mantêm seus estilos compartilhados; a página organiza o layout.
