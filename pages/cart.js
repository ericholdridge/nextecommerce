import { Heading, Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout/Layout";
import Image from "next/image";

const Cart = () => {
  return (
    <Layout>
      <Heading as="h2" color="#6B46C1" py="6" size="3xl">
        Cart
      </Heading>
      <Flex
        w="full"
        bg="#f5f5f5"
        px="10"
        py="7"
        justifyContent="space-between"
        borderRadius="4"
      >
        <Flex alignItems="center">
          <Image
            src="https://via.placeholder.com/150"
            alt="Picture of the author"
            width={75}
            height={75}
          />
          <Box ml="6">
            <Text fontWeight="medium" fontSize="md">
              Unisex Long Sleeve Tee - Black / XS
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
        <Flex minW="300px" alignItems="center" justifyContent="space-between">
          <Flex flexDirection="column" alignItems="center">
            <ChevronUpIcon w={6} h={6} cursor="pointer" />
            <Text fontWeight="medium">1</Text>
            <ChevronDownIcon w={6} h={6} cursor="pointer" />
          </Flex>
          <Text fontWeight="medium">19,00 €</Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Cart;
