"use client";

import { Suspense, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Globe } from "lucide-react";
import { z } from "zod";

import { AuthTab, AuthTabs } from "@/components/common/AuthTabs";
import Brand from "@/components/common/Brand";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Logo from "@/components/common/Logo";
import { toast } from "@/components/common/Toast";
import { homeByRole } from "@/config/navigation";
import { PUBLIC_HOME, useAuth } from "@/contexts/AuthContext";
import {
  loginSchema,
  profileLabels,
  profiles,
  type LoginField,
} from "@/schemas/auth";

import { authRoute } from "../routes";
import {
  Divider,
  ErrorAlert,
  Field,
  FieldLabel,
  Form,
  Main,
  Options,
  Panel,
  ProfileLegend,
  ProfileOption,
  ProfileOptions,
  ProfilePicker,
  RememberOption,
  StyledForgotLink,
} from "./styles";

type LoginFormErrors = Partial<Record<LoginField, string>>;

const loginFieldFocusOrder = ["email", "password"] as const;

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [loginFormErrors, setLoginFormErrors] = useState<LoginFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  const currentProfile =
    searchParams.get("perfil") === "organization" ? "organization" : "adopter";

  function handleInputChange(changeEvent: ChangeEvent<HTMLInputElement>) {
    const changedFieldName = changeEvent.target.name as LoginField;
    setLoginFormErrors((currentErrors) =>
      currentErrors[changedFieldName]
        ? { ...currentErrors, [changedFieldName]: undefined }
        : currentErrors,
    );
  }

  async function handleLoginSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    if (submitting) return;
    setLoginError("");

    const loginForm = submitEvent.currentTarget;
    const loginFormData = new FormData(loginForm);
    const validationResult = loginSchema.safeParse(
      Object.fromEntries(loginFormData),
    );

    if (!validationResult.success) {
      const schemaFieldErrors = z.flattenError(
        validationResult.error,
      ).fieldErrors;
      const validationErrors: LoginFormErrors = {
        profile: schemaFieldErrors.profile?.[0],
        email: schemaFieldErrors.email?.[0],
        password: schemaFieldErrors.password?.[0],
      };
      setLoginFormErrors(validationErrors);

      const firstInvalidField = loginFieldFocusOrder.find(
        (fieldName) => validationErrors[fieldName],
      );
      const invalidFormElement =
        firstInvalidField && loginForm.elements.namedItem(firstInvalidField);
      if (invalidFormElement instanceof HTMLElement) invalidFormElement.focus();
      return;
    }

    setLoginFormErrors({});
    setSubmitting(true);

    try {
      const user = await login({
        ...validationResult.data,
        remember: loginFormData.get("remember") === "on",
      });
      // adotante -> /usuario, ONG -> /Painel
      router.replace(homeByRole[user.role]);
      router.refresh();
    } catch (error) {
      setLoginError(
        error instanceof Error
          ? error.message
          : "Não foi possível entrar. Tente novamente.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Main>
      <Panel aria-label="Acesso ao PetHub">
        <Brand>
          <Logo href={PUBLIC_HOME} />
        </Brand>

        <AuthTabs aria-label="Acesso à conta">
          <AuthTab as="span" active aria-current="page">
            Entrar
          </AuthTab>
          <AuthTab href={authRoute.register(currentProfile)}>
            Criar conta
          </AuthTab>
        </AuthTabs>

        <Form onSubmit={handleLoginSubmit} noValidate>
          {loginError && <ErrorAlert role="alert">{loginError}</ErrorAlert>}

          <ProfilePicker>
            <ProfileLegend>Você é:</ProfileLegend>
            <ProfileOptions>
              {profiles.map((profileOption) => (
                <ProfileOption
                  key={profileOption}
                  href={authRoute.login(profileOption)}
                  replace
                  scroll={false}
                  aria-current={
                    currentProfile === profileOption ? "true" : undefined
                  }
                >
                  {profileLabels[profileOption]}
                </ProfileOption>
              ))}
            </ProfileOptions>
            <input type="hidden" name="profile" value={currentProfile} />
          </ProfilePicker>

          <Field>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@email.com"
              error={loginFormErrors.email}
              onChange={handleInputChange}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Sua senha"
              error={loginFormErrors.password}
              onChange={handleInputChange}
            />
          </Field>

          <Options>
            <RememberOption>
              <input type="checkbox" name="remember" />
              <span>Lembrar-me</span>
            </RememberOption>
            <StyledForgotLink href={authRoute.forgotPassword()}>
              Esqueci minha senha
            </StyledForgotLink>
          </Options>

          <Button
            type="submit"
            isLoading={submitting}
            loadingLabel="Entrando..."
          >
            Entrar <ArrowRight size={16} aria-hidden />
          </Button>
        </Form>

        <Divider>
          <span>ou continue com</span>
        </Divider>

        <Button
          variant="secondary"
          onClick={() =>
            toast.info("O acesso com Google estará disponível em breve.")
          }
        >
          <Globe size={16} aria-hidden />
          Entrar com Google
        </Button>
      </Panel>
    </Main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
