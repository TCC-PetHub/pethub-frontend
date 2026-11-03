"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { passwordHelp, validatePassword } from "@/schemas/password";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Logo from "@/components/common/Logo";
import { createRecoveryClient, recoveryTokens } from "@/lib/auth/recovery-client";
import { BackLink, Brand, Card, Container, Description, Field, Form, Label } from "../forgot-password/styles";

type Values = { password: string; confirmation: string };
export default function ResetPasswordPage() {
  const client = useRef<ReturnType<typeof createRecoveryClient> | null>(null);
  const started = useRef(false);
  const [state, setState] = useState<"checking" | "ready" | "invalid" | "done">("checking");
  const [message, setMessage] = useState("");
  const { register, handleSubmit, getValues, reset, formState: { errors, isSubmitting } } = useForm<Values>();

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const tokens = recoveryTokens(window.location.hash);
    // Remove sensitive tokens before any navigation or user interaction.
    window.history.replaceState(null, "", window.location.pathname);
    void (async () => {
      await Promise.resolve();
      if (!tokens) { setState("invalid"); return; }
      try {
        const supabase = createRecoveryClient();
        const { error } = await supabase.auth.setSession(tokens);
        if (error) { setState("invalid"); return; }
        client.current = supabase;
        setState("ready");
      } catch { setState("invalid"); }
    })();
  }, []);

  async function submit(values: Values) {
    setMessage("");
    try {
      if (!client.current) { setState("invalid"); return; }
      const { error } = await client.current.auth.updateUser({ password: values.password });
      if (error) {
        setMessage(error.code === "same_password" ? "Escolha uma senha diferente da anterior." : error.code === "weak_password" ? "A senha não atende aos requisitos de segurança. Escolha uma senha mais forte." : "Não foi possível alterar a senha. Se o link expirou, solicite outro.");
        return;
      }
      const supabase = client.current;
      client.current = null;
      reset();
      setState("done");
      await supabase.auth.signOut({ scope: "local" });
    } catch { setMessage("Não foi possível alterar a senha. Tente novamente."); }
  }

  return <Container><Card>
    <Brand><Logo href="/" /></Brand>
    <h1>Redefinir senha</h1>
    {state === "checking" && <Description role="status">Validando o link...</Description>}
    {state === "invalid" && <><Description role="alert">Este link é inválido ou expirou. Solicite um novo link para continuar.</Description><BackLink href="/forgot-password">Solicitar outro link</BackLink></>}
    {state === "done" && <><Description role="status">Senha alterada com sucesso. Entre com sua nova senha.</Description><BackLink href="/login">Ir para o login</BackLink></>}
    {state === "ready" && <>
      <Description>Defina sua nova senha. {passwordHelp}</Description>
      <Form onSubmit={event => { void handleSubmit(submit)(event); }} noValidate>
        <Field><Label htmlFor="new-password">Nova senha</Label><Input id="new-password" type="password" autoComplete="new-password" error={errors.password?.message} {...register("password", {
          validate: validatePassword,
        })} /></Field>
        <Field><Label htmlFor="confirmation">Confirmar nova senha</Label><Input id="confirmation" type="password" autoComplete="new-password" error={errors.confirmation?.message} {...register("confirmation", { required: "Confirme a nova senha.", validate: value => value === getValues("password") || "As senhas precisam ser iguais." })} /></Field>
        {message && <p role="alert">{message}</p>}
        <Button type="submit" variant="tertiary" isLoading={isSubmitting} loadingLabel="Salvando...">Salvar nova senha</Button>
      </Form>
    </>}
  </Card></Container>;
}
