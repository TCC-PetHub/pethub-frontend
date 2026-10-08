# Input

Campo de entrada reutilizável, com suporte a atributos nativos e `ref`.

## Props próprias

- `error`: mostra a mensagem e associa o campo ao erro via ARIA.
- `variant`: `default` ou `compact`.
- `icon`: conteúdo opcional exibido dentro do campo.

Quando `type="password"`, o componente adiciona um controle para revelar ou ocultar a senha. Use `id` e um `<label htmlFor>` correspondente.

## Arquivos

Use o mesmo componente com `type="file"`. `FileInputProps` descreve os atributos dessa opção; o arquivo permanece no input nativo para `FormData` e bibliotecas de formulário. O componente preserva `ref` e `onChange`.

```tsx
import Input, { type FileInputProps } from "@/components/common/Input";

const attachment: FileInputProps = {
  type: "file",
  name: "attachment",
  accept: ".png,.jpg,.jpeg,.pdf",
  multiple: true,
  fileLabel: "Adicionar arquivos",
  fileHint: "PNG, JPG ou PDF",
};

<Input {...attachment} error={error} disabled={sending} />
```

Os nomes selecionados aparecem no campo e são limpos quando o formulário é resetado. `accept` orienta o seletor; validações de tamanho e conteúdo permanecem no fluxo e no servidor. Não passe `value` ou `defaultValue` ao tipo de arquivo.

Erros e dicas são associados ao campo por ARIA. Quando `id` não é informado, o componente gera um identificador estável. Os estilos usam os tokens de `globals.css`.
