const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import client from "../../utils/graphClient";
import { getPricesFromMultipleSlugs } from "../../queries/getPricesFromMultipleSlugs";

export default async (req, res) => {
  try {
    // Get the array of items in the cart we sent here via the fetch request
    const { cart } = req.body;

    // Just check the request is a POST request (instead of GET/PUT etc)
    if (req.method !== "POST") {
      res.status(405).send("Invalid request type.");
    }

    // Check a cart has been sent over, and that there are items in the cart
    if (!cart || cart.length < 0) {
      res.status(400).send("Cart cannot be empty");
    }

    // Assuming the request came through fine.... create an array of slugs
    // const slugs = cart.map((product) => product.slug.current);

    // Get price for all items in the cart through GQL
    // const response = await client.query({
    //   query: getPricesFromMultipleSlugs,
    //   variables: {
    //     slugs,
    //   },
    // })

    // Loop through all cart items and add up their values to get final cart value in CENTS
    const calculateOrderAmount = (items) => {
      if (items.length) {
        let total = 0;
        items.forEach((product) => {
          const item = product.totalPrice;
          total = total + item;
        });

        return total * 100;
      } else {
        return false;
      }
    };

    // Get carts total price in cents
    // const totalPrice = calculateOrderAmount(response?.data?.allProducts);
    const totalPrice = calculateOrderAmount(cart);

    // If the total price is equal to false, something went wrong inside calculateOrderAmount - likely bad response from GQL
    if (totalPrice === false) {
      res.status(500).send("Something went wrong calculating the price.");
      return;
    }

    // Now we have the total cart value, create a stripe intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice.toFixed(),
      currency: "usd",
    });

    // Send the intent back to checkout form page.
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // Something messed up
    console.error(error, error.message);
    res.status(500).send("Internal server error - intent");
  }
};
