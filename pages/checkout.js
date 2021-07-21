import { Heading, Text } from "@chakra-ui/react";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import Layout from "../components/Layout/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/Context/CartContext";
import { allCategories } from "../queries/allCategories";
import client from "../utils/graphClient";

const CheckoutPage = ({ categories }) => {
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
  );
  const { cart, setCart } = useContext(CartContext);

  console.log(stripePromise);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  return (
    <Layout categories={categories}>
      <Heading as="h2" color="#6B46C1" py="6" size="3xl">
        Checkout
      </Heading>
      {/* Make sure there are items in the cart, otherwise we will get an error */}
      {cart.length > 0 ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <Text>No items in your cart yet</Text>
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

export default CheckoutPage;
