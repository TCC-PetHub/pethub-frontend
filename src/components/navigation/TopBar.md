# TopBar

Barra de navegação responsiva para visitantes e usuários autenticados.

## Props

- `variant`: `public` (padrão) ou `authenticated`.
- `user`: nome, papel e avatar da conta.
- `navItems`: rótulo, destino e opção de correspondência exata para cada link.
- `onLogout`: callback executado ao escolher sair.

No modo autenticado, oferece navegação principal, menu móvel e menu da conta. No modo público, mostra ações para entrar e entrar como organizador. Os dados padrão de navegação são definidos no próprio componente.