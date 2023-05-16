import React, { useMemo } from "react";
import { AddBookingFormValues } from "./useAddBookingForm";
import { CustomErrorMessage, Errors } from "@/shared/components";

type AddBookingFormFieldsProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Errors;
  formValues: AddBookingFormValues;
};

export const AddBookingFormFields = ({
  onChange,
  errors,
  formValues,
}: AddBookingFormFieldsProps) => {
  const { description, email, endDateTime, name, phone, startDateTime, title } =
      formValues;

  const textInputs = useMemo(
    () => [
      { label: "Name", name: "name", value: name },
      { label: "Email Address", name: "email", value: email },
      { label: "Phone Number", name: "phone", value: phone },
      { label: "Title", name: "title", value: title },
      { label: "Description", name: "description", value: description },
    ],
    [description, email, name, phone, title],
  );
  return (
    <>
      {textInputs.map(input => (
        <div key={input.name}>
          <label htmlFor={input.name} className="sr-only">
            {input.label}
          </label>
          <input
            type="text"
            id={input.name}
            name={input.name}
            placeholder={input.label}
            value={input.value}
            onChange={onChange}
            className="input input--primary w-full"
          />
          <CustomErrorMessage
            name={input.name}
            errors={errors}
            className="mt-1"
          />
        </div>
      ))}
      <div className="flex w-full justify-between">
        <div>
          <label htmlFor="startDateTime">Start Date:</label>
          <input
            type="datetime-local"
            id="startDateTime"
            name="startDateTime"
            placeholder="Start Date"
            value={startDateTime}
            onChange={onChange}
            className="input input--primary w-full"
          />
          <CustomErrorMessage
            name="startDateTime"
            errors={errors}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="endDateTime">End Date:</label>
          <input
            type="datetime-local"
            id="endDateTime"
            name="endDateTime"
            placeholder="End Date"
            value={endDateTime}
            onChange={onChange}
            className="input input--primary w-full"
          />
          <CustomErrorMessage
            name="endDateTime"
            errors={errors}
            className="mt-1"
          />
        </div>
      </div>
    </>
  );
};
