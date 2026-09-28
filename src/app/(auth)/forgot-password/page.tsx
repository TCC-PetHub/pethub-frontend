"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, PawPrint } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { toast } from "@/components/common/Toast";

import {
  BackLink,
  Brand,
  BrandLogo,
  BrandText,
  Card,
  Container,
  Description,
  Field,
  Form,
  Label,
  resetGlobal,
} from "./style";

resetGlobal();

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail válido."),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function RecuperarSenhaPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: ForgotPasswordData) {
    try {
      // TODO: trocar pela chamada real da sua API
      // await api.post("/auth/forgot-password", data);
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success(
        `Enviamos o link de redefinição para ${data.email}. Verifique sua caixa de entrada.`,
      );
      reset();
    } catch {
      toast.error("Não foi possível enviar o link. Tente novamente.");
    }
  }

  return (
    <Container>
      <Card>
        <Brand>
          <BrandLogo>
            <PawPrint size={22} aria-hidden />
          </BrandLogo>
          <BrandText>
            <strong>PetHub</strong>
            <span>Proteção Animal</span>
          </BrandText>
        </Brand>

        <Description>
          Informe seu e-mail cadastrado para receber o link de redefinição de
          senha.
        </Description>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="voce@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </Field>

          <Button
            type="submit"
            variant="tertiary"
            isLoading={isSubmitting}
            loadingLabel="Enviando..."
          >
            Enviar link de recuperação
          </Button>
        </Form>

        <BackLink href="/login">
          <ArrowLeft size={14} aria-hidden />
          Voltar para o login
        </BackLink>
      </Card>
    </Container>
  );
}