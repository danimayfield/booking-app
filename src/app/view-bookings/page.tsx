"use client";
import React from "react";
import { Calendar, CalendarContextProvider } from "@/features/viewBookings";

import { PageContainer } from "@/shared/components";

export default function ViewBookings() {
  return (
    <PageContainer>
      <CalendarContextProvider>
        <Calendar />
      </CalendarContextProvider>
    </PageContainer>
  );
}
