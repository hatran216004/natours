// eslint-disable
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51QErlvGGF6pNW390bfAyfwn5YkIWRDKGxeXJjTVzxT9OP2EfakZvgybFnFikXqoN9EhxbG9aceJxSbbGqEyply1Q00XqWdkDFJ',
);

export const bookTour = async (tourId) => {
  // 1) Get checkout session from api
  try {
    const session = await axios.get(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2) Create checkout form + chagre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', err.response.data.message);
  }
};
