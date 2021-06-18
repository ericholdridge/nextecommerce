import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { CartWrapper } from "../components/Context/CartContext";

function MyApp({ Component, pageProps }) {
  return (
    <CartWrapper>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </CartWrapper>
  );
}

export default MyApp;
