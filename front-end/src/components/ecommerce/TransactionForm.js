import React from 'react';
import DynamicForm from './DynamicForm'; // Adjust the path accordingly

const getTransactionFormSchema = () => [
  {
    type: 'header',
    label: 'Billing Information',
    headerOption: 'h2',
  },
  { type: 'text', variable: 'billingName', label: 'Full Name' },
  { type: 'text', variable: 'billingAddress', label: 'Address' },
  { type: 'text', variable: 'billingCity', label: 'City' },
  { type: 'text', variable: 'billingZip', label: 'ZIP Code' },
  { type: 'select', variable: 'billingCountry', label: 'Country', options: ['USA', 'Canada', 'Other'] },
  {
    type: 'header',
    label: 'Payment Information',
    headerOption: 'h2',
  },
  { type: 'text', variable: 'creditCardNumber', label: 'Credit Card Number' },
  { type: 'date', variable: 'expiryDate', label: 'Expiry Date' },
  { type: 'text', variable: 'cvv', label: 'CVV' },
];

const TransactionForm = ({ onSubmit }) => {
  const handleTransactionSubmit = (formData) => {
    // You can perform any additional logic or validation here before submitting
    onSubmit(formData);
  };

  return (
    <DynamicForm
      schema={getTransactionFormSchema()}
      callbackFunction={handleTransactionSubmit}
      title="Transaction Form"
    />
  );
};

export default TransactionForm;
