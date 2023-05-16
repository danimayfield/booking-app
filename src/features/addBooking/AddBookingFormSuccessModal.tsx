import React, { RefObject } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "@/shared/components/Modal";
import { formatDate } from "@/shared/utils/formatters";

type AddBookingFormSuccessModalProps = {
  modalOverlayRef: RefObject<HTMLDivElement>;
  onModalClose: () => void;
  startDateTime: string;
  endDateTime: string;
  title: string;
  name: string;
};

export const AddBookingFormSuccessModal = ({
  modalOverlayRef,
  onModalClose,
  startDateTime,
  endDateTime,
  title,
  name,
}: AddBookingFormSuccessModalProps) => {
  const isModalOpen =
    modalOverlayRef?.current?.style.opacity &&
    modalOverlayRef.current.style.opacity === "1";
  return (
    <Modal modalOverlayRef={modalOverlayRef} onModalClose={onModalClose}>
      <div className="flex w-full flex-col content-center items-center justify-center px-4 py-12 sm:w-96">
        <p className="heading-lg w-full text-center">Booking Complete!</p>
        <div className="my-8">
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                animate={{ scale: 1.2 }}
                transition={{
                  duration: 0.3,
                  ease: "backInOut",
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 200,
                    restDelta: 0.001,
                  },
                }}
              >
                <BsCheckCircleFill
                  style={{ width: "10rem", height: "10rem" }}
                  className="text-teal-500"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-full space-y-2 text-center">
          <p>
            <span className="font-semibold">{name}</span>
            &apos;s booking for <span className="font-semibold">{title}</span>
            &nbsp;has been booked for:
          </p>
          <p>
            Start:&nbsp;
            <span className="font-semibold">{formatDate(startDateTime)}</span>
          </p>
          <p>
            End:&nbsp;
            <span className="font-semibold">{formatDate(endDateTime)}</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};
