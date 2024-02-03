import React, { useState } from 'react';
import { Divider, Button, Card, Switch } from '@blueprintjs/core';
import Cart from './Cart';
import ShippingForm from './ShippingForm';
import BillingForm from './BillingForm';
import PaymentForm from './stripe/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import config from './stripe/config'; // Adjust the path based on your project structure

const stripePromise = loadStripe(config.stripe.publishableKey);

const CheckoutComponent = () => {
  const [billingInfo, setBillingInfo] = useState({});
  const [shippingInfo, setShippingInfo] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [sameAddress, setSameAddress] = useState(false);

  const handleBillingChange = (e) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleSameAddressChange = () => {
    setSameAddress(!sameAddress);
  };

  const handleCheckout = () => {
    console.log('Billing Info:', billingInfo);
    console.log('Shipping Info:', shippingInfo);
    console.log('Same Address:', sameAddress);
    console.log('Cart Items:', cartItems);
    console.log('Total:', calculateTotal());
    // Add logic for handling the checkout, e.g., sending data to a server
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="cart">
        <Cart hasCheckoutButton={false} />
      </div>
      <Divider vertical={true} />
      <div className="checkout-forms">
        <Card>
          <div className="billing-form">
            <h2>Billing Information</h2>
            <BillingForm onChange={handleBillingChange} info={billingInfo} />
          </div>
        </Card>
        <div className="checkout-form-divider">
          <Divider />
          <Switch
            checked={sameAddress}
            onChange={handleSameAddressChange}
            label="Same Address"
          />
          <Divider />
        </div>
        <Card>
          <div className="shipping-form">
            <h2>Shipping Information</h2>
            <ShippingForm onChange={handleShippingChange} info={shippingInfo} />
          </div>
        </Card>
      </div>
      <Divider vertical={true} />
      <div className="total-box">
        <div className="total-box-header">
          Purchase Amount
        </div>
        <div className="total-box-amount">Sub-Total: ${calculateTotal()}</div>
        <div className="total-box-amount">Shipping Amount: ${calculateTotal()}</div>
        <div className="total-box-amount">Tax: ${calculateTotal()}</div>
        <div className="total-box-amount">Total Amount: ${calculateTotal()}</div>
      </div>
      <Divider vertical={true} />
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
      <div className="complete-checkout-button">
        <Button intent="primary" onClick={handleCheckout}>
          Complete Checkout
        </Button>
      </div>
    </div>
  );
};

export default CheckoutComponent;
