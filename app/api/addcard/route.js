const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);
const baseURL = process.env.BASE_URL;
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        console.log('add api called-----');
        // Create a new customer in Stripe
        const customer = await createStripeCustomer();

        // Add a card source to the customer
        const customerSource = await addCardSourceToCustomer(customer.id);

        return NextResponse.json({ msg: 'Customer and card created successfully', customer, customerSource }, { status: 200 });
    } catch (error) {
        console.log('add api called-----');
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

async function addCardSourceToCustomer(customerId) {

    try {
        const source = await stripe.customers.createSource(customerId, {
            source: stripeToken, // Replace with a real token from your frontend
        });
        console.log("Card source added to customer:", source.id);
        return source;
    } catch (error) {
        throw new Error("Failed to add card source to customer in Stripe");
    }
}
