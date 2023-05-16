import React, { useState } from "react";
import {
  AddBookingFormValues,
  defaultBookingFormValues,
  useAddBookingForm,
} from "./useAddBookingForm";
import { AddBookingFormFields } from "./AddBookingFormFields";
import { AddBookingFormSuccessModal } from "./AddBookingFormSuccessModal";
import { PageContainer } from "@/shared/components";
import { useModal } from "@/shared/components/Modal";

export const AddBookingForm = () => {
  const [completedFormValues, setCompletedFormValues] =
    useState<AddBookingFormValues>(defaultBookingFormValues);
  const { closeModal, modalOverlayRef, openModal } = useModal();

  const handleSuccess = (data: AddBookingFormValues) => {
    setCompletedFormValues(data);
    openModal();
  };

  const { onSubmit, formError, isLoading, errors, formValues, onChange } =
    useAddBookingForm(handleSuccess);

  return (
    <>
      <PageContainer className="max-w-screen-lg">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col space-y-4">
            <AddBookingFormFields
              errors={errors}
              formValues={formValues}
              onChange={onChange}
            />
            {formError && <p className="error">{formError}</p>}
            <div>
              <button
                type="submit"
                className="btn--primary btn disabled:bg-gray-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner spinner--small mx-6" />
                ) : (
                  "Complete"
                )}
              </button>
            </div>
          </div>
        </form>
      </PageContainer>
      <AddBookingFormSuccessModal
        modalOverlayRef={modalOverlayRef}
        onModalClose={closeModal}
        startDateTime={completedFormValues.startDateTime}
        endDateTime={completedFormValues.endDateTime}
        title={completedFormValues.title}
        name={completedFormValues.name}
      />
    </>
  );
};
