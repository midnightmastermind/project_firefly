// ShippingForm.js
import React, { useEffect, useState } from 'react';
import DynamicForm from 'components/form/Form'; // Adjust the path accordingly

const shippingSchema = [
  { type: 'text', variable: 'shippingName', label: 'Name' },
  { type: 'text', variable: 'shippingAddress', label: 'Address' },
  { type: 'text', variable: 'shippingCity', label: 'City' },
  { type: 'text', variable: 'shippingState', label: 'State' },
  { type: 'text', variable: 'shippingCountry', label: 'Country' },
  { type: 'text', variable: 'shippingZip', label: 'ZIP Code' },
];

const ShippingForm = ({ callbackFunction, data, title }) => {
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    if (data) {
      setShippingData(data);
    }
  }, [data]);

  return (
    <DynamicForm
      schema={shippingSchema}
      callbackFunction={callbackFunction}
      data={shippingData}
      title={''}
    />
  );
};

export default ShippingForm;
