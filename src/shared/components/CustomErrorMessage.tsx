import React from "react";
import { twMerge } from "tailwind-merge";

export type Errors = { [key: string]: string };

type CustomErrorMessageProps = {
  /** Name of field in error stack. */
  name: string;
  errors: Errors | undefined;
  className?: string;
};

export const CustomErrorMessage = ({
  name,
  errors,
  className,
}: CustomErrorMessageProps) => {
  const errorMessage = errors?.[name];

  if (!errorMessage) {
    return null;
  }

  return (
    <p aria-live="polite" className={twMerge(`error ${className}`)}>
      {errorMessage}
    </p>
  );
};
