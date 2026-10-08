"use client";

import { Suspense, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { z } from "zod";

import Button from "@/components/common/Button";
import { AuthTab, AuthTabs } from "@/components/common/AuthTabs";
import Brand from "@/components/common/Brand";
import Input from "@/components/common/Input";
import Logo from "@/components/common/Logo";
import { toast } from "@/components/common/Toast";
import {
  AUTHENTICATED_HOME,
  PUBLIC_HOME,
  useAuth,
} from "@/contexts/AuthContext";
import {
  loginSchema,
  profileLabels,
  profiles,
  type LoginField,
} from "@/schemas/auth";

import { authRoute } from "../routes";
import { loginStyles } from "./styles";

type LoginFormErrors = Partial<Record<LoginField, string>>;

const loginFieldFocusOrder = ["email", "password"] as const;

// GoogleIcon: ícone usado no botão de login social.
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="var(--colors-googleBlue)"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="var(--colors-googleGreen)"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="var(--colors-googleYellow)"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="var(--colors-googleRed)"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

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
      await login({
        ...validationResult.data,
        remember: loginFormData.get("remember") === "on",
      });
      router.replace(AUTHENTICATED_HOME);
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
    <main className={loginStyles()}>
      <section className="login-panel" aria-label="Acesso ao PetHub">
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

        <form className="login-form" onSubmit={handleLoginSubmit} noValidate>
          {loginError && <p role="alert">{loginError}</p>}
          <fieldset className="profile-picker">
            <legend>Você é:</legend>
            <div className="profile-options">
              {profiles.map((profileOption) => (
                <Link
                  key={profileOption}
                  className="profile-option"
                  href={authRoute.login(profileOption)}
                  replace
                  scroll={false}
                  aria-current={
                    currentProfile === profileOption ? "true" : undefined
                  }
                >
                  {profileLabels[profileOption]}
                </Link>
              ))}
            </div>
            <input type="hidden" name="profile" value={currentProfile} />
          </fieldset>

          <div className="form-field">
            <label htmlFor="email">E-mail</label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@email.com"
              error={loginFormErrors.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Senha</label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Sua senha"
              error={loginFormErrors.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-options">
            <label className="remember-option">
              <input type="checkbox" name="remember" />
              <span>Lembrar-me</span>
            </label>
            <Link href={authRoute.forgotPassword()}>Esqueci minha senha</Link>
          </div>

          <Button type="submit" isLoading={submitting} loadingLabel="Entrando...">
            Entrar <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </form>

        <div className="divider">
          <span>ou continue com</span>
        </div>

        <Button
          variant="secondary"
          onClick={() =>
            toast.info("O acesso com Google estará disponível em breve.")
          }
        >
          <GoogleIcon />
          Entrar com Google
        </Button>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
