import React, { useMemo } from "react";
import {
  AddBookingFormOnChange,
  AddBookingFormValues,
} from "./useAddBookingForm";
import { CustomErrorMessage, Errors } from "@/shared/components";
import {
  DATE_PATTERN_DATE_TIME_FIELD,
  formatDate,
} from "@/shared/utils/formatters";

type AddBookingFormFieldsProps = {
  onChange: AddBookingFormOnChange;
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
    ],
    [email, name, phone, title],
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
      <div>
        <label htmlFor="startDateTime" className="sr-only">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={onChange}
          className="input input--primary w-full"
        />
        <CustomErrorMessage name="description" errors={errors} />
      </div>
      <div className="flex w-full flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="md:mr-3">
          <label htmlFor="startDateTime" className="text-slate-800">
            Start Date:
          </label>
          <input
            type="datetime-local"
            id="startDateTime"
            name="startDateTime"
            placeholder="Start Date"
            value={formatDate(startDateTime, DATE_PATTERN_DATE_TIME_FIELD)}
            onChange={onChange}
            className="input input--primary mt-1 w-full"
          />
          <CustomErrorMessage
            name="startDateTime"
            errors={errors}
            className="mt-1"
          />
        </div>
        <div className="md:ml-3">
          <label htmlFor="endDateTime" className="text-slate-800">
            End Date:
          </label>
          <input
            type="datetime-local"
            id="endDateTime"
            name="endDateTime"
            placeholder="End Date"
            value={formatDate(endDateTime, DATE_PATTERN_DATE_TIME_FIELD)}
            onChange={onChange}
            className="input input--primary mt-1 w-full"
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
