import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);
const baseURL=process.env.baseURL
export async function POST(request) {
    try {
        const { checkoutItem } = await request.json();
        
        // Create a new customer in Stripe
        const customer = await createStripeCustomer();

        // Create a checkout session
        const session = await createStripeCheckoutSession(checkoutItem, customer.id);

        return NextResponse.json({ msg: session, url: session.url }, { status: 200 });
    } catch (error) {
        console.error("Stripe Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function createStripeCustomer() {
    try {
        const customer = await stripe.customers.create({
            email: 'customer@example.com',
            name: 'Jenny Rosen',
            address: {
              line1: '510 Townsend St',
              postal_code: '98140',
              city: 'San Francisco',
              state: 'CA',
              country: 'US',
            },
        });
        console.log("Customer created in Stripe:", customer.id);
        return customer;
    } catch (error) {
        throw new Error("Failed to create customer in Stripe");
    }
}

async function createStripeCheckoutSession(checkoutItem, customerId) {
    try {
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            mode: 'payment',
            success_url:baseURL+ "payment/success",
            cancel_url:baseURL+ "payment/fail",
            line_items: [{
                quantity: 1,
                price_data: {
                    product_data: {
                        name: checkoutItem.title
                    },
                    currency: 'INR',
                    unit_amount: checkoutItem.price * 100
                }
            }]
        });
        return session
    } catch (error) {
        throw new Error("Failed to create checkout session in Stripe");
    }
}
