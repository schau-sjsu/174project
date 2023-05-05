import React, { useState, useEffect } from 'react';
import ReactModal from "react-modal";

const CreateEventModal = ({ isOpen, onClose, date }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new event with the selected date and title
    const newEvent = {
      title,
      start: date,
    };

    // Add the new event to the events array
    // setEvents((prevEvents) => [...prevEvents, newEvent]);

    // Close the modal
    onClose();
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <button type="submit">Create Event</button>
      </form>
    </ReactModal>
  );
};

export default CreateEventModal;