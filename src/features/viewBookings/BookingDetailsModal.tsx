import type { RefObject } from "react";
import { useGetBookingData } from "./useGetBookingData";
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
  const { data, error, isLoading } = useGetBookingData();
  const booking = data?.find(b => b._id === bookingId);

  if (booking === undefined || error) {
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
          <p className="heading-lg">{booking.title}</p>
          <div className="mt-6 space-y-2">
            <p className="font-semibold">{booking.name}&apos;s Booking</p>
            <p>{booking.description}</p>
            <p>
              Dates:&nbsp;
              {formatDate(booking.startDateTime)}
              &nbsp;-&nbsp;
              {formatDate(booking.endDateTime)}
            </p>
            <p>
              Email:&nbsp;
              <a href={`mailto:${booking.email}`} className="link">
                {booking.email}
              </a>
            </p>
            <p>
              Phone:&nbsp;
              <a href={`tel:${booking.phone}`} className="link">
                {booking.phone}
              </a>
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};
