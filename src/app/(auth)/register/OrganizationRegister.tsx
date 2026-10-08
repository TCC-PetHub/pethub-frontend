"use client";

import Link from "next/link";
import { useState, type ChangeEventHandler } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ChevronDown, Hourglass, Upload } from "lucide-react";
import {
  useForm,
  type UseFormRegisterReturn,
} from "react-hook-form";
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
  OrganizationCityStateFields,
  OrganizationDocumentFileInput,
  OrganizationDocumentName,
  OrganizationDocumentUploadControl,
  OrganizationField,
  OrganizationFieldError,
  OrganizationFieldHelp,
  OrganizationFieldLabel,
  OrganizationPrivacyConsent,
  OrganizationProfileOption,
  OrganizationProfileSelector,
  OrganizationRegistrationCard,
  OrganizationRegistrationForm,
  OrganizationRegistrationPage,
  OrganizationSection,
  OrganizationSectionDescription,
  OrganizationSectionTitle,
} from "./organization-styles";

function isFileList(value: unknown): value is FileList {
  return typeof FileList !== "undefined" && value instanceof FileList;
}

const organizationSchema = z
  .object({
    organizationName: z.string().trim().min(1, "Informe o nome da organização"),
    cnpj: z.string().min(1, "Informe o CNPJ"),
    institutionalEmail: z.string().trim().email("E-mail institucional inválido"),
    phone: z.string().min(1, "Informe o telefone"),
    city: z.string().trim().min(1, "Informe a cidade"),
    state: z.string().trim().length(2, "Informe uma UF válida"),
    responsibleName: z.string().trim().min(1, "Informe o nome do responsável"),
    responsibleCpf: z.string().min(1, "Informe o CPF do responsável"),
    responsibleEmail: z.string().trim().email("E-mail do responsável inválido"),
    accessEmail: z.string().trim().email("E-mail de acesso inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    cnpjDocument: z.custom<FileList>(
      (value) => isFileList(value) && value.length > 0,
      "Anexe o comprovante de CNPJ",
    ),
    statuteDocument: z.custom<FileList>(
      (value) => isFileList(value) && value.length > 0,
      "Anexe o estatuto da organização",
    ),
    shelterDocument: z.custom<FileList | undefined>(
      (value) => value === undefined || (isFileList(value) && value.length <= 1),
    ),
    acceptedTerms: z.boolean().refine((value) => value, {
      message: "Aceite a Política de Privacidade para continuar",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.cnpj.replace(/\D/g, "").length !== 14) {
      ctx.addIssue({
        code: "custom",
        path: ["cnpj"],
        message: "CNPJ inválido",
      });
    }

    if (data.phone.replace(/\D/g, "").length < 10) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Telefone inválido",
      });
    }

    if (data.responsibleCpf.replace(/\D/g, "").length !== 11) {
      ctx.addIssue({
        code: "custom",
        path: ["responsibleCpf"],
        message: "CPF inválido",
      });
    }

    const documentFields = [
      "cnpjDocument",
      "statuteDocument",
      "shelterDocument",
    ] as const;

    documentFields.forEach((field) => {
      const files = data[field];
      if (!isFileList(files)) return;

      Array.from(files).forEach((file) => {
        if (file.size > 10 * 1024 * 1024) {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: "Cada arquivo deve ter no máximo 10 MB",
          });
        }

        if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: "Envie arquivos PDF, JPG ou PNG",
          });
        }
      });
    });
  });

type OrganizationData = z.infer<typeof organizationSchema>;
type OrganizationDocumentField =
  | "cnpjDocument"
  | "statuteDocument"
  | "shelterDocument";

interface OrganizationDocumentPickerProps {
  id: OrganizationDocumentField;
  label: string;
  registration: UseFormRegisterReturn;
  filename?: string;
  error?: string;
  optional?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function OrganizationDocumentPicker({
  id,
  label,
  registration,
  filename,
  error,
  optional = false,
  onChange,
}: OrganizationDocumentPickerProps) {
  return (
    <OrganizationField className={`organization-registration-${id}-field`}>
      <OrganizationFieldLabel className={`organization-registration-${id}-label`} htmlFor={id}>{label}</OrganizationFieldLabel>
      <OrganizationDocumentUploadControl
        className={`organization-registration-${id}-upload-control`}
        htmlFor={id}
      >
        <OrganizationDocumentFileInput
          className={`organization-registration-${id}-file-input`}
          id={id}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          aria-required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...registration}
          onChange={onChange}
        />
        <Upload className="organization-registration-document-upload-icon" size={14} aria-hidden />
        <OrganizationDocumentName className={`organization-registration-${id}-filename`}>
          {filename ?? "Anexe o arquivo ou selecione um PDF"}
        </OrganizationDocumentName>
        <ChevronDown className="organization-registration-document-chevron" size={14} aria-hidden />
      </OrganizationDocumentUploadControl>
      {error && (
        <OrganizationFieldError className={`organization-registration-${id}-error`} id={`${id}-error`}>{error}</OrganizationFieldError>
      )}
    </OrganizationField>
  );
}

export default function OrganizationRegister() {
  const [pendingReview, setPendingReview] = useState(false);
  const { logout } = useAuth();
  const [documentNames, setDocumentNames] = useState<
    Partial<Record<OrganizationDocumentField, string>>
  >({});
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: { acceptedTerms: true },
  });

  const cnpjDocumentRegistration = register("cnpjDocument");
  const statuteDocumentRegistration = register("statuteDocument");
  const shelterDocumentRegistration = register("shelterDocument");

  async function onSubmit(data: OrganizationData) {
    console.log({
      ...data,
      cnpjDocument: Array.from(data.cnpjDocument).map((file) => file.name),
      statuteDocument: Array.from(data.statuteDocument).map((file) => file.name),
      shelterDocument: isFileList(data.shelterDocument)
        ? Array.from(data.shelterDocument).map((file) => file.name)
        : [],
    });
    setPendingReview(true);
  }

  function updateDocumentName(
    field: OrganizationDocumentField,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFilename = event.currentTarget.files?.[0]?.name;
    setDocumentNames((current) => ({
      ...current,
      [field]: selectedFilename,
    }));
  }

  if (pendingReview) {
    return (
      <OrganizationRegistrationPage className="organization-registration-page">
        <OrganizationRegistrationCard className="organization-registration-card">
          <Brand className="organization-registration-brand">
            <Logo className="organization-registration-logo" />
          </Brand>
          <PendingBox className="organization-registration-pending-state" role="status" aria-live="polite">
            <PendingIcon className="organization-registration-pending-icon" aria-hidden>
              <Hourglass className="organization-registration-pending-hourglass" size={44} strokeWidth={1.75} />
            </PendingIcon>
            <PendingTitle className="organization-registration-pending-title">Solicitação enviada para análise</PendingTitle>
            <PendingText className="organization-registration-pending-description">
              Recebemos o cadastro da sua organização. Assim que a análise for
              concluída, entraremos em contato.
            </PendingText>
            <BackLink
              className="organization-registration-home-link"
              href={PUBLIC_HOME}
              onClick={logout}
            >
              Voltar para o início
            </BackLink>
          </PendingBox>
        </OrganizationRegistrationCard>
      </OrganizationRegistrationPage>
    );
  }

  return (
    <OrganizationRegistrationPage className="organization-registration-page">
      <OrganizationRegistrationCard className="organization-registration-card">
        <Brand className="organization-registration-brand">
          <Logo className="organization-registration-logo" href={PUBLIC_HOME} />
        </Brand>

        <AuthTabs className="organization-registration-tabs" aria-label="Acesso">
          <AuthTab className="organization-registration-login-tab" href="/login?perfil=organization">Entrar</AuthTab>
          <AuthTab className="organization-registration-active-tab" as="span" active aria-current="page">
            Criar conta
          </AuthTab>
        </AuthTabs>

        <OrganizationRegistrationForm className="organization-registration-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <OrganizationField className="organization-registration-profile-field">
            <OrganizationFieldLabel as="span">Tipo de cadastro</OrganizationFieldLabel>
            <OrganizationProfileSelector className="organization-registration-profile-selector">
              <OrganizationProfileOption
                className="organization-registration-adopter-option"
                as={Link}
                href="/register?perfil=adopter"
              >
                Adotante / Cidadão
              </OrganizationProfileOption>
              <OrganizationProfileOption className="organization-registration-active-profile-option" as="span" active aria-current="true">
                ONG / Protetor
              </OrganizationProfileOption>
            </OrganizationProfileSelector>
          </OrganizationField>

          <OrganizationField className="organization-registration-name-field">
            <OrganizationFieldLabel className="organization-registration-name-label" htmlFor="organizationName">Nome da organização *</OrganizationFieldLabel>
            <Input
              className="organization-registration-name-control"
              containerClassName="organization-registration-name-input"
              variant="compact"
              id="organizationName"
              placeholder="Ex. Instituto Patas da Luz"
              error={errors.organizationName?.message}
              {...register("organizationName")}
            />
          </OrganizationField>

          <OrganizationField className="organization-registration-cnpj-field">
            <OrganizationFieldLabel className="organization-registration-cnpj-label" htmlFor="cnpj">CNPJ *</OrganizationFieldLabel>
            <Input
              className="organization-registration-cnpj-control"
              containerClassName="organization-registration-cnpj-input"
              variant="compact"
              id="cnpj"
              inputMode="numeric"
              placeholder="00.000.000/0000-00"
              error={errors.cnpj?.message}
              {...register("cnpj")}
            />
            <OrganizationFieldHelp className="organization-registration-cnpj-help">
              Obrigatório para organizações regulamentadas
            </OrganizationFieldHelp>
          </OrganizationField>

          <OrganizationField className="organization-registration-institutional-email-field">
            <OrganizationFieldLabel className="organization-registration-institutional-email-label" htmlFor="institutionalEmail">
              E-mail institucional *
            </OrganizationFieldLabel>
            <Input
              className="organization-registration-institutional-email-control"
              containerClassName="organization-registration-institutional-email-input"
              variant="compact"
              id="institutionalEmail"
              type="email"
              placeholder="contato@instituto.org"
              error={errors.institutionalEmail?.message}
              {...register("institutionalEmail")}
            />
          </OrganizationField>

          <OrganizationField className="organization-registration-phone-field">
            <OrganizationFieldLabel className="organization-registration-phone-label" htmlFor="phone">Telefone *</OrganizationFieldLabel>
            <Input
              className="organization-registration-phone-control"
              containerClassName="organization-registration-phone-input"
              variant="compact"
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </OrganizationField>

          <OrganizationCityStateFields className="organization-registration-location-fields">
            <OrganizationField className="organization-registration-city-field">
              <OrganizationFieldLabel className="organization-registration-city-label" htmlFor="city">Cidade *</OrganizationFieldLabel>
              <Input
                className="organization-registration-city-control"
                containerClassName="organization-registration-city-input"
                variant="compact"
                id="city"
                placeholder="Ex. Belo Horizonte"
                error={errors.city?.message}
                {...register("city")}
              />
            </OrganizationField>
            <OrganizationField className="organization-registration-state-field">
              <OrganizationFieldLabel className="organization-registration-state-label" htmlFor="state">Estado *</OrganizationFieldLabel>
              <Input
                className="organization-registration-state-control"
                containerClassName="organization-registration-state-input"
                variant="compact"
                id="state"
                maxLength={2}
                placeholder="MG"
                error={errors.state?.message}
                {...register("state")}
              />
            </OrganizationField>
          </OrganizationCityStateFields>

          <OrganizationSection className="organization-registration-responsible-section">
            <div>
              <OrganizationSectionTitle className="organization-registration-responsible-title">
                Identificação do responsável
              </OrganizationSectionTitle>
              <OrganizationSectionDescription className="organization-registration-responsible-description">
                Informe nome, CPF e e-mail do representante legal para
                conferência institucional.
              </OrganizationSectionDescription>
            </div>
            <OrganizationField className="organization-registration-responsible-name-field">
              <OrganizationFieldLabel className="organization-registration-responsible-name-label" htmlFor="responsibleName">
                Nome do responsável *
              </OrganizationFieldLabel>
              <Input
                className="organization-registration-responsible-name-control"
                containerClassName="organization-registration-responsible-name-input"
                variant="compact"
                id="responsibleName"
                placeholder="Ex. Maria Silva"
                error={errors.responsibleName?.message}
                {...register("responsibleName")}
              />
            </OrganizationField>
            <OrganizationField className="organization-registration-responsible-cpf-field">
              <OrganizationFieldLabel className="organization-registration-responsible-cpf-label" htmlFor="responsibleCpf">
                CPF do responsável *
              </OrganizationFieldLabel>
              <Input
                className="organization-registration-responsible-cpf-control"
                containerClassName="organization-registration-responsible-cpf-input"
                variant="compact"
                id="responsibleCpf"
                inputMode="numeric"
                placeholder="000.000.000-00"
                error={errors.responsibleCpf?.message}
                {...register("responsibleCpf")}
              />
            </OrganizationField>
            <OrganizationField className="organization-registration-responsible-email-field">
              <OrganizationFieldLabel className="organization-registration-responsible-email-label" htmlFor="responsibleEmail">
                E-mail do responsável *
              </OrganizationFieldLabel>
              <Input
                className="organization-registration-responsible-email-control"
                containerClassName="organization-registration-responsible-email-input"
                variant="compact"
                id="responsibleEmail"
                type="email"
                placeholder="maria@email.org"
                error={errors.responsibleEmail?.message}
                {...register("responsibleEmail")}
              />
            </OrganizationField>
          </OrganizationSection>

          <OrganizationSection className="organization-registration-access-section">
            <div>
              <OrganizationSectionTitle className="organization-registration-access-title">Dados de acesso</OrganizationSectionTitle>
              <OrganizationSectionDescription className="organization-registration-access-description">
                Esses dados serão usados para o primeiro acesso ao painel
                administrativo.
              </OrganizationSectionDescription>
            </div>
            <OrganizationField className="organization-registration-access-email-field">
              <OrganizationFieldLabel className="organization-registration-access-email-label" htmlFor="accessEmail">
                E-mail de acesso *
              </OrganizationFieldLabel>
              <Input
                className="organization-registration-access-email-control"
                containerClassName="organization-registration-access-email-input"
                variant="compact"
                id="accessEmail"
                type="email"
                placeholder="acesso@instituto.org"
                error={errors.accessEmail?.message}
                {...register("accessEmail")}
              />
            </OrganizationField>
            <OrganizationField className="organization-registration-password-field">
              <OrganizationFieldLabel className="organization-registration-password-label" htmlFor="password">Senha *</OrganizationFieldLabel>
              <Input
                className="organization-registration-password-control"
                containerClassName="organization-registration-password-input"
                variant="compact"
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                error={errors.password?.message}
                {...register("password")}
              />
            </OrganizationField>
          </OrganizationSection>

          <OrganizationSection className="organization-registration-documents-section">
            <div>
              <OrganizationSectionTitle className="organization-registration-documents-title">
                Documentos obrigatórios
              </OrganizationSectionTitle>
              <OrganizationSectionDescription className="organization-registration-documents-description">
                Envie os documentos em PDF, JPG ou PNG. Limite por arquivo: 10
                MB.
              </OrganizationSectionDescription>
            </div>
            <OrganizationDocumentPicker
              id="cnpjDocument"
              label="Comprovante de CNPJ *"
              registration={cnpjDocumentRegistration}
              filename={documentNames.cnpjDocument}
              error={errors.cnpjDocument?.message}
              onChange={(event) => {
                cnpjDocumentRegistration.onChange(event);
                updateDocumentName("cnpjDocument", event);
              }}
            />
            <OrganizationDocumentPicker
              id="statuteDocument"
              label="Estatuto da organização *"
              registration={statuteDocumentRegistration}
              filename={documentNames.statuteDocument}
              error={errors.statuteDocument?.message}
              onChange={(event) => {
                statuteDocumentRegistration.onChange(event);
                updateDocumentName("statuteDocument", event);
              }}
            />
            <OrganizationDocumentPicker
              id="shelterDocument"
              label="Documento do abrigo (opcional)"
              registration={shelterDocumentRegistration}
              filename={documentNames.shelterDocument}
              error={errors.shelterDocument?.message}
              optional
              onChange={(event) => {
                shelterDocumentRegistration.onChange(event);
                updateDocumentName("shelterDocument", event);
              }}
            />
          </OrganizationSection>

          <OrganizationField className="organization-registration-consent-field">
            <OrganizationPrivacyConsent className="organization-registration-privacy-consent" htmlFor="acceptedTerms">
              <input
                className="organization-registration-privacy-checkbox"
                id="acceptedTerms"
                type="checkbox"
                {...register("acceptedTerms")}
              />
              <span>
                Autorizo o tratamento dos dados e documentos enviados conforme
                a <Link href="/privacidade">Política de Privacidade (LGPD)</Link>,
                para análise do cadastro.
              </span>
            </OrganizationPrivacyConsent>
            {errors.acceptedTerms && (
              <OrganizationFieldError className="organization-registration-privacy-error">
                {errors.acceptedTerms.message}
              </OrganizationFieldError>
            )}
          </OrganizationField>

          <OrganizationSection className="organization-registration-review-section">
            <div>
              <OrganizationSectionTitle className="organization-registration-review-title">
                Como funciona a análise
              </OrganizationSectionTitle>
              <OrganizationSectionDescription className="organization-registration-review-description">
                A equipe PetHub verificará as informações e os documentos
                enviados. O envio não significa aprovação. Se necessário,
                entraremos em contato pelos canais informados.
              </OrganizationSectionDescription>
            </div>
          </OrganizationSection>

          <Button
            className="organization-registration-submit-button"
            variant="primary"
            type="submit"
            isLoading={isSubmitting}
            loadingLabel="Enviando cadastro..."
          >
            Enviar cadastro para análise
            <ArrowRight size={16} />
          </Button>
        </OrganizationRegistrationForm>
      </OrganizationRegistrationCard>
    </OrganizationRegistrationPage>
  );
}