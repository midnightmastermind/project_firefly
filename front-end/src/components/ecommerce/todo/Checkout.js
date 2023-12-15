import React from 'react';

const CheckoutComponent = ({ items, total, onCheckout }) => {
  const handleCheckout = () => {
    // Implement the checkout logic here
    onCheckout();
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default CheckoutComponent;
