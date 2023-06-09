import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export interface Booking {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  email: string;
  endDateTime: string;
  name: string;
  phone: string;
  startDateTime: string;
  updatedAt: string;
}

export const useGetBookingData = () => {
  const [data, setData] = useState<Booking[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Booking[]> = await axios.get<Booking[]>(
          "https://ttc-bookings-api.booker.tech/bookings",
        );
        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        setError(`Error fetching booking data: ${e}`);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
