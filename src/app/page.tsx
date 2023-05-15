"use client";
import { BsCalendarPlus, BsCalendarWeek } from "react-icons/bs";
import { PageContainer } from "@/shared/components";
import routes from "@/shared/routes";

export default function Home() {
  return (
    <PageContainer className="flex h-[80vh] items-center justify-center">
      <div>
        <h2 className="heading-xl w-full text-center text-slate-700">
          Welcome!
        </h2>
        <h3 className="heading-lg mt-4 w-full text-center text-slate-600">
          Where would you like to go?
        </h3>
        <div className="mx-auto my-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex h-full w-full items-center justify-center">
            <a
              href={routes.viewBookings}
              className="flex h-52 w-52 flex-col items-center justify-center space-y-4 rounded-lg border-2 border-solid border-slate-300 p-6 text-slate-500 transition-all hover:border-slate-200 hover:bg-slate-300 hover:text-white"
            >
              <p>View Bookings</p>
              <BsCalendarWeek size="4rem" />
            </a>
          </div>
          <div className="flex h-full w-full items-center justify-center">
            <a
              href={routes.addBooking}
              className="flex h-52 w-52 flex-col items-center justify-center space-y-4 rounded-lg border-2 border-solid border-slate-300 p-6 text-slate-500 transition-all hover:border-slate-200 hover:bg-slate-300 hover:text-white"
            >
              <p>Add a Booking</p>
              <BsCalendarPlus size="4rem" />
            </a>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
