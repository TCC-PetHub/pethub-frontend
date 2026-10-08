# Portal Público (`/public-portal`)

Página pública de descoberta do PetHub, construída com conteúdo de demonstração.

## Seções e interações

- `TopBar` alterna entre visitante e usuário autenticado pelo controle de desenvolvimento no canto inferior.
- A busca e os filtros enviam os critérios para `/animais` como parâmetros de URL.
- Campanhas, animais e parceiros vêm de `@/mocks/pethub`.
- Ações de campanha abrem `/doacoes/{id}`; links de animais, campanhas e rodapé apontam para outras rotas da aplicação.

Os componentes visuais e responsivos estão em `styles.ts`. Os dados são mockados; integrações reais não fazem parte desta página ainda.
