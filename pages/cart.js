import { Heading, Box, Flex, Text, Link, Button } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../components/Context/CartContext";
import NextLink from "next/link";
import { allCategories } from "../queries/allCategories";
import client from "../utils/graphClient";
import { calculateSubtotal } from "../utils/calculateCartFees";

const Cart = ({ categories }) => {
  const { cart, handleRemoveItem, handleItemQuantity } =
    useContext(CartContext);

  return (
    <Layout categories={categories}>
      <Heading as="h2" color="#6B46C1" py="6" size="3xl">
        Cart
      </Heading>
      {cart.length > 0 ? (
        <Box borderBottom="3px solid #f5f5f5" pb="10">
          {cart.map((item, i) => (
            <Flex
              w="full"
              bg="#f5f5f5"
              px={{ xs: "6" }}
              py={{ xs: "3.5", sm: "7" }}
              justifyContent="space-between"
              borderRadius="4"
              mt="6"
              boxShadow="md"
              key={item?.id || i}
            >
              <Flex
                alignItems={{ xs: "flex-start", md: "center" }}
                flexDirection={{ xs: "column", md: "row" }}
                // border="1px solid red"
                maxW={{ sm: "220px" }}
              >
                <Box ml={{ xs: "-2", sm: "0" }}>
                  <Image
                    src={item.image.asset.url}
                    alt={item.name}
                    width={75}
                    height={75}
                    blurDataURL={item.image.asset.url}
                    placeholder="blur"
                  />
                </Box>
                <Box ml={{ xs: "0", sm: "6" }}>
                  <Text fontWeight="medium" fontSize="md">
                    {item.name}
                  </Text>
                  <Text fontSize="sm" color="#888" pt="2">
                    Size: {item.size}
                  </Text>
                  <Button
                    onClick={() => handleRemoveItem(item._id)}
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
                minW="100px"
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex flexDirection="column" alignItems="center">
                  <ChevronUpIcon
                    w={6}
                    h={6}
                    cursor="pointer"
                    onClick={() => handleItemQuantity(item, "increment")}
                  />
                  <Text fontWeight="medium">{item.quantity}</Text>
                  <ChevronDownIcon
                    w={6}
                    h={6}
                    cursor="pointer"
                    onClick={() => handleItemQuantity(item, "decrement")}
                  />
                </Flex>
                <Text fontWeight="medium">
                  {item ? "$" + item.totalPrice.toFixed(2) : null}
                </Text>
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
              {calculateSubtotal(cart)}
            </Box>
            <NextLink href="/checkout" passhref>
              <Link
                bg="#6B46C1"
                textTransform="uppercase"
                color="#fff"
                mt="1"
                fontSize="md"
                fontWeight="bold"
                p="2.5"
                borderRadius="4"
                _hover={{ bg: "green.400" }}
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
