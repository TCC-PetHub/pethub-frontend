"use client";

import Link from "next/link";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Hourglass, ShieldCheck, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/common/Button";
import { AuthTab, AuthTabs } from "@/components/common/AuthTabs";
import Brand from "@/components/common/Brand";
import Input from "@/components/common/Input";
import Logo from "@/components/common/Logo";
import { PUBLIC_HOME, useAuth } from "@/contexts/AuthContext";
import {
  BackLink,
  PendingBox,
  PendingIcon,
  PendingText,
  PendingTitle,
} from "./styles";

import {
  CityStateFields,
  DocumentFileInput,
  DocumentUploadAction,
  DocumentUploadArea,
  DocumentUploadHelp,
  DocumentUploadIcon,
  FieldError,
  FieldHelp,
  FieldLabel,
  IdentityPrivacyNotice,
  ProfileGuidance,
  ProfileOption,
  ProfileSelector,
  PrivacyConsent,
  RegistrationDescription,
  RegistrationField,
  RegistrationIntro,
  RegistrationSection,
  RegistrationSectionDescription,
  RegistrationSectionTitle,
  RegistrationTitle,
  RequiredFieldsNote,
  SelectedDocumentNames,
  UserRegistrationCard,
  UserRegistrationForm,
  UserRegistrationPage,
} from "./user-styles";

const userRegisterSchema = z
  .object({
    name: z.string().trim().min(1, "Informe seu nome completo"),
    cpf: z.string().min(1, "Informe seu CPF"),
    email: z.string().trim().email("E-mail inválido"),
    phone: z.string().min(1, "Informe seu telefone"),
    city: z.string().trim().min(1, "Informe sua cidade"),
    state: z.string().trim().length(2, "Informe uma UF válida"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    identityDocuments: z.custom<FileList>(
      (value) =>
        typeof FileList !== "undefined" &&
        value instanceof FileList &&
        value.length > 0,
      "Anexe seu documento de identificação",
    ),
    acceptedTerms: z.boolean().refine((value) => value, {
      message: "Aceite a Política de Privacidade para continuar",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.cpf.replace(/\D/g, "").length !== 11) {
      ctx.addIssue({
        code: "custom",
        path: ["cpf"],
        message: "CPF inválido",
      });
    }

    if (data.phone.replace(/\D/g, "").length < 10) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Telefone inválido",
      });
    }

    if (typeof FileList !== "undefined" && data.identityDocuments instanceof FileList) {
      Array.from(data.identityDocuments).forEach((file) => {
        if (file.size > 10 * 1024 * 1024) {
          ctx.addIssue({
            code: "custom",
            path: ["identityDocuments"],
            message: "Cada arquivo deve ter no máximo 10 MB",
          });
        }

        if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
          ctx.addIssue({
            code: "custom",
            path: ["identityDocuments"],
            message: "Envie arquivos PDF, JPG ou PNG",
          });
        }
      });
    }
  });

type UserRegisterData = z.infer<typeof userRegisterSchema>;

export default function UserRegister() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [pendingReview, setPendingReview] = useState(false);
  const { logout } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterData>({
    resolver: zodResolver(userRegisterSchema),
  });

  const documentRegistration = register("identityDocuments");

  async function onSubmit(data: UserRegisterData) {
    console.log({
      ...data,
      identityDocuments: Array.from(data.identityDocuments).map(
        (file) => file.name,
      ),
    });
    setPendingReview(true);
  }

  if (pendingReview) {
    return (
      <UserRegistrationPage className="user-registration-page">
        <UserRegistrationCard className="user-registration-card">
          <Brand className="user-registration-brand">
            <Logo className="user-registration-logo" href={PUBLIC_HOME} />
          </Brand>
          <PendingBox
            className="user-registration-analysis-page"
            role="status"
            aria-live="polite"
          >
            <PendingIcon className="user-registration-analysis-icon" aria-hidden>
              <Hourglass
                className="user-registration-analysis-hourglass"
                size={44}
                strokeWidth={1.75}
              />
            </PendingIcon>
            <PendingTitle className="user-registration-analysis-title">
              Cadastro enviado para análise
            </PendingTitle>
            <PendingText className="user-registration-analysis-description">
              Recebemos seus dados e documentos. A equipe PetHub fará a análise
              e entrará em contato pelos canais informados no cadastro.
            </PendingText>
            <BackLink
              className="user-registration-home-link"
              href={PUBLIC_HOME}
              onClick={logout}
            >
              Voltar para o início
            </BackLink>
          </PendingBox>
        </UserRegistrationCard>
      </UserRegistrationPage>
    );
  }

  return (
    <UserRegistrationPage className="user-registration-page">
      <UserRegistrationCard className="user-registration-card">
        <Brand className="user-registration-brand">
          <Logo className="user-registration-logo" href={PUBLIC_HOME} />
        </Brand>

        <AuthTabs className="user-registration-tabs" aria-label="Acesso">
          <AuthTab className="user-registration-login-tab" href="/login?perfil=adopter">Entrar</AuthTab>
          <AuthTab className="user-registration-active-tab" as="span" active aria-current="page">
            Criar conta
          </AuthTab>
        </AuthTabs>

        <UserRegistrationForm className="user-registration-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <RegistrationField className="user-registration-profile-field">
            <FieldLabel as="span">Tipo de cadastro</FieldLabel>
            <ProfileSelector className="user-registration-profile-selector">
              <ProfileOption className="user-registration-adopter-option" as="span" active aria-current="true">
                Adotante / Cidadão
              </ProfileOption>
              <ProfileOption className="user-registration-organization-option" as={Link} href="/register?perfil=organization">
                ONG / Protetor
              </ProfileOption>
            </ProfileSelector>
            <ProfileGuidance className="user-registration-profile-guidance">
              Protetores independentes devem se cadastrar como Adotante / Cidadão.
            </ProfileGuidance>
          </RegistrationField>

          <RegistrationIntro className="user-registration-intro">
            <RegistrationTitle className="user-registration-title">Cadastre-se como protetor independente</RegistrationTitle>
            <RegistrationDescription className="user-registration-description">
              Para quem atua no resgate e cuidado de animais por conta própria.
              Não é necessário ter uma organização, CNPJ ou instituto.
            </RegistrationDescription>
          </RegistrationIntro>

          <RequiredFieldsNote className="user-registration-required-fields-note">* Campos obrigatórios</RequiredFieldsNote>

          <RegistrationSection className="user-registration-personal-details">
            <RegistrationField className="user-registration-name-field">
              <FieldLabel className="user-registration-name-label" htmlFor="name">Nome completo *</FieldLabel>
              <Input
                className="user-registration-name-control"
                containerClassName="user-registration-name-input"
                variant="compact"
                id="name"
                placeholder="Seu nome completo"
                error={errors.name?.message}
                {...register("name")}
              />
            </RegistrationField>

            <RegistrationField className="user-registration-cpf-field">
              <FieldLabel className="user-registration-cpf-label" htmlFor="cpf">CPF *</FieldLabel>
              <Input
                className="user-registration-cpf-control"
                containerClassName="user-registration-cpf-input"
                variant="compact"
                id="cpf"
                inputMode="numeric"
                placeholder="000.000.000-00"
                error={errors.cpf?.message}
                {...register("cpf")}
              />
            </RegistrationField>

            <RegistrationField className="user-registration-email-field">
              <FieldLabel className="user-registration-email-label" htmlFor="email">E-mail *</FieldLabel>
              <Input
                className="user-registration-email-control"
                containerClassName="user-registration-email-input"
                variant="compact"
                id="email"
                type="email"
                placeholder="voce@email.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </RegistrationField>

            <RegistrationField className="user-registration-phone-field">
              <FieldLabel className="user-registration-phone-label" htmlFor="phone">Telefone *</FieldLabel>
              <Input
                className="user-registration-phone-control"
                containerClassName="user-registration-phone-input"
                variant="compact"
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </RegistrationField>

            <CityStateFields className="user-registration-location-fields">
              <RegistrationField className="user-registration-city-field">
                <FieldLabel className="user-registration-city-label" htmlFor="city">Cidade *</FieldLabel>
                <Input
                  className="user-registration-city-control"
                  containerClassName="user-registration-city-input"
                  variant="compact"
                  id="city"
                  placeholder="Ex. Belo Horizonte"
                  error={errors.city?.message}
                  {...register("city")}
                />
              </RegistrationField>

              <RegistrationField className="user-registration-state-field">
                <FieldLabel className="user-registration-state-label" htmlFor="state">UF *</FieldLabel>
                <Input
                  className="user-registration-state-control"
                  containerClassName="user-registration-state-input"
                  variant="compact"
                  id="state"
                  maxLength={2}
                  placeholder="UF"
                  error={errors.state?.message}
                  {...register("state")}
                />
              </RegistrationField>
            </CityStateFields>

            <RegistrationField className="user-registration-password-field">
              <FieldLabel className="user-registration-password-label" htmlFor="password">Senha *</FieldLabel>
              <Input
                className="user-registration-password-control"
                containerClassName="user-registration-password-input"
                variant="compact"
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                error={errors.password?.message}
                {...register("password")}
              />
              <FieldHelp className="user-registration-password-help">
                Use uma senha forte e segura para acompanhar sua solicitação no
                sistema.
              </FieldHelp>
            </RegistrationField>
          </RegistrationSection>

          <RegistrationSection className="user-registration-identity-section">
            <div>
              <RegistrationSectionTitle className="user-registration-identity-title">Conferência de identidade</RegistrationSectionTitle>
              <RegistrationSectionDescription className="user-registration-identity-description">
                Anexe RG ou CNH para que possamos confirmar sua identidade.
                Envie frente e verso quando aplicável, em PDF ou imagem, com até
                10 MB por arquivo.
              </RegistrationSectionDescription>
            </div>

            <RegistrationField className="user-registration-document-field">
              <FieldLabel className="user-registration-document-label" htmlFor="identityDocuments">
                Documento de identificação *
              </FieldLabel>
              <DocumentUploadArea className="user-registration-document-upload" htmlFor="identityDocuments">
                <DocumentFileInput
                  className="user-registration-identity-document-input"
                  id="identityDocuments"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  aria-invalid={errors.identityDocuments ? true : undefined}
                  aria-describedby={
                    errors.identityDocuments ? "identityDocuments-error" : undefined
                  }
                  {...documentRegistration}
                  onChange={(event) => {
                    documentRegistration.onChange(event);
                    setSelectedFiles(
                      Array.from(event.currentTarget.files ?? []).map(
                        (file) => file.name,
                      ),
                    );
                  }}
                />
                <DocumentUploadIcon className="user-registration-document-icon" aria-hidden>
                  <Upload className="user-registration-document-upload-icon" size={17} />
                </DocumentUploadIcon>
                <DocumentUploadAction className="user-registration-document-action">Selecionar arquivos</DocumentUploadAction>
                <DocumentUploadHelp className="user-registration-document-help">
                  ou arraste aqui • PDF, JPG ou PNG • até 10 MB por arquivo
                </DocumentUploadHelp>
              </DocumentUploadArea>
              {selectedFiles.length > 0 && (
                <SelectedDocumentNames className="user-registration-selected-document-names">{selectedFiles.join(" · ")}</SelectedDocumentNames>
              )}
              {errors.identityDocuments && (
                <FieldError className="user-registration-document-error" id="identityDocuments-error">
                  {errors.identityDocuments.message}
                </FieldError>
              )}
              <FieldHelp className="user-registration-document-guidance">
                Imagens coloridas e legíveis. Se necessário, envie frente e
                verso do documento. Não envie documentos ilegíveis, cortados ou
                com dados ocultos.
              </FieldHelp>
            </RegistrationField>

            <IdentityPrivacyNotice className="user-registration-privacy-notice">
              <ShieldCheck className="user-registration-privacy-icon" size={18} aria-hidden />
              <span>
                <strong>Sua identidade é sigilosa.</strong> CPF e documentos de
                identificação não aparecem no perfil público. Seus dados são
                protegidos conforme a LGPD.
              </span>
            </IdentityPrivacyNotice>
          </RegistrationSection>

          <RegistrationField className="user-registration-consent-field">
            <PrivacyConsent className="user-registration-privacy-consent" htmlFor="acceptedTerms">
              <input
                className="user-registration-privacy-checkbox"
                id="acceptedTerms"
                type="checkbox"
                {...register("acceptedTerms")}
              />
              <span>
                Li e aceito a{" "}
                <Link href="/privacidade">
                  Política de Privacidade (LGPD)
                </Link>{" "}
                e o uso dos meus dados e documentos para a análise do cadastro.
                *
              </span>
            </PrivacyConsent>
            {errors.acceptedTerms && (
                  <FieldError className="user-registration-privacy-error">{errors.acceptedTerms.message}</FieldError>
            )}
          </RegistrationField>

          <RegistrationSection className="user-registration-review-section">
            <div>
              <RegistrationSectionTitle className="user-registration-review-title">Como funciona a análise</RegistrationSectionTitle>
              <RegistrationSectionDescription className="user-registration-review-description">
                A equipe PetHub analisará as informações e os documentos
                enviados. O envio não significa aprovação. Se necessário,
                entraremos em contato pelos canais informados.
              </RegistrationSectionDescription>
            </div>
          </RegistrationSection>

          <Button
            className="user-registration-submit-button"
            variant="primary"
            type="submit"
            isLoading={isSubmitting}
            loadingLabel="Enviando cadastro..."
          >
            Enviar cadastro para análise
            <ArrowRight size={16} />
          </Button>
        </UserRegistrationForm>
      </UserRegistrationCard>
    </UserRegistrationPage>
  );
}