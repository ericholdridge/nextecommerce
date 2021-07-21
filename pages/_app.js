import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { CartWrapper } from "../components/Context/CartContext";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  xs: "18.75em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
});
// 3. Extend the theme
const theme = extendTheme({ breakpoints });

function MyApp({ Component, pageProps }) {
  return (
    <CartWrapper>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </CartWrapper>
  );
}

export default MyApp;
