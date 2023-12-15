import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OEZkLCrOlAFE3BhJU80zThcACm9JRTEqaEjubo12tVmTEn2ilS1geKKCUnAKh15Z00HrJMisT7odYzWNel1OOF800IuSCBriV');

const CheckoutFormContainer = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51OEZkLCrOlAFE3Bh5lPoYFXPu2Yn04C0mB6uvXCxjEmxgHihbCmXwui6qe7DXNlh46jm7spRDjlnkWDRJpGXGQXi002VchKzn8',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutFormContainer;