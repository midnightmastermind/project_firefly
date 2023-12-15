import React from 'react';
import DynamicForm from './DynamicForm'; // Adjust the path accordingly

const getShippingFormSchema = () => [
  {
    type: 'header',
    label: 'Shipping Information',
    headerOption: 'h2',
  },
  { type: 'text', variable: 'shippingName', label: 'Full Name' },
  { type: 'text', variable: 'shippingAddress', label: 'Address' },
  { type: 'text', variable: 'shippingCity', label: 'City' },
  { type: 'text', variable: 'shippingZip', label: 'ZIP Code' },
  { type: 'select', variable: 'shippingCountry', label: 'Country', options: ['USA', 'Canada', 'Other'] },
];

const ShippingForm = ({ onSubmit }) => {
  const handleShippingSubmit = (formData) => {
    // You can perform any additional logic or validation here before submitting
    onSubmit(formData);
  };

  return (
    <DynamicForm
      schema={getShippingFormSchema()}
      callbackFunction={handleShippingSubmit}
      title="Shipping Form"
    />
  );
};

export default ShippingForm;
