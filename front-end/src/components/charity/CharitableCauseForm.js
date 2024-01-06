// CharitableCauseForm.jsx
import React from 'react';
import DynamicForm from 'components/form/DynamicForm'; // Adjust the path accordingly

const categories = ['Education', 'Healthcare', 'Environment', 'Community', 'Poverty'];

const charitableCauseSchema = [
  { type: 'text', variable: 'causeName', label: 'Cause Name' },
  { type: 'textarea', variable: 'description', label: 'Description' },
  { type: 'select', variable: 'category', label: 'Category', options: categories },
  { type: 'number', variable: 'goalAmount', label: 'Goal Amount' },
  { type: 'file', variable: 'image', label: 'Cause Image' },
];

const CharitableCauseForm = ({ callbackFunction, data, title }) => {
  return (
    <DynamicForm
      schema={charitableCauseSchema}
      callbackFunction={callbackFunction}
      data={data}
      title={title || 'Charitable Cause Form'}
    />
  );
};

export default CharitableCauseForm;
