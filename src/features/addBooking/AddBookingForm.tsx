import React from "react";

export const AddBookingForm = () => {
  return (
    <>
      <form>
        <div className="flex flex-col space-y-4">
          <input type="text" placeholder="Title" />
          <input type="text" placeholder="Description" />
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Phone" />
          <input type="datetime-local" placeholder="Start Date" />
          <input type="datetime-local" placeholder="End Date" />
        </div>
      </form>
      {/* <ContactFormSuccessModal isOpen={isOpen} onClose={onClose} /> */}
    </>
  );
};
