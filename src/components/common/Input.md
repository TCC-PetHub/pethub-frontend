# Input

Campo de entrada reutilizável, com suporte a atributos nativos e `ref`.

## Props próprias

- `error`: mostra a mensagem e associa o campo ao erro via ARIA.
- `variant`: `default` ou `compact`.
- `icon`: conteúdo opcional exibido dentro do campo.

Quando `type="password"`, o componente adiciona um controle para revelar ou ocultar a senha. Use `id` e um `<label htmlFor>` correspondente.