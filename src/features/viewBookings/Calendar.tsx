import React, { useState } from "react";
import {
  getDaysInMonth,
  getDay,
  startOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { BookingCondensed, CalendarDateSquare } from "./CalendarDateSquare";
import { useGetBookingData } from "./useGetBookingData";
import { useCalendarContext } from "./CalendarContext";
import { BookingDetailsModal } from "./BookingDetailsModal";
import { calendarColors, weekdayLabels } from "./constants";
import { useModal } from "@/shared/components/Modal";
import { PageLoadingSpinner } from "@/shared/components";

export const Calendar = () => {
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const { data, error, isLoading } = useGetBookingData();
  const { activeDate } = useCalendarContext();
  const { closeModal, modalOverlayRef, openModal } = useModal();
  const firstWeekdayOfMonth = getDay(startOfMonth(activeDate));
  const noOfDays = getDaysInMonth(activeDate);
  const monthArray = Array.from({ length: noOfDays }, (_, index) => index + 1);
  const leadingDays = Array.from(
    { length: firstWeekdayOfMonth },
    (_, index) => index + 1,
  );

  const condensedData: BookingCondensed[] | undefined = data?.map((d, i) => {
    const colorIndex = i % calendarColors.length;
    const color = calendarColors[colorIndex];

    return {
      id: d._id,
      name: d.name,
      color,
      bookedDays: eachDayOfInterval({
        start: new Date(d.startDateTime),
        end: new Date(d.endDateTime),
      }).map(bookedDate => {
        if (isSameDay(bookedDate, new Date(d.startDateTime))) {
          return new Date(d.startDateTime);
        }
        if (isSameDay(bookedDate, new Date(d.endDateTime))) {
          return new Date(d.endDateTime);
        }
        return bookedDate;
      }),
    };
  });

  const handleModalClose = () => {
    closeModal();
    setSelectedBookingId("");
  };

  const handleOpenBookingDetails = (id: string) => {
    setSelectedBookingId(id);
    openModal();
  };

  if (error) {
    // TODO: create error component
    throw new Error(error);
  }

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  return (
    <>
      <div className="grid min-w-max grid-cols-7 gap-1 overflow-auto pr-6 lg:pr-0">
        {/* Calendar labels: */}
        {weekdayLabels.map(w => (
          <div key={w} className="text-center text-slate-700">
            {w}
          </div>
        ))}
        {/* Empty divs to have dates match weekday columns: */}
        {leadingDays.map(e => (
          <div key={e} />
        ))}
        {/* Dates: */}
        {monthArray.map(day => {
          const currentDate = new Date(
            `${activeDate.getFullYear()}-${activeDate.getMonth() + 1}-${day}`,
          );
          const activeBookings = condensedData?.filter(item =>
            item.bookedDays.some(d => isSameDay(d, currentDate)),
          );
          return (
            <CalendarDateSquare
              key={day}
              day={day}
              activeBookings={activeBookings}
              onOpenBookingDetails={handleOpenBookingDetails}
            />
          );
        })}
      </div>
      <BookingDetailsModal
        onModalClose={handleModalClose}
        modalOverlayRef={modalOverlayRef}
        bookingId={selectedBookingId}
      />
    </>
  );
};
