import React, { useState } from 'react';
import {
  Card,
  Collapse,
  Button,
  Divider,
  Callout,
  H5,
  HTMLTable,
  Intent,
  H3,
  NonIdealState,
} from '@blueprintjs/core';
import TransactionForm from './TransactionForm'; // Adjust the path accordingly
import ShippingForm from './ShippingForm'; // Adjust the path accordingly

const ProductList = () => {
  // Example product data
  const productList = [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    // Add more products as needed
  ];

  return (
    <Card elevation={2} style={{ marginBottom: '16px' }}>
      <H5>Product List</H5>
      <HTMLTable condensed striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </Card>
  );
};

const TransactionContainer = () => {
  const [isTransactionFormOpen, setTransactionFormOpen] = useState(false);
  const [isShippingFormOpen, setShippingFormOpen] = useState(false);

  const handleTransactionSubmit = (formData) => {
    // Handle transaction form submission logic
    console.log('Transaction Form Data:', formData);
  };

  const handleShippingSubmit = (formData) => {
    // Handle shipping form submission logic
    console.log('Shipping Form Data:', formData);
  };

  return (
    <div>
      <ProductList />

      <Collapse isOpen={isTransactionFormOpen}>
        <Card elevation={2} style={{ marginBottom: '16px' }}>
          <Button
            icon={isTransactionFormOpen ? 'chevron-down' : 'chevron-right'}
            minimal
            onClick={() => setTransactionFormOpen(!isTransactionFormOpen)}
          >
            Transaction Form
          </Button>
          <Divider />
          <TransactionForm onSubmit={handleTransactionSubmit} />
        </Card>
      </Collapse>

      <Collapse isOpen={isShippingFormOpen}>
        <Card elevation={2} style={{ marginBottom: '16px' }}>
          <Button
            icon={isShippingFormOpen ? 'chevron-down' : 'chevron-right'}
            minimal
            onClick={() => setShippingFormOpen(!isShippingFormOpen)}
          >
            Shipping Form
          </Button>
          <Divider />
          <ShippingForm onSubmit={handleShippingSubmit} />
        </Card>
      </Collapse>

      <Card elevation={2} style={{ marginBottom: '16px', padding: '16px' }}>
        <H3>Order Summary</H3>
        {/* Add subtotal, tax, and total information here */}
        <Divider />
        <Callout intent={Intent.SUCCESS}>
          <H5>Subtotal:</H5>
          {/* Add subtotal amount */}
        </Callout>
        <Divider />
        <Callout intent={Intent.WARNING}>
          <H5>Tax:</H5>
          {/* Add tax amount */}
        </Callout>
        <Divider />
        <Callout intent={Intent.PRIMARY}>
          <H5>Total:</H5>
          {/* Add total amount */}
        </Callout>
      </Card>

      <NonIdealState
        icon="shopping-cart"
        title="Ready to Checkout"
        description="Complete the transaction and shipping information to proceed."
      />
    </div>
  );
};

export default TransactionContainer;
