import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession({
  amount,
  currency = 'usd',
  successUrl,
  cancelUrl,
  metadata = {},
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'Professional Service',
              description: 'Payment for professional service',
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
    });

    return { success: true, sessionId: session.id, url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { success: false, error: error.message };
  }
}

export async function retrieveSession(sessionId) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return { success: true, session };
  } catch (error) {
    console.error('Error retrieving session:', error);
    return { success: false, error: error.message };
  }
}

export default stripe;
