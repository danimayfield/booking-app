"use client";
import React from "react";
import { Calendar, CalendarContextProvider } from "@/features/viewBookings";

import { PageContainer } from "@/shared/components";
import { MonthPicker } from "@/features/viewBookings/MonthPicker";

export default function ViewBookings() {
  return (
    <PageContainer className="pb-12">
      <div className="mb-12">
        <h1 className="heading-xl w-full text-center text-slate-700">
          View Your Bookings
        </h1>
      </div>
      <CalendarContextProvider>
        <MonthPicker />
        <Calendar />
      </CalendarContextProvider>
    </PageContainer>
  );
}
