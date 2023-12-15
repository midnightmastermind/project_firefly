import React from 'react';

const EventComponent = ({ event, isScheduled, onSchedule }) => {
  const handleSchedule = () => {
    onSchedule(event.id);
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
      <h3>{event.name}</h3>
      <p>Date: {event.date}</p>
      {!isScheduled ? (
        <button onClick={handleSchedule}>Schedule Now</button>
      ) : (
        <p>Scheduled</p>
      )}
    </div>
  );
};

export default EventComponent;