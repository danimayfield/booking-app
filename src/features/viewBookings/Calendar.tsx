import React, { useState } from "react";
import {
  getDaysInMonth,
  getDay,
  startOfMonth,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import { BookingCondensed, DayItem } from "./DayItem";
import { useGetBookingData } from "./useGetBookingData";
import { useCalendarContext } from "./CalendarContext";
import { BookingDetailsModal } from "./BookingDetailsModal";
import { PageLoadingSpinner } from "@/shared/components";
import { useModal } from "@/shared/components/Modal";

export const Calendar = () => {
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const { data, error, isLoading } = useGetBookingData();
  const { activeDate } = useCalendarContext();
  const { closeModal, modalOverlayRef, openModal } = useModal();

  const weekdayLabels = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const firstWeekdayOfMonth = getDay(startOfMonth(activeDate));
  const noOfDays = getDaysInMonth(activeDate);
  const monthArray = Array.from({ length: noOfDays }, (_, index) => index + 1);
  const leadingDays = Array.from(
    { length: firstWeekdayOfMonth },
    (_, index) => index + 1,
  );

  const calendarColors = [
    "#fde68a",
    "#d9f99d",
    "#a7f3d0",
    "#99f6e4",
    "#a5f3fc",
    "#e2e8f0",
    "#c7d2fe",
    "#ddd6fe",
    "#f5d0fe",
    "#fecdd3",
    "#e5e7eb",
  ];

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

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  return (
    <>
      <div className="grid min-w-max grid-cols-7 gap-1 overflow-auto pr-6 lg:pr-0">
        {weekdayLabels.map(w => (
          <div key={w} className="text-center text-slate-700">
            {w}
          </div>
        ))}
        {leadingDays.map(e => (
          <div key={e} />
        ))}
        {monthArray.map(day => {
          const currentDate = new Date(
            `${activeDate.getFullYear()}-${activeDate.getMonth() + 1}-${day}`,
          );
          const activeBookings = condensedData?.filter(item =>
            item.bookedDays.some(d => isSameDay(d, currentDate)),
          );
          return (
            <DayItem
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
