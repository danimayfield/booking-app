"use client";
import React from "react";
import { PageContainer } from "@/shared/components";
import { AddBookingForm } from "@/features/addBooking";

export default function AddBooking() {
  return (
    <PageContainer className="pb-12">
      <div className="mb-12">
        <h1 className="heading-xl w-full text-center text-slate-700">
          Add Booking
        </h1>
      </div>
      <AddBookingForm />
    </PageContainer>
  );
}
