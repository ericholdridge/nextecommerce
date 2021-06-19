import { Heading } from "@chakra-ui/layout";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import Layout from "../components/Layout/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Stripe from "stripe";

const Checkout = ({ paymentIntent }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
 

  return (
    <Layout>
      <Heading as="h2" color="#6B46C1" py="6" size="3xl">
        Checkout
      </Heading>
      <Elements stripe={stripePromise}>
        <CheckoutForm  />
      </Elements>
    </Layout>
  );
};

// export const getServerSideProps = async () => {
//   const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1000,
//     currency: "USD",
//   });

//   return {
//     props: {
//       paymentIntent,
//     },
//   };
// };

export default Checkout;
