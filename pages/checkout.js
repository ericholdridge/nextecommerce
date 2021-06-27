import { Heading } from "@chakra-ui/layout";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import Layout from "../components/Layout/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { CartContext } from "../components/Context/CartContext";
import NoCartItems from "../components/Cart/NoCartItems";
import { allCategories } from "../queries/allCategories";
import client from "../utils/graphClient";

const Checkout = ({ categories }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  const { cart } = useContext(CartContext);

  return (
    <Layout categories={categories}>
      <Heading as="h2" color="#6B46C1" py="6" size="3xl">
        Checkout
      </Heading>
      {/* Make sure there are items in the cart, otherwise we will get a backend error */}
      {cart?.length > 0 ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <NoCartItems />
      )}
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const response = await client.query({
    query: allCategories,
  });

  return {
    props: {
      categories: response.data.allCategory,
    },
  };
};

export default Checkout;
