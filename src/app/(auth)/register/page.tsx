"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/common/Button";
import { AuthTab, AuthTabs } from "@/components/common/AuthTabs";
import Input from "@/components/common/Input";
import { toast } from "@/components/common/Toast";

import {
  Brand,
  BrandLogo,
  BrandText,
  Card,
  Consent,
  Container,
  ErrorMessage,
  Field,
  Form,
  Hint,
  Label,
  Row,
  TypeOption,
  TypeToggle,
} from "./styles";

const signUpSchema = z
  .object({
    userType: z.enum(["adopter", "ngo"]),
    name: z.string().min(1, "Campo obrigatório"),
    cnpj: z.string().optional(),
    email: z.string().email("E-mail inválido"),
    phone: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    acceptedTerms: z.boolean().refine((value) => value, {
      message: "Aceite a Política de Privacidade para continuar",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.userType !== "ngo") return;

    const rules = [
      {
        path: "cnpj",
        ok: (data.cnpj ?? "").replace(/\D/g, "").length === 14,
        message: "CNPJ inválido",
      },
      {
        path: "phone",
        ok: (data.phone ?? "").length >= 10,
        message: "Telefone inválido",
      },
      { path: "city", ok: !!data.city?.trim(), message: "Informe a cidade" },
      { path: "state", ok: data.state?.length === 2, message: "UF inválida" },
    ];

    rules.forEach(({ path, ok, message }) => {
      if (!ok) ctx.addIssue({ code: "custom", path: [path], message });
    });
  });

type SignUpData = z.infer<typeof signUpSchema>;

function SignUpContent() {
  const searchParams = useSearchParams();
  const requestedProfile = searchParams.get("perfil");
  const defaultUserType = requestedProfile === "organization" ? "ngo" : "adopter";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { userType: defaultUserType, acceptedTerms: true },
  });

  const selectedUserType = useWatch({ control, name: "userType" });
  const isNgo = selectedUserType === "ngo";

  async function onSubmit(data: SignUpData) {
    try {
      // TODO: chamada real da API
      console.log(data);
      toast.success("Conta criada com sucesso");
    } catch {
      toast.error("Não foi possível criar a conta");
    }
  }

  return (
    <Container>
      <Card>
        <Brand>
          <BrandLogo aria-hidden="true">
            <HeartHandshake size={24} />
          </BrandLogo>
          <BrandText>
            <strong>PetHub</strong>
            <span>Proteção animal</span>
          </BrandText>
        </Brand>

        <AuthTabs aria-label="Acesso">
          <AuthTab href={`/login?perfil=${isNgo ? "organization" : "adopter"}`}>
            Entrar
          </AuthTab>
          <AuthTab as="span" active aria-current="page">
            Criar conta
          </AuthTab>
        </AuthTabs>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field>
            <Label as="span">Você é:</Label>
            <TypeToggle>
              <TypeOption
                type="button"
                active={!isNgo}
                onClick={() => setValue("userType", "adopter")}
              >
                Adotante / Cidadão
              </TypeOption>
              <TypeOption
                type="button"
                active={isNgo}
                onClick={() => setValue("userType", "ngo")}
              >
                ONG / Protetor
              </TypeOption>
            </TypeToggle>
          </Field>

          <Field>
            <Label htmlFor="name">
              {isNgo ? "Nome da organização" : "Nome completo"}
            </Label>
            <Input
              variant="compact"
              id="name"
              placeholder={isNgo ? "Ex. Anjos de Quatro Patas" : "Seu nome"}
              error={errors.name?.message}
              {...register("name")}
            />
          </Field>

          {isNgo && (
            <Field>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                variant="compact"
                id="cnpj"
                placeholder="00.000.000/0000-00"
                error={errors.cnpj?.message}
                {...register("cnpj")}
              />
              <Hint>Apenas para organizações regulamentadas</Hint>
            </Field>
          )}

          <Field>
            <Label htmlFor="email">
              {isNgo ? "E-mail institucional" : "E-mail"}
            </Label>
            <Input
              variant="compact"
              id="email"
              type="email"
              placeholder={isNgo ? "contato@suaong.org" : "voce@email.com"}
              error={errors.email?.message}
              {...register("email")}
            />
          </Field>

          {isNgo && (
            <>
              <Field>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  variant="compact"
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </Field>

              <Row>
                <Field>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    variant="compact"
                    id="city"
                    placeholder="Ex. São Paulo"
                    error={errors.city?.message}
                    {...register("city")}
                  />
                </Field>

                <Field>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    variant="compact"
                    id="state"
                    maxLength={2}
                    placeholder="SP"
                    error={errors.state?.message}
                    {...register("state")}
                  />
                </Field>
              </Row>
            </>
          )}

          <Field>
            <Label htmlFor="password">Senha</Label>
            <Input
              variant="compact"
              id="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              error={errors.password?.message}
              {...register("password")}
            />
          </Field>

          <Field>
            <Consent htmlFor="acceptedTerms">
              <input
                id="acceptedTerms"
                type="checkbox"
                {...register("acceptedTerms")}
              />
              <span>
                Autorizo o tratamento dos meus dados pessoais conforme a{" "}
                <Link href="/privacidade">Política de Privacidade (LGPD)</Link>,
                podendo revogar este consentimento a qualquer momento.
              </span>
            </Consent>
            {errors.acceptedTerms && (
              <ErrorMessage>{errors.acceptedTerms.message}</ErrorMessage>
            )}
          </Field>

          <Button
            variant="primary"
            type="submit"
            isLoading={isSubmitting}
            loadingLabel="Criando conta..."
          >
            Criar conta
            <ArrowRight size={16} />
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <SignUpContent />
    </Suspense>
  );
}
