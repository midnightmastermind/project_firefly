// BillingForm.js
import React, { useEffect, useState } from 'react';
import DynamicForm from 'components/form/Form'; // Adjust the path accordingly

const billingSchema = [
  { type: 'text', variable: 'billingName', label: 'Name' },
  { type: 'text', variable: 'billingAddress', label: 'Address' },
  { type: 'text', variable: 'billingCity', label: 'City' },
  { type: 'text', variable: 'billingState', label: 'State' },
  { type: 'text', variable: 'billingCountry', label: 'Country' },
  { type: 'text', variable: 'billingZip', label: 'ZIP Code' },
];

const BillingForm = ({ callbackFunction, data, title }) => {
  const [billingData, setBillingData] = useState({});

  useEffect(() => {
    if (data) {
      setBillingData(data);
    }
  }, [data]);

  return (
    <DynamicForm
      schema={billingSchema}
      callbackFunction={callbackFunction}
      data={billingData}
      title={''}
    />
  );
};

export default BillingForm;
