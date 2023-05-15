"use client";
import React from "react";
import { Calendar, CalendarContextProvider } from "@/features/viewBookings";

import { PageContainer } from "@/shared/components";
import { MonthPicker } from "@/features/viewBookings/MonthPicker";

export default function ViewBookings() {
  return (
    <PageContainer>
      <div className="mb-12">
        <h2 className="w-full text-center text-6xl text-slate-700">
          View Your Bookings
        </h2>
      </div>
      <CalendarContextProvider>
        <MonthPicker />
        <Calendar />
      </CalendarContextProvider>
    </PageContainer>
  );
}
