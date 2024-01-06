// ShoppingCart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove as removeFromCart } from 'slices/ecommerce/cart'; // Assuming you have an action for removing from the cart

const Cart = () => {
  const { items }= useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items && items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;