import React from "react";

export type BookingCondensed = {
  id: string;
  name: string;
  bookedDays: Date[];
  color: string;
};

type CalendarDateSquareProps = {
  day: number;
  activeBookings?: BookingCondensed[];
  onOpenBookingDetails: (id: string) => void;
};

function sortBookingsByDate(
  bookings: BookingCondensed[] | undefined,
): BookingCondensed[] | undefined {
  return bookings?.sort((a, b) => {
    const earliestDateA = Math.min(...a.bookedDays.map(date => date.getTime()));
    const earliestDateB = Math.min(...b.bookedDays.map(date => date.getTime()));
    return earliestDateA - earliestDateB;
  });
}

const BookingBannerButton = ({
  booking,
  onClick,
}: {
  booking: BookingCondensed;
  onClick: () => void;
}) => {
  const { name, color } = booking;
  return (
    <button
      className="block w-full px-3 text-left text-sm lg:text-base"
      style={{ backgroundColor: color }}
      aria-label="Click for more information on this booking"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export const CalendarDateSquare = ({
  day,
  activeBookings,
  onOpenBookingDetails,
}: CalendarDateSquareProps) => {
  const sortedBookings = sortBookingsByDate(activeBookings);
  return (
    <div
      className={`h-40 space-y-1 overflow-auto border border-solid border-gray-300 py-3`}
    >
      <p className="px-3 text-sm text-slate-500">{day}</p>
      {sortedBookings &&
        sortedBookings.map(b => (
          <BookingBannerButton
            key={b.id}
            booking={b}
            onClick={() => onOpenBookingDetails(b.id)}
          />
        ))}
    </div>
  );
};
