import React from "react";
import { getDaysInMonth, getDay, startOfMonth } from "date-fns";
import { useGetBookingData } from "./useGetBookingData";
import { useCalendarContext } from "./CalendarContext";

export const Calendar = () => {
  const { data, error, isLoading } = useGetBookingData();
  const { activeDate } = useCalendarContext();

  const weekdayLabels = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const firstWeekdayOfMonth = getDay(startOfMonth(activeDate));
  const noOfDays = getDaysInMonth(activeDate);
  const monthArray = Array.from({ length: noOfDays }, (_, index) => index + 1);

  return (
    <div className="grid min-w-min grid-cols-7 gap-1 overflow-auto">
      {weekdayLabels.map(w => (
        <div key={w}>{w}</div>
      ))}
      {monthArray.map((day, i) => (
        <div
          key={day}
          className={`border border-solid border-gray-300 p-3 ${
            i === 0 ? `col-start-${firstWeekdayOfMonth + 1}` : ""
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};
