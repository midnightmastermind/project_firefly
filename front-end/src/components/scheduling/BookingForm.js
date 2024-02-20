import React from 'react';
import DynamicForm from 'components/form/Form'; // Adjust the path accordingly

const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys'];

const productSchema = [
  { type: 'text', variable: 'productName', label: 'Booking Name' },
  { type: 'textarea', variable: 'description', label: 'Description' },
  { type: 'select', variable: 'category', label: 'Category', options: categories },
  { type: 'number', variable: 'price', label: 'Price' },
];

const BookingForm = ({ callbackFunction, data, title }) => {
  return (
    <DynamicForm
      schema={productSchema}
      callbackFunction={callbackFunction}
      data={data}
      title={title || 'Booking Form'}
    />
  );
};

export default BookingForm;