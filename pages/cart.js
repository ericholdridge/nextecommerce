import { Heading, Box, Flex, Text, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../components/Context/CartContext";
import NextLink from "next/link";

const Cart = () => {
  const { cart } = useContext(CartContext);
  return (
    <Layout>
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
              19,00
            </Box>
            <NextLink href="/checkout" passhref>
              <Link
                bg="#5828e8"
                textTransform="uppercase"
                color="#fff"
                mt="1"
                fontSize="md"
                p="2"
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

export default Cart;
