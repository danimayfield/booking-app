import { PropsWithChildren, RefObject, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type ModalProps = PropsWithChildren & {
  modalOverlayRef: RefObject<HTMLDivElement>;
  onModalClose: () => void;
  modalProps?: string;
};

export const Modal = ({
  modalOverlayRef,
  onModalClose,
  modalProps,
  children,
}: ModalProps) => {
  /** Close modal if escape key is pressed */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onModalClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onModalClose]);

  const isModalOpen =
    modalOverlayRef?.current?.style.opacity &&
    modalOverlayRef.current.style.opacity === "1";

  return (
    <div
      ref={modalOverlayRef}
      onClick={onModalClose}
      onKeyDown={e => {
        if (e.key === "Escape" || e.key === "Enter") {
          onModalClose();
        }
      }}
      role="button"
      aria-label="Exit modal"
      tabIndex={0}
      className={twMerge(
        `backdrop-blur-xs fixed left-0 top-0 z-30 flex h-full w-0 items-center overflow-x-hidden bg-slate-900/[.7] opacity-0 transition-opacity duration-500 ${modalProps}`,
      )}
    >
      <div
        className="relative flex max-h-fit w-full content-center justify-center"
        aria-expanded={!!isModalOpen}
      >
        <div
          className="relative max-h-[60vh] max-w-3xl overflow-auto rounded-sm bg-slate-50 px-4 py-5 sm:px-16"
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
          role="button"
          tabIndex={0}
        >
          <button
            onClick={onModalClose}
            className="absolute right-5 top-2 z-20 text-4xl font-extralight text-slate-700"
            aria-label="Exit modal"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};
