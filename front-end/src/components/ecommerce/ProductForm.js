import React from 'react';
import DynamicForm from 'components/form/Form'; // Adjust the path accordingly

const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys'];

const productSchema = [
  { type: 'text', variable: 'productName', label: 'Product Name' },
  { type: 'textarea', variable: 'description', label: 'Description' },
  { type: 'select', variable: 'category', label: 'Category', options: categories },
  { type: 'number', variable: 'price', label: 'Price' },
  { type: 'file', variable: 'image', label: 'Product Image' },
];

const ProductForm = ({ callbackFunction, data, title }) => {
  return (
    <DynamicForm
      schema={productSchema}
      callbackFunction={callbackFunction}
      data={data}
      title={title || 'Product Form'}
    />
  );
};

export default ProductForm;