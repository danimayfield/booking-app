import React from "react";
import { add, format, startOfMonth, sub } from "date-fns";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useCalendarContext } from "./CalendarContext";

export const MonthPicker = () => {
  const { activeDate, updateActiveDate } = useCalendarContext();

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const currentYear = activeDate.getFullYear();

  const prevMonthDate = startOfMonth(sub(activeDate, { months: 1 }));
  const nextMonthDate = startOfMonth(add(activeDate, { months: 1 }));

  const handleChangeMonth = (newDate: Date) => {
    updateActiveDate(newDate);
  };
  return (
    <div className="mb-6 flex w-full items-center justify-between">
      <div className="flex text-slate-600">
        <button
          aria-label="Previous month"
          onClick={() => handleChangeMonth(prevMonthDate)}
        >
          <BsChevronLeft size="2rem" />
        </button>
      </div>
      <div className="rounded-md bg-slate-300 px-4 py-2">
        <label className="sr-only" htmlFor="month">
          Select month
        </label>
        <select
          id="month"
          className="cursor-pointer bg-slate-300 text-white"
          value={activeDate.getMonth() + 1}
          onChange={e =>
            handleChangeMonth(
              new Date(`${currentYear}-${e.currentTarget.value}-1`),
            )
          }
        >
          {months.map(m => (
            <option
              key={m}
              value={m}
              label={format(new Date(`${currentYear}-${m}-1`), "MMMM")}
            />
          ))}
        </select>
      </div>
      <div className="flex text-slate-600">
        <button
          aria-label="Next month"
          onClick={() => handleChangeMonth(nextMonthDate)}
        >
          <BsChevronRight size="2rem" />
        </button>
      </div>
    </div>
  );
};
