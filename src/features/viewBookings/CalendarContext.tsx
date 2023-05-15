"use client";
import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useMemo,
  useCallback,
} from "react";

export type CalendarContextValues = {
  activeDate: Date;
  updateActiveDate: (newDate: Date) => void;
};

const CalendarContext = createContext<CalendarContextValues | null>(null);

type GalleryProviderProps = PropsWithChildren;

export const CalendarContextProvider = ({ children }: GalleryProviderProps) => {
  const [activeDate, setActiveDate] = useState(new Date());

  const updateActiveDate = useCallback((newDate: Date) => {
    setActiveDate(newDate);
  }, []);

  const contextValue: CalendarContextValues = useMemo(
    () => ({
      activeDate,
      updateActiveDate,
    }),
    [activeDate, updateActiveDate],
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const calendarContext = useContext(CalendarContext);
  if (calendarContext === null) {
    throw new Error(
      "useCalendarContext must be used within a CalendarContextProvider",
    );
  }

  return calendarContext;
};
