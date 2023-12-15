import React, { useState } from 'react';

const BookingComponent = ({ onSchedule }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSchedule = () => {
    if (name && date) {
      onSchedule({ name, date });
    }
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleSchedule}>Schedule Event</button>
    </div>
  );
};

export default BookingComponent;