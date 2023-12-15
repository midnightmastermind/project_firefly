import React from 'react';

const TrackingInformationComponent = ({ trackingInfo }) => {
  return (
    <div>
      <h2>Tracking Information</h2>
      <p>Tracking Number: {trackingInfo.trackingNumber}</p>
      <p>Delivery Status: {trackingInfo.deliveryStatus}</p>
      {/* Add more tracking information here */}
    </div>
  );
};

export default TrackingInformationComponent;
