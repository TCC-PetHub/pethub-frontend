# Componentes compartilhados

- `atoms`: Button, Input (texto, senha e arquivo), Select, Textarea, Logo e Toast.
- `molecules`: Brand, AuthTabs, UserCard e NavigationLinks.
- `organisms`: TopBar, AnimalProfile (conteúdo do animal) e AdoptionForm (fluxo do formulário).
- `templates`: PortalShell (cabeçalho e área principal).

As páginas compõem esses blocos nas rotas em `src/app`. Um organismo não inclui o cabeçalho da aplicação nem representa sozinho uma rota completa. O estado e os dados do domínio ficam em `src/features`. Estilos básicos dos campos pertencem aos átomos; estilos de layout pertencem ao template ou à página.
