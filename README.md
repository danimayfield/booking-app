This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Explainations

## Home 

I decided to make a home page because the app felt incomplete without one.

## View Bookings

I decided to create a calendar to capture the bookings, because I thought a calendar might make the most sense to display different bookings. This way the booking managers can easily view what clients have booked their listing on the same days and manage accordingly. I also chose to make my own calendar with the help of the ```date-fns``` library in order to have more control over the styling without having to use a large library.

## View Booking Detail

I decided to display the booking details within a modal rather then a new route because the data coming back from the API was minimal and would fit easily within a modal. This way the user can stay on the calendar page and easily access more booking data without having to flip back and fourth between different routes constantly.