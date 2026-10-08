"use client";

import { Building2, X } from "lucide-react";

import TopBar from "@/components/layout/TopBar";
import { useUserPortal } from "@/features/user/useUserPortal";

import { CloseButton, Dialog, DialogTitle, Main, Page } from "../styles";
import {
  Application,
  ApplicationBody,
  Applications,
  ApplicationTop,
  Badge,
  DetailsButton,
  DialogText,
  Description,
  EmptyState,
  FilterButton,
  Filters,
  Footer,
  Heading,
  Organization,
  PetSpace,
} from "./styles";

type Tone = "analysis" | "completed" | "pending" | "approved";

const FILTERS = ["Todas", "Em Análise", "Pendentes", "Aprovadas"];

export default function ApplicationsPage() {
  const {
    filter,
    setFilter,
    selected,
    setSelected,
    visible,
    dialogRef,
    closeModal,
  } = useUserPortal();

  return (
    <Page>
      <TopBar />

      <Main>
        <Heading>
          <div>
            <h1>Minhas Solicitações de Adoção</h1>
            <p>Acompanhe o andamento dos seus processos de adoção</p>
          </div>

          <Filters role="group" aria-label="Filtrar solicitações">
            {FILTERS.map((label) => (
              <FilterButton
                key={label}
                type="button"
                active={filter === label}
                aria-pressed={filter === label}
                onClick={() => setFilter(label)}
              >
                {label}
              </FilterButton>
            ))}
          </Filters>
        </Heading>

        <Applications>
          {visible.length === 0 && (
            <EmptyState role="status">
              Nenhuma solicitação nesta categoria.
            </EmptyState>
          )}

          {visible.map((item, index) => (
            <Application as="article" key={`${item.name}-${index}`}>
              <PetSpace aria-hidden />

              <ApplicationBody>
                <ApplicationTop>
                  <h2>{item.name}</h2>
                  <Badge tone={item.tone as Tone}>{item.status}</Badge>
                </ApplicationTop>

                <Description>{item.description}</Description>

                <Organization>
                  <Building2 size={13} aria-hidden />
                  {item.organization}
                </Organization>

                <Footer>
                  <small>Solicitado em {item.date}</small>
                  <DetailsButton
                    variant="primary"
                    type="button"
                    onClick={() => setSelected(item)}
                  >
                    Ver Detalhes
                  </DetailsButton>
                </Footer>
              </ApplicationBody>
            </Application>
          ))}
        </Applications>
      </Main>

      <Dialog
        ref={dialogRef}
        aria-labelledby="application-details-title"
        onCancel={closeModal}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}
      >
        <CloseButton type="button" onClick={closeModal} aria-label="Fechar">
          <X size={20} aria-hidden />
        </CloseButton>

        {selected && (
          <>
            <DialogTitle id="application-details-title">
              Adoção de {selected.name}
            </DialogTitle>
            <DialogText>{selected.organization}</DialogText>
            <DialogText>{selected.description}</DialogText>
            <DialogText>
              Status: <strong>{selected.status}</strong>
            </DialogText>
            <DialogText>Solicitado em {selected.date}</DialogText>
            <DialogText>
              O acompanhamento será atualizado pela organização responsável.
            </DialogText>
          </>
        )}
      </Dialog>
    </Page>
  );
}
