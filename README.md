# Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

I moved the API call to get all the bookings into a custom hook that returns a loading state, error state and the returned data. I decided to use ```axios``` to perform the get request rather then the regular ```fetch``` request as axios has built in cross browser compatibility as well as it's easy to use.

## View Booking Detail

I decided to display the booking details within a modal rather then a new route because the data coming back from the API was minimal and would fit easily within a modal. This way the user can stay on the calendar page and easily access more booking data without having to flip back and fourth between different routes constantly.

## Add a Booking

For the add a booking form I created a form while managing the form state within a custom hook. Regularly I prefer to use ```react-hook-forms``` for form management, but in this case since this site is so small I decided to manage the form state myself. This form hook manages the submission functionality as well as form values themselves and the onSuccess function is passed to the hook as a prop and called on success of the axios post request. Besides the form values and onSubmit function (which is passed to the <form> element), this custom hook also returns the yup validation errors, form submission error, onChange function and a loading state.

I created multiple reusable classes for this page including for the submit button, custom errors as well as the inputs themselves. I also created a reusable error text component that takes the errors from the form hook and returns a paragraph element with the error text returned from the yup validation. That way this component can be easily reused once it's passed the form errors object and the name of the input it should be watching for.

I also used ```yup``` validation to validate the form fields as it's the library I'm most familiar with if I'm honest, though I've also used ```zod``` in the past too. I made sure to validate that the selected start date is earlier then the selected end date as well as using regex to validate the phone number is a valid phone number.

For aesthetics I opted to visually hide most of the form labels though they are still accessible to screen readers.

In terms of submission, I disabled the submit button when the form loading state is set to ```true``` in order to eliminate the possibily of bugs when double submitting the form. As well as the submit button will show a loading spinner to make it clear to the user that the form is loading.

## Tech Used

I decided to use ```typescript``` in order to make an application that's more readable and maintainable over time as well as making it easier to debug errors. I also decided to build within the framework ```NextJS``` as it works seamlessly with typescript, it's simple to customize different configurations (e.g. eslintrc) as well as the routing is simpler. The different performance enhancing features that NextJs offers makes for a more performant framework as well.