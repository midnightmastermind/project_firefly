import React, { useState, useEffect } from 'react';
import DynamicForm from 'components/form/Form'; // Update the path accordingly
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';

const eventFormSchema = [
  { type: 'text', variable: 'title', label: 'Event Title' },
  { type: 'textarea', variable: 'description', label: 'Event Description' },
  { type: 'datetime-range', variable: 'dateRange', label: 'Event Date/Time', allDayOption: true },
  { type: 'select', variable: 'category', label: 'Event Category', options: ['available', 'tentative', 'busy'] },
  { type: 'text', variable: 'location', label: 'Event Location' },
  { type: 'color', variable: 'eventColor', label: 'Event Color' },
  { type: 'checkbox', variable: 'reminder', label: 'Set Reminder' },
  { type: 'number', variable: 'reminderTime', label: 'Reminder Time (minutes)', min: 1, step: 1 },
];

const EventCreation = ({ selectedEvent, onClose, updateEventInList }) => {
  const [eventData, setEventData] = useState(selectedEvent);

  const handleEventSubmission = (formData) => {
    // Handle the submission of event data (e.g., save to the database, update state, etc.)
    setEventData(formData);
    console.log('Event Data Submitted:', formData);

    // Assuming you have a function to update a specific event in the parent component
    // Pass the updated event to the parent component
    updateEventInList(formData);
  };

  useEffect(() => {
    // Update the form data when the selected event changes
    setEventData(selectedEvent);
  }, [selectedEvent]);

  return (
    <div>
      <h1>{selectedEvent ? 'Edit Event' : 'Create Event'}</h1>
      <DynamicForm
        schema={eventFormSchema}
        callbackFunction={handleEventSubmission}
        data={eventData}
        title=""
      />
    </div>
  );
};

export default EventCreation;
