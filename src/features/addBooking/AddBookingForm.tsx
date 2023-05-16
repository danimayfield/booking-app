import React from "react";
import { useAddBookingForm } from "./useAddBookingForm";
import { AddBookingFormFields } from "./AddBookingFormFields";
import { PageContainer } from "@/shared/components";

export const AddBookingForm = () => {
  const handleSuccess = () => console.log("done");

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
      {/* <ContactFormSuccessModal isOpen={isOpen} onClose={onClose} /> */}
    </>
  );
};
