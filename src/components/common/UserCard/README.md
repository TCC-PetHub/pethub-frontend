# UserCard

Exibe avatar, nome, papel opcional e indicador de conta.

## Props

- `name`: nome exibido.
- `role` e `avatarUrl`: informações opcionais.
- `variant`: `card` ou `compact`.
- `indicator`: `dot`, `chevron` ou `none`; o padrão depende da variante.
- `onClick`: quando fornecido, renderiza um botão; sem ele, renderiza um `div`.

Os demais atributos HTML compatíveis são encaminhados ao elemento raiz.
