// DonateForm.jsx
import React from 'react';
import DynamicForm from 'components/form/DynamicForm'; // Adjust the path accordingly

const donationSchema = [
  { type: 'text', variable: 'donorName', label: 'Your Name' },
  { type: 'email', variable: 'donorEmail', label: 'Your Email' },
  { type: 'number', variable: 'amount', label: 'Donation Amount' },
  { type: 'select', variable: 'paymentMethod', label: 'Payment Method', options: ['Credit Card', 'PayPal'] },
];

const DonateForm = ({ callbackFunction, data, title }) => {
  return (
    <DynamicForm
      schema={donationSchema}
      callbackFunction={callbackFunction}
      data={data}
      title={title || 'Donation Form'}
    />
  );
};

export default DonateForm;
