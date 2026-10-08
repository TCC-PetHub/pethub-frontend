"use client";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";

import { useEffect, useState, type FormEvent } from "react";
import { Check, Building2 } from "lucide-react";
import s from "@/components/templates/PortalShell/styles";
import type { Pet } from "@/features/animals/data";
export default function AdoptionForm({ pet }: { pet: Pet }) {
  const [step, setStep] = useState(1);
  const [visits, setVisits] = useState(true);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState<Record<string, string>>({
    name: "Carlos Alberto",
    email: "carlos.alberto@email.com",
    phone: "(41) 98888-7766",
    address: "",
    home: "Casa",
    yard: "Sim, espaço seguro",
    otherPets: "Sim, 1 cachorro",
    residents: "3 pessoas",
    reason: "",
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const p = JSON.parse(localStorage.getItem("pethub:profile") || "null");
        if (p)
          setValues((v) => ({
            ...v,
            name: p.name || v.name,
            email: p.email || v.email,
            phone: p.phone || v.phone,
          }));
      } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  function field(key: string, label: string, options?: string[]) {
    return (
      <label>
        {label}
        {options ? (
          <Select
            value={values[key]}
            onChange={(e) => setValues({ ...values, [key]: e.target.value })}
          >
            {options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
        ) : (
          <Input
            required
            name={key}
            value={values[key]}
            type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
            onChange={(e) => setValues({ ...values, [key]: e.target.value })}
          />
        )}
      </label>
    );
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      setError("");
      setStep(step + 1);
      return;
    }
    if (values.signature?.trim() !== values.name.trim()) {
      setError("A confirmação deve corresponder ao seu nome completo.");
      return;
    }
    try {
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
            answers: values,
            visits,
          },
        ]),
      );
      setDone(true);
    } catch {
      setError(
        "Não foi possível salvar sua solicitação neste navegador. Tente novamente.",
      );
    }
  }
  return (
    <>
      <section className={`${s.card} ${s.progress}`}>
        <div className={s.row}>
          <span>
            <span className={`${s.badge} ${s.mint}`}>PROCESSO</span> Adoção
            responsável de {pet.name}
          </span>
          <strong>Etapa {step} de 3</strong>
        </div>
        <ol>
          {["Dados Pessoais", "Questionário", "Assinatura de Termo"].map(
            (label, i) => (
              <li
                key={label}
                aria-current={step === i + 1 ? "step" : undefined}
                className={step >= i + 1 ? s.currentStep : ""}
              >
                <span>{step > i + 1 ? <Check size={12} /> : i + 1}</span>
                {label}
              </li>
            ),
          )}
        </ol>
      </section>
      <div className={s.adoptionLayout}>
        <aside className={`${s.card} ${s.adoptionPet}`}>
          <div className={s.summaryPhoto} />
          <h2>{pet.name}</h2>
          <p>
            {pet.breed} • {pet.sex} • {pet.age}
          </p>
          <p>
            <Building2 size={12} />
            {pet.organization}
          </p>
          <hr />
          <small>
            O envio deste formulário inicia o processo oficial de adoção
            responsável no PetHub.
          </small>
        </aside>
        <section className={`${s.card} ${s.formPanel}`}>
          {done ? (
            <div role="status">
              <h2>Solicitação enviada!</h2>
              <p>
                Sua solicitação de adoção de {pet.name} foi salva neste
                navegador. Acompanhe pelo card “Minhas adoções” na página
                inicial.
              </p>
              <p className={s.muted}>
                Demonstração: nenhum dado foi enviado a uma organização.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h2>
                {step === 1
                  ? "Dados Pessoais"
                  : step === 2
                    ? "Questionário de Habitação e Rotina"
                    : "Termo de Adoção Responsável"}
              </h2>
              {step === 1 && (
                <div className={s.formGrid}>
                  {field("name", "Nome completo")}
                  {field("email", "E-mail")}
                  {field("phone", "Telefone")}
                  {field("address", "Endereço completo")}
                </div>
              )}
              {step === 2 && (
                <>
                  <div className={s.formGrid}>
                    {field("home", "Tipo de Residência", [
                      "Casa",
                      "Apartamento",
                      "Outro",
                    ])}
                    {field("yard", "Possui Quintal Cercado?", [
                      "Sim, espaço seguro",
                      "Não",
                      "Não se aplica",
                    ])}
                    {field("otherPets", "Possui outros animais atualmente?", [
                      "Não",
                      "Sim, 1 cachorro",
                      "Sim, 1 gato",
                      "Sim, mais de um animal",
                    ])}
                    {field("residents", "Número de moradores na residência", [
                      "1 pessoa",
                      "2 pessoas",
                      "3 pessoas",
                      "4 ou mais pessoas",
                    ])}
                  </div>
                  <label>
                    Por que você deseja adotar o {pet.name}?
                    <Textarea
                      required
                      minLength={20}
                      value={values.reason}
                      onChange={(e) =>
                        setValues({ ...values, reason: e.target.value })
                      }
                      placeholder="Conte sobre sua rotina e como pretende cuidar do animal."
                    />
                  </label>
                  <div className={s.visitRow}>
                    <strong>
                      Disponibilidade para receber visita pré-adoção da ONG?
                    </strong>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={visits}
                      aria-label="Disponível para visita pré-adoção"
                      className={`${s.switch} ${visits ? s.switchOn : ""}`}
                      onClick={() => setVisits(!visits)}
                    >
                      <span />
                    </button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div className={s.term}>
                    <p>
                      Eu, <strong>{values.name}</strong>, solicito a adoção de{" "}
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
                  </div>
                  <label className={s.checkbox}>
                    <input type="checkbox" required />
                    Li e concordo com os compromissos de adoção responsável.
                  </label>
                  {field(
                    "signature",
                    "Digite seu nome completo para confirmar",
                  )}
                </>
              )}
              {error && (
                <p role="alert" className={s.error}>
                  {error}
                </p>
              )}
              <div className={s.formActions}>
                {step > 1 ? (
                  <button
                    type="button"
                    className={s.outline}
                    onClick={() => setStep(step - 1)}
                  >
                    Voltar
                  </button>
                ) : (
                  <span />
                )}
                <button className={s.primary} type="submit">
                  {step === 3 ? "Enviar solicitação" : "Próximo Passo"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </>
  );
}
