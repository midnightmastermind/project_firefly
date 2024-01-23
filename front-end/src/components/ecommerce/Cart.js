// ShoppingCart.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove as removeFromCart } from 'slices/ecommerce/cart_item'; // Assuming you have an action for removing from the cart

const Cart = () => {
  const { cart_items } = useSelector((state) => state.cart_item);
  const { products } = useSelector((state) => state.product);
  const [items, setItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  console.log(cart_items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart_items && products) {
      let sub_total = 0;
      const items_in_cart = cart_items.filter((item) => item.type == 'cart');
      console.log(items_in_cart);
        const merged_cart_items = items_in_cart.map((item) => {
          const product = products.find((product) => product._id == item.product_id);
          if (product) {
            const product_sub_total = item.quantity * product.price;
            sub_total = sub_total + product_sub_total;
            return {...item, product: product, sub_total: product_sub_total}
          }
      });
      if (merged_cart_items.length > 0) {
        setItems(merged_cart_items);
        setSubTotal(sub_total);
      }
    } 
  }, [products, cart_items]);
  console.log(items);
  return (
    <div>
      <h2>Shopping Cart</h2>
      {items && items.map((item) => (
        <div key={item._id}>
          <span>{item.product.title}</span>
          <span>{item.quantity}</span>
          <span>{`$${item.sub_total}`}</span>
          <button onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
        </div>
      ))}
      <div>Sub Total: {`$${subTotal}`}</div>
    </div>
  );
};

export default Cart;