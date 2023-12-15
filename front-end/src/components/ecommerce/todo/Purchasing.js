// PurchasingPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { purchase } from './purchaseSlice'; // Assuming you have an action for purchasing

const Purchasing = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handlePurchase = () => {
    dispatch(purchase(cartItems));
  };

  return (
    <div>
      <h2>Purchasing Page</h2>
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default Purchasing;