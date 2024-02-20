// src/components/PaymentForm.js
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios'; // You need to install axios: npm install axios
import config from './config'; // Adjust the path based on your project structure

const PaymentForm = () => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState('');

  // Function to call the server and get the client secret
  const fetchClientSecret = async () => {
    try {
      const response = await axios.post('/api/stripe/create-payment-intent');
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  };

  // Fetch the client secret when the component mounts
  useEffect(() => {
    fetchClientSecret();
  }, []);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true, // You can customize other options as weall
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!clientSecret) {
        console.error('Client secret not available.');
        return;
      }

      // Your payment handling logic using Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: stripe.elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        // Payment succeeded, handle success
      }
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={cardElementOptions} />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
