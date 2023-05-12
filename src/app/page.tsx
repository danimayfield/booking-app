'use client';
import { Container } from '@/shared/components';
import routes from '@/shared/routes';

export default function Home() {
  return (
    <Container>
      <div className="min-h-[100vh]">
        <h2 className="w-full text-center text-6xl">Welcome to TTC Booking!</h2>
        <h3 className="mt-4 w-full text-center text-4xl">
          Where would you like to go?
        </h3>
        <div className="mx-auto my-16 grid max-w-screen-lg grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex h-full w-full items-center justify-center">
            <a
              href={routes.viewBookings}
              className="h-52 w-52 rounded-lg border-2 border-solid border-slate-300 text-slate-500 transition-all hover:bg-slate-300 hover:text-white"
            >
              <p>hello</p>
            </a>
          </div>
          <div className="flex h-full w-full items-center justify-center">
            <a
              href={routes.viewBookings}
              className="h-52 w-52 rounded-lg border-2 border-solid border-slate-300 text-slate-500 transition-all hover:bg-slate-300 hover:text-white"
            >
              <p>hello</p>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
