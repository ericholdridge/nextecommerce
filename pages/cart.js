import { Heading, Box, Flex, Text, Link, Button } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../components/Context/CartContext";
import NextLink from "next/link";
import { allCategories } from "../queries/allCategories";
import client from "../utils/graphClient";
import { calculateCartTotal } from "../utils/calculateCartTotal";

const Cart = ({ categories }) => {
  const { cart, handleRemoveItem } = useContext(CartContext);

  // Calculate the cart subtotal

  // Calculate the subtotal of all products in the cart
  // const itemPrices = cart?.map((item) => item.price);
  // const subtotal = itemPrices?.reduce(function (accumulator, currentValue) {
  //   return accumulator + currentValue;
  // }, 0);

  return (
    <Layout categories={categories}>
      <Heading as="h2" color="#6B46C1" py="6" size="3xl">
        Cart
      </Heading>
      {cart.length > 0 ? (
        <Box borderBottom="3px solid #f5f5f5" pb="10">
          {cart.map((item) => (
            <Flex
              w="full"
              bg="#f5f5f5"
              px="10"
              py="7"
              justifyContent="space-between"
              borderRadius="4"
              mt="6"
            >
              <Flex alignItems="center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={75}
                  height={75}
                />
                <Box ml="6">
                  <Text fontWeight="medium" fontSize="md">
                    {item.name} - {item.size}
                  </Text>
                  <Button
                    onClick={() => handleRemoveItem(item.id)}
                    fontSize="sm"
                    bg="none"
                    color="#888"
                    fontWeight="normal"
                    p="0"
                    _hover={{ background: "none", color: "#000" }}
                    _focus={{ outline: "transparent" }}
                    _active={{ background: "none" }}
                  >
                    X Remove
                  </Button>
                </Box>
              </Flex>
              <Flex
                minW="300px"
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex flexDirection="column" alignItems="center">
                  <ChevronUpIcon w={6} h={6} cursor="pointer" />
                  <Text fontWeight="medium">{item.quantity}</Text>
                  <ChevronDownIcon w={6} h={6} cursor="pointer" />
                </Flex>
                <Text fontWeight="medium">{item.price}</Text>
              </Flex>
            </Flex>
          ))}
        </Box>
      ) : (
        <Text>Your cart is empty</Text>
      )}
      {cart.length > 0 ? (
        <Flex justifyContent="flex-end">
          <Flex flexDir="column" pt="5" textAlign="right">
            <Box as="span">Sub total</Box>
            <Box
              as="span"
              py="1"
              color="#5828e8"
              fontWeight="bold"
              fontSize="2xl"
            >
              {calculateCartTotal(cart)}
            </Box>
            <NextLink href="/checkout" passhref>
              <Link
                bg="green.500"
                textTransform="uppercase"
                color="#fff"
                mt="1"
                fontSize="md"
                fontWeight="bold"
                p="2.5"
                borderRadius="4"
                _hover={{ background: "#101b42" }}
              >
                Checkout
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      ) : null}
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

export default Cart;
