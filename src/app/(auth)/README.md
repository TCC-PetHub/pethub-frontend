# Organização da área auth

As rotas mantêm page.tsx, styles.ts e page.md seguindo o padrão do login. O grupo (auth) organiza os arquivos sem alterar as URLs.

- Os componentes compartilhados ficam em `src/components/{atoms,molecules,organisms,templates}`, fora dos grupos de rotas.
- Os `page.tsx` compõem as telas de catálogo, suporte, perfil e solicitações. Organismos representam blocos, como TopBar, detalhes do animal e o formulário de adoção.
- PortalShell contém apenas a estrutura visual e o cabeçalho, sem dados do usuário.
- Dados de demonstração e lógica de armazenamento ficam em `src/features/user` e `src/features/animals`.

Os organismos têm index.tsx; o cabeçalho e o template mantêm os estilos em styles.ts. Estilos específicos de rota ficam junto da página. Os arquivos styles.ts usam Stitches, como login/styles.ts.

Input, Select e Textarea são os controles compartilhados. Os estilos da página organizam os campos, sem sobrescrever bordas, cores ou espaçamento interno dos controles. Checkboxes e campos ocultos preservam seus elementos nativos.
