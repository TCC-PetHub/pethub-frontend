# AuthTabs

Navegação compartilhada entre as telas de autenticação.

## Exportações

- `AuthTabs`: contêiner semântico `<nav>` com duas colunas.
- `AuthTab`: link estilizado para cada opção. A variante `active` marca a página atual; `as="span"` pode ser usada para a aba atual, que não deve navegar.

## Uso

Login e cadastro usam estes componentes para manter cores, espaçamento e estados consistentes. Passe `aria-label` ao contêiner e `href` às abas navegáveis.

## Estilos

Os tokens de cor, espaço e raio vêm de `@/styles`.