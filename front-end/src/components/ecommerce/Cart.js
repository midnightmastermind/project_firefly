// ShoppingCart.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { remove as removeFromCart } from 'slices/ecommerce/cart_item'; // Assuming you have an action for removing from the cart

const Cart = ({ hasCheckoutButton, isEditable, title }) => {
  const { cart_items } = useSelector((state) => state.cart_item);
  const { products } = useSelector((state) => state.product);
  const [items, setItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart_items && products) {
      let sub_total = 0;
      const items_in_cart = cart_items.filter((item) => item.type == 'cart');
      console.log(items_in_cart);
        const merged_cart_items = items_in_cart.map((item) => {
          const product = products.find((product) => product._id == item.product_id);
          if (product) {
            const product_sub_total = item.quantity * product.product_price;
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


  const proceedToCheckout = () => {
    navigate('/checkout');
  };
  console.log(items);
  return (
    <div>
      {title && title !== '' && <h2>{title}</h2> }

      {items && items.length > 0 && items.map((item) => (
        <div className="cart-item" key={item._id}>
        
          <div className="cart-item-img" style={{backgroundImage: `url(${item.product.images[0]}`}} />
          <div className="cart-item-name">{item.product.name}</div>
          <div className="cart-item-qty">qty: {item.quantity}</div>
          <div className="cart-item-subtotal">{`$${item.sub_total}`}</div>
          <div className="cart-remove-button"><button onClick={() => dispatch(removeFromCart(item._id))}>Remove</button></div>
        </div>
      ))}
      {items && items.length > 0 && <div className="sub-total-box">Sub Total: {`$${subTotal}`}</div>}
      {items && items.length > 0 && hasCheckoutButton && 
        <div className="cart-action-buttons">
          <button className="checkout-button" onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
      }
      {(!items || items.length == 0) && <div>0 Products</div>}
    </div>
  );
};

export default Cart;