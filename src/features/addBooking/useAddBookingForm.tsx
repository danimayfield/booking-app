import React, { FormEvent, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Errors } from "@/shared/components";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email address is required"),
  description: yup.string().required("Description is required"),
  startDateTime: yup
    .string()
    .required("Please choose a start date")
    .test(
      "startDateTime",
      "Start date must be before end date",
      function (value) {
        const { endDateTime } = this.parent;
        if (!value || !endDateTime) {
          // Allow empty values to be handled by the required() validation
          return true;
        }
        return new Date(value) < new Date(endDateTime);
      },
    ),
  endDateTime: yup
    .string()
    .required("Please choose an end date")
    .test("endDateTime", "End date must be after start date", function (value) {
      const { startDateTime } = this.parent;
      if (!value || !startDateTime) {
        // Allow empty values to be handled by the required() validation
        return true;
      }
      return new Date(value) > new Date(startDateTime);
    }),
});

export interface AddBookingFormValues {
  name: string;
  title: string;
  phone: string;
  email: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
}

export type AddBookingFormOnChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

export const useAddBookingForm = (
  onSuccess?: (data: AddBookingFormValues) => void,
) => {
  const defaultFormValues: AddBookingFormValues = {
    name: "",
    title: "",
    phone: "",
    email: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
  };

  const [formValues, setFormValues] =
    useState<AddBookingFormValues>(defaultFormValues);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const resetData = () => {
    setFormValues(defaultFormValues);
    setErrors({});
    setFormError(undefined);
  };

  const onChange: AddBookingFormOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    schema
      .validate(formValues, { abortEarly: false })
      .then(data => {
        axios
          .post("https://ttc-bookings-api.booker.tech/bookings", {
            ...data,
            startDateTime: new Date(data.startDateTime).toISOString(),
            endDateTime: new Date(data.endDateTime).toISOString(),
          })
          .then(response => {
            if (response.status === 200) {
              resetData();
              onSuccess?.(data);
            } else {
              throw new Error("Failed to add booking");
            }
          })
          .catch(error => {
            setFormError(
              `There has been an error in processing your request: ${error}. Please try again later.`,
            );
          })
          .finally(() => setIsLoading(false));
      })
      .catch((validationErrors: yup.ValidationError) => {
        setIsLoading(false);
        const newErrors: Errors = {};
        validationErrors.inner.forEach(error => {
          if (error.path && !newErrors[error.path]) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      });
  };

  return { onSubmit, onChange, errors, formError, formValues, isLoading };
};
