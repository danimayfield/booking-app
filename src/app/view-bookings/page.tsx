'use client';
import { useGetBookingData } from '@/features/viewBookings';
import { PageContainer } from '@/shared/components';
import React from 'react';

export default function ViewBookings() {
  const { data, error } = useGetBookingData();
  console.log(data, error);
  return <PageContainer>View Bookings</PageContainer>;
}
