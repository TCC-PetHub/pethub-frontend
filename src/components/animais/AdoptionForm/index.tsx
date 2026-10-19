"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Check } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Textarea from "@/components/common/Textarea";
import { toast } from "@/components/common/Toast";
import type { Pet } from "@/features/animals/data";

import {
  Actions,
  Badge,
  Checkbox,
  ErrorMessage,
  Field,
  FormGrid,
  FormPanel,
  FormTitle,
  Label,
  Layout,
  Muted,
  PetCard,
  PetMeta,
  PetName,
  PetNote,
  PetPhoto,
  PetDivider,
  ProgressCard,
  ProgressRow,
  Step,
  StepNumber,
  Steps,
  Switch,
  SwitchRow,
  Term,
} from "./styles";

const STEPS = ["Dados Pessoais", "Questionário", "Assinatura de Termo"];

const STEP_TITLES = [
  "Dados Pessoais",
  "Questionário de Habitação e Rotina",
  "Termo de Adoção Responsável",
];

const SELECT_FIELDS = [
  {
    name: "home",
    label: "Tipo de Residência",
    options: ["Casa", "Apartamento", "Outro"],
  },
  {
    name: "yard",
    label: "Possui Quintal Cercado?",
    options: ["Sim, espaço seguro", "Não", "Não se aplica"],
  },
  {
    name: "otherPets",
    label: "Possui outros animais atualmente?",
    options: [
      "Não",
      "Sim, 1 cachorro",
      "Sim, 1 gato",
      "Sim, mais de um animal",
    ],
  },
  {
    name: "residents",
    label: "Número de moradores na residência",
    options: ["1 pessoa", "2 pessoas", "3 pessoas", "4 ou mais pessoas"],
  },
] as const;

const adoptionSchema = z
  .object({
    name: z.string().trim().min(1, "Campo obrigatório"),
    email: z.string().email("E-mail inválido"),
    phone: z.string().min(10, "Telefone inválido"),
    address: z.string().trim().min(1, "Campo obrigatório"),
    home: z.string().min(1, "Campo obrigatório"),
    yard: z.string().min(1, "Campo obrigatório"),
    otherPets: z.string().min(1, "Campo obrigatório"),
    residents: z.string().min(1, "Campo obrigatório"),
    reason: z.string().trim().min(20, "Mínimo 20 caracteres"),
    visits: z.boolean(),
    acceptedCommitment: z.boolean().refine((value) => value, {
      message: "Aceite os compromissos para continuar",
    }),
    signature: z.string().min(1, "Campo obrigatório"),
  })
  .superRefine((data, ctx) => {
    if (data.signature.trim() !== data.name.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["signature"],
        message: "A confirmação deve corresponder ao seu nome completo.",
      });
    }
  });

type AdoptionData = z.infer<typeof adoptionSchema>;

const STEP_FIELDS: (keyof AdoptionData)[][] = [
  ["name", "email", "phone", "address"],
  ["home", "yard", "otherPets", "residents", "reason"],
  ["acceptedCommitment", "signature"],
];

export default function AdoptionForm({ pet }: { pet: Pet }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<AdoptionData>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      name: "Carlos Alberto",
      email: "carlos.alberto@email.com",
      phone: "(41) 98888-7766",
      address: "",
      home: "Casa",
      yard: "Sim, espaço seguro",
      otherPets: "Sim, 1 cachorro",
      residents: "3 pessoas",
      reason: "",
      visits: true,
      acceptedCommitment: false,
      signature: "",
    },
  });

  const name = useWatch({ control, name: "name" });
  const visits = useWatch({ control, name: "visits" });

  useEffect(() => {
    try {
      const profile = JSON.parse(
        localStorage.getItem("pethub:profile") || "null",
      );
      if (!profile) return;
      if (profile.name) setValue("name", profile.name);
      if (profile.email) setValue("email", profile.email);
      if (profile.phone) setValue("phone", profile.phone);
    } catch {
      // perfil inválido no localStorage: segue com os valores padrão
    }
  }, [setValue]);

  async function onSubmit(data: AdoptionData) {
    try {
      // TODO: chamada real da API
      const stored = JSON.parse(
        localStorage.getItem("pethub:adoptionRequests") || "[]",
      );
      const existing = Array.isArray(stored) ? stored : [];

      localStorage.setItem(
        "pethub:adoptionRequests",
        JSON.stringify([
          ...existing,
          {
            id: crypto.randomUUID(),
            petId: pet.id,
            name: pet.name,
            description: `${pet.breed} • ${pet.sex} • ${pet.age}`,
            organization: pet.organization,
            date: new Date().toLocaleDateString("pt-BR"),
            status: "Em Análise",
            tone: "analysis",
            answers: data,
            visits: data.visits,
          },
        ]),
      );

      toast.success("Solicitação enviada com sucesso");
      setDone(true);
    } catch {
      toast.error("Não foi possível salvar sua solicitação. Tente novamente.");
    }
  }

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < 3) {
      const valid = await trigger(STEP_FIELDS[step - 1]);
      if (valid) setStep(step + 1);
      return;
    }

    await handleSubmit(onSubmit)(event);
  }

  return (
    <>
      <ProgressCard>
        <ProgressRow>
          <span>
            <Badge>PROCESSO</Badge> Adoção responsável de {pet.name}
          </span>
          <strong>Etapa {step} de 3</strong>
        </ProgressRow>

        <Steps aria-label="Etapas da adoção">
          {STEPS.map((label, index) => {
            const number = index + 1;

            return (
              <Step
                key={label}
                active={step >= number}
                aria-current={step === number ? "step" : undefined}
              >
                <StepNumber>
                  {step > number ? <Check size={12} aria-hidden /> : number}
                </StepNumber>
                {label}
              </Step>
            );
          })}
        </Steps>
      </ProgressCard>

      <Layout>
        <PetCard>
          <PetPhoto aria-hidden />
          <PetName>{pet.name}</PetName>
          <PetMeta>
            {pet.breed} • {pet.sex} • {pet.age}
          </PetMeta>
          <PetMeta>
            <Building2 size={12} aria-hidden />
            {pet.organization}
          </PetMeta>
          <PetDivider />
          <PetNote>
            O envio deste formulário inicia o processo oficial de adoção
            responsável no PetHub.
          </PetNote>
        </PetCard>

        <FormPanel>
          {done ? (
            <div role="status" aria-live="polite">
              <FormTitle>Solicitação enviada!</FormTitle>
              <p>
                Sua solicitação de adoção de {pet.name} foi salva neste
                navegador. Acompanhe pelo card “Minhas adoções” na página
                inicial.
              </p>
              <Muted>
                Demonstração: nenhum dado foi enviado a uma organização.
              </Muted>
            </div>
          ) : (
            <form onSubmit={onFormSubmit} noValidate>
              <FormTitle>{STEP_TITLES[step - 1]}</FormTitle>

              {step === 1 && (
                <FormGrid>
                  <Field>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      variant="compact"
                      id="name"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      variant="compact"
                      id="email"
                      type="email"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </Field>

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

                  <Field>
                    <Label htmlFor="address">Endereço completo</Label>
                    <Input
                      variant="compact"
                      id="address"
                      error={errors.address?.message}
                      {...register("address")}
                    />
                  </Field>
                </FormGrid>
              )}

              {step === 2 && (
                <>
                  <FormGrid>
                    {SELECT_FIELDS.map(
                      ({ name: fieldName, label, options }) => (
                        <Field key={fieldName}>
                          <Label htmlFor={fieldName}>{label}</Label>
                          <Select
                            id={fieldName}
                            error={errors[fieldName]?.message}
                            {...register(fieldName)}
                          >
                            {options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                        </Field>
                      ),
                    )}
                  </FormGrid>

                  <Field>
                    <Label htmlFor="reason">
                      Por que você deseja adotar o {pet.name}?
                    </Label>
                    <Textarea
                      id="reason"
                      placeholder="Conte sobre sua rotina e como pretende cuidar do animal."
                      error={errors.reason?.message}
                      {...register("reason")}
                    />
                  </Field>

                  <SwitchRow>
                    <strong id="visits-label">
                      Disponibilidade para receber visita pré-adoção da ONG?
                    </strong>
                    <Switch
                      type="button"
                      role="switch"
                      aria-checked={visits}
                      aria-labelledby="visits-label"
                      checked={visits}
                      onClick={() => setValue("visits", !visits)}
                    >
                      <span />
                    </Switch>
                  </SwitchRow>
                </>
              )}

              {step === 3 && (
                <>
                  <Term>
                    <p>
                      Eu, <strong>{name}</strong>, solicito a adoção de{" "}
                      <strong>{pet.name}</strong> e me comprometo a oferecer
                      alimentação adequada, abrigo seguro, cuidados veterinários
                      e atenção ao bem-estar do animal.
                    </p>
                    <p>
                      Entendo que a organização avaliará o questionário e poderá
                      solicitar informações adicionais antes de aprovar a
                      adoção.
                    </p>
                    <p>
                      Este formulário é demonstrativo e não constitui assinatura
                      de um contrato definitivo.
                    </p>
                  </Term>

                  <Field>
                    <Checkbox htmlFor="acceptedCommitment">
                      <input
                        id="acceptedCommitment"
                        type="checkbox"
                        {...register("acceptedCommitment")}
                      />
                      <span>
                        Li e concordo com os compromissos de adoção responsável.
                      </span>
                    </Checkbox>
                    {errors.acceptedCommitment && (
                      <ErrorMessage>
                        {errors.acceptedCommitment.message}
                      </ErrorMessage>
                    )}
                  </Field>

                  <Field>
                    <Label htmlFor="signature">
                      Digite seu nome completo para confirmar
                    </Label>
                    <Input
                      variant="compact"
                      id="signature"
                      error={errors.signature?.message}
                      {...register("signature")}
                    />
                  </Field>
                </>
              )}

              <Actions>
                {step > 1 ? (
                  <Button
                    variant="secondary"
                    fullWidth={false}
                    onClick={() => setStep(step - 1)}
                  >
                    Voltar
                  </Button>
                ) : (
                  <span />
                )}

                <Button
                  variant="primary"
                  type="submit"
                  fullWidth={false}
                  isLoading={isSubmitting}
                  loadingLabel="Enviando..."
                >
                  {step === 3 ? "Enviar solicitação" : "Próximo Passo"}
                </Button>
              </Actions>
            </form>
          )}
        </FormPanel>
      </Layout>
    </>
  );
}
