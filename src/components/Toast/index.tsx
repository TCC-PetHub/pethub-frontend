"use client";

import { toast as sonnerToast } from "sonner";
import { Check, X, AlertTriangle, Info } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  toastId: string | number;
}

export function CustomToast({
  message,
  type = "success",
  toastId,
}: ToastProps) {
  const isSuccess = type === "success";
  const isError = type === "error";
  const isWarning = type === "warning";

  const iconStyle: React.CSSProperties = isSuccess
    ? {
        backgroundColor: "var(--colors-positiveBackground)",
        borderColor: "var(--colors-positive)",
        color: "var(--colors-positive)",
      }
    : isError
      ? {
          backgroundColor: "var(--colors-negativeBackground)",
          borderColor: "var(--colors-negative)",
          color: "var(--colors-negative)",
        }
      : isWarning
        ? {
            backgroundColor: "var(--colors-inTreatmentBackground)",
            borderColor: "var(--colors-warning)",
            color: "var(--colors-warning)",
          }
        : {
            backgroundColor: "var(--colors-backgroundSecondary)",
            borderColor: "var(--colors-primaryLight)",
            color: "var(--colors-primary)",
          };

  return (
    <div className="custom-toast">
      <div className="toast-icon" style={iconStyle}>
        {isSuccess && <Check size={14} />}
        {isError && <X size={14} />}
        {isWarning && <AlertTriangle size={14} />}
        {!isSuccess && !isError && !isWarning && <Info size={14} />}
      </div>

      <p className="toast-message">{message}</p>

      <button
        type="button"
        onClick={() => sonnerToast.dismiss(toastId)}
        aria-label="Close notification"
        className="toast-close"
      >
        <X size={14} />
      </button>

      <style jsx>{`
        .custom-toast {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 384px;
          padding: 16px;
          border: 1px solid var(--colors-border);
          border-radius: var(--radii-lg);
          background-color: var(--colors-background);
          box-shadow: var(--shadows-lg);
          gap: 12px;
        }

        .toast-icon {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border: 1px solid;
          border-radius: var(--radii-md);
        }

        .toast-message {
          flex: 1;
          padding-right: 8px;
          color: var(--colors-text);
          font-size: var(--fontSizes-sm);
          font-weight: 500;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .toast-close {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border: none;
          background: transparent;
          color: var(--colors-textMuted);
          cursor: pointer;
          transition: color 200ms ease;
        }

        .toast-close:hover {
          color: var(--colors-text);
        }

        .toast-close:focus-visible {
          outline: 2px solid var(--colors-primaryLight);
          outline-offset: 2px;
          border-radius: var(--radii-sm);
        }
      `}</style>
    </div>
  );
}

export const toast = {
  success: (message: string) => {
    sonnerToast.custom((t) => (
      <CustomToast message={message} type="success" toastId={t} />
    ));
  },

  error: (message: string) => {
    sonnerToast.custom((t) => (
      <CustomToast message={message} type="error" toastId={t} />
    ));
  },

  info: (message: string) => {
    sonnerToast.custom((t) => (
      <CustomToast message={message} type="info" toastId={t} />
    ));
  },

  warning: (message: string) => {
    sonnerToast.custom((t) => (
      <CustomToast message={message} type="warning" toastId={t} />
    ));
  },
};
