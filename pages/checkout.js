import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { useContext } from "react";
import { CartContext } from "../components/Context/CartContext";
import Layout from "../components/Layout/Layout";
import Image from "next/image";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  console.log(cart);
  return (
    <Layout>
      <Heading as="h2" color="#6B46C1" py="6" size="3xl">
        Checkout
      </Heading>
      <Flex
        justifyContent="space-between"
        alignItems="flex-start"
        mt="14"
        position="relative"
      >
        {/* Shipping Information */}
        <Box
          border="2px solid #e2e8f0"
          borderRadius="8"
          py="8"
          px="6"
          minW="750px"
          position="sticky"
          top="0"
        >
          <Heading as="h3" pb="8">
            Shipping
          </Heading>
          <FormControl id="name" isRequired width="full">
            <Input
              type="email"
              placeholder="Name"
              py="6"
              background="#f5f5f5"
              border="2px solid #e2e8f0"
            />
          </FormControl>
          <Flex justifyContent="space-between" my="4">
            <FormControl id="email" isRequired width="48%">
              <Input
                type="email"
                placeholder="Email Address"
                py="6"
                background="#f5f5f5"
                border="2px solid #e2e8f0"
              />
            </FormControl>
            <FormControl id="contactNo" isRequired width="48%">
              <Input
                type="text"
                placeholder="Contact no."
                py="6"
                background="#f5f5f5"
                border="2px solid #e2e8f0"
              />
            </FormControl>
          </Flex>
          <FormControl id="address" isRequired width="full">
            <Input
              type="text"
              placeholder="Address Line 1"
              py="6"
              background="#f5f5f5"
              border="2px solid #e2e8f0"
            />
          </FormControl>
          <FormControl id="apartment" isRequired width="full">
            <Input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              py="6"
              mt="4"
              background="#f5f5f5"
              border="2px solid #e2e8f0"
            />
          </FormControl>
          <Flex justifyContent="space-between" my="4">
            <FormControl id="city" isRequired w="48%">
              <Input
                type="text"
                placeholder="City"
                py="6"
                background="#f5f5f5"
                border="2px solid #e2e8f0"
              />
            </FormControl>
            <FormControl id="country" isRequired width="48%">
              <Select
                type="text"
                background="#f5f5f5"
                border="2px solid #e2e8f0"
                height="52px"
              >
                <option>United States</option>
                <option>Germany</option>
              </Select>
            </FormControl>
          </Flex>
          <FormControl id="zipcode" isRequired w="48%">
            <Input
              type="text"
              placeholder="ZIP / Postcode"
              py="6"
              background="#f5f5f5"
              border="2px solid #e2e8f0"
            />
          </FormControl>
          <Flex alignItems="center" mt="6">
            <FormControl as="fieldset">
              <RadioGroup>
                <Radio>Use different billing address</Radio>
              </RadioGroup>
            </FormControl>
            <Button background="#5828e8" type="submit" color="#fff" px="7">
              Calculate shipping
            </Button>
          </Flex>
        </Box>
        {/* Cart information */}
        {cart.length > 0 && (
          <Box
            border="2px solid #e2e8f0"
            borderRadius="8"
            py="5"
            px="6"
          >
            {cart.map((item) => (
              <Flex
                minW="400px"
                justifyContent="space-between"
                alignItems="center"
                mt="2"
              >
                <Flex mt="4">
                  <Box position="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={90}
                      height={90}
                    />
                    <Text
                      position="absolute"
                      top="-3"
                      right="0"
                      bg="#101b42"
                      px="2"
                      color="#fff"
                      borderRadius="4"
                      fontSize="sm"
                    >
                      {item.quantity}
                    </Text>
                  </Box>
                  <Flex flexDirection="column" ml="4" justifyContent="center">
                    <Text fontSize="sm">{item.name}</Text>
                    <Text fontSize="sm">{item.size}</Text>
                  </Flex>
                </Flex>
                <Text fontSize="sm" color="#888">
                  {item.price}
                </Text>
              </Flex>
            ))}
          </Box>
        )}
      </Flex>
    </Layout>
  );
};

export default Checkout;
