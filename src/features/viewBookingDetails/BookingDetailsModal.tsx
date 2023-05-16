import type { RefObject } from "react";
import { useGetSingleBookingFromId } from "./useGetSingleBookingFromId";
import { PageLoadingSpinner } from "@/shared/components";
import { Modal } from "@/shared/components/Modal";
import { formatDate } from "@/shared/utils/formatters";

type ContactBookingDetailsModalProps = {
  modalOverlayRef: RefObject<HTMLDivElement>;
  onModalClose: () => void;
  bookingId: string;
};

export const BookingDetailsModal = ({
  modalOverlayRef,
  onModalClose,
  bookingId,
}: ContactBookingDetailsModalProps) => {
  const { data, error, isLoading } = useGetSingleBookingFromId(bookingId);

  if (!data || error) {
    return (
      <Modal modalOverlayRef={modalOverlayRef} onModalClose={onModalClose}>
        <div className="w-96 px-4 py-12">
          <p className="heading-lg mb-2">Booking not found...</p>
          <p>Please try again later</p>
          {error && <p className="mt-2">{error}</p>}
        </div>
      </Modal>
    );
  }

  return (
    <Modal modalOverlayRef={modalOverlayRef} onModalClose={onModalClose}>
      {isLoading ? (
        <div className="w-96 px-4 py-12">
          <PageLoadingSpinner />
        </div>
      ) : (
        <div className="flex w-full flex-col content-center items-center justify-center px-4 py-12 sm:w-96">
          <p className="heading-lg">{data.title}</p>
          <div className="mt-6 w-full space-y-2">
            <p className="font-semibold">{data.name}&apos;s Booking</p>
            <p>{data.description}</p>
            {data.startDateTime && data.endDateTime && (
              <div className="space-y-2 pt-2">
                <p>
                  Start:&nbsp;
                  <span className="font-semibold">
                    {formatDate(data.startDateTime)}
                  </span>
                </p>
                <p>
                  End:&nbsp;
                  <span className="font-semibold">
                    {formatDate(data.endDateTime)}
                  </span>
                </p>
              </div>
            )}
            <p>
              Email:&nbsp;
              <a href={`mailto:${data.email}`} className="link">
                {data.email}
              </a>
            </p>
            <p>
              Phone:&nbsp;
              <a href={`tel:${data.phone}`} className="link">
                {data.phone}
              </a>
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};
