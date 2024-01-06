// ShoppingSavedItems.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove as removeFromCart } from 'slices/ecommerce/cart'; // Assuming you have an action for removing from the savedItems

const SavedItems = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Saved Items</h2>
      {items && items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default SavedItems;                    