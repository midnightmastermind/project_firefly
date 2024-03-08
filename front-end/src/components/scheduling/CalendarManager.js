import React from 'react';
import Calendar from './Calendar';

const CalendarManager = () => {
  return (
    <div className="calendar-manager" style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
        <div className="calendar-container">
            <Calendar />
        </div>
    </div>
  );
};

export default CalendarManager;