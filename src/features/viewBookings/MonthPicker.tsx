import React from "react";
import { add, startOfMonth, sub } from "date-fns";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useCalendarContext } from "./CalendarContext";
import { DATE_PATTERN_MONTH, formatDate } from "@/shared/utils/formatters";

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
    <div className="mb-10 flex w-full items-center justify-between">
      <div className="flex text-slate-600">
        <button
          aria-label="Previous month"
          onClick={() => handleChangeMonth(prevMonthDate)}
        >
          <BsChevronLeft style={{ width: "2rem", height: "2rem" }} />
        </button>
      </div>
      <div>
        <p className="mb-1 text-center text-lg">{activeDate.getFullYear()}</p>
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
                label={formatDate(
                  new Date(`${currentYear}-${m}-1`),
                  DATE_PATTERN_MONTH,
                )}
              />
            ))}
          </select>
        </div>
      </div>
      <div className="flex text-slate-600">
        <button
          aria-label="Next month"
          onClick={() => handleChangeMonth(nextMonthDate)}
        >
          <BsChevronRight style={{ width: "2rem", height: "2rem" }} />
        </button>
      </div>
    </div>
  );
};
