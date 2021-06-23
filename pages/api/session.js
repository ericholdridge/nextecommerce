const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { cart } = req.body;
  console.log(cart);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Socks"
          },
          unit_amount: 120,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success/",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
};
