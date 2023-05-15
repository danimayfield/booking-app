import { useRef } from "react";

export function useModal() {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const openModal = () => {
    if (modalOverlayRef.current) {
      modalOverlayRef.current.style.opacity = "1";
      modalOverlayRef.current.style.width = "100%";
    }
  };

  const closeModal = () => {
    if (modalOverlayRef.current) {
      modalOverlayRef.current.style.opacity = "0";
      modalOverlayRef.current.style.width = "0%";
    }
  };

  return {
    modalOverlayRef,
    openModal,
    closeModal,
  };
}
