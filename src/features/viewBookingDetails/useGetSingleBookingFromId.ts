import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Booking } from "../viewBookings";

export const useGetSingleBookingFromId = (bookingId: string) => {
  const [data, setData] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Booking> = await axios.get<Booking>(
          `https://ttc-bookings-api.booker.tech/bookings/${bookingId}`,
        );
        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        setError(`Error fetching booking data: ${e}`);
      }
    };

    fetchData();
  }, [bookingId]);

  return { data, isLoading, error };
};
