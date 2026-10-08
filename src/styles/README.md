# Tokens visuais

Os valores de cores, fontes, tamanhos de texto, espaçamentos do tema, raios e sombras são definidos em `src/app/globals.css`.

- `--pethub-*` contém os valores do design system.
- `--colors-*`, `--fonts-*`, `--fontSizes-*`, `--space-*`, `--radii-*` e `--shadows-*` são os aliases usados pelos componentes.
- `theme.ts` conecta os tokens ao Stitches, preservando referências como `$primary` e `$lg`, sem redefinir os valores.
- Os resets e estilos básicos ficam somente em `globals.css`.
- `StyleRegistry.tsx` inclui os estilos do Stitches e styled-jsx no HTML inicial.

Para alterar um valor compartilhado, edite seu token `--pethub-*` em `globals.css`. Medidas de layout específicas de cada componente permanecem nos arquivos `styles.ts`.
