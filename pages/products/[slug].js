import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Image from "next/image";
import { Box, Heading, Flex } from "@chakra-ui/layout";
import client from "../../utils/graphClient";
import { findBySlug } from "../../queries/findBySlug";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { SimpleGrid } from "@chakra-ui/layout";
import Radio from "../../components/Radio/Radio";

const ViewProduct = ({ products, categories }) => {
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const initialQuantity = quantity[0];
  const [itemQuantity, setItemQuantity] = useState(initialQuantity);
  const [size, setSize] = useState("");
  const [cart, setCart] = useState([]);

  // Add product to the cart
  const addProductToCart = (product) => {
    setCart((prevCart) => [
      ...prevCart,
      {
        name: product.name,
        price: product.price,
        quantity: itemQuantity,
        style: product.productSizeQuantity[0].color,
        size: product.productSizeQuantity[0].size,
      },
    ]);
  };

  return (
    <Layout categories={categories} cart={cart}>
      {products.map((product, index) => (
        <Flex key={index} justify="space-between" w="100%" mt="14">
          <Box bg="#f5f5f5" borderRadius="4" p="6" maxWidth="600px">
            <Image
              src={product?.image?.asset?.url}
              alt="Picture of the author"
              width={600}
              height={600}
            />
          </Box>
          <Box maxWidth="600px">
            <Heading as="h2" color="#6B46C1" py="6" size="3xl">
              {product.name}
            </Heading>
            <Box as="span" fontSize="2xl" fontWeight="bold">
              {product.price}
            </Box>
            <Box as="p" color="#888" fontWeight="medium" py="4" lineHeight="2">
              {product.description}
            </Box>
            <Box>
              <SimpleGrid columns={4} spacing={2} maxW="345px">
                {product.productSizeQuantity.map((item) => {
                  return <Radio options={item.size} setSize={setSize} />;
                })}
              </SimpleGrid>
              <FormControl maxWidth="100px" mt="4">
                <FormLabel fontWeight="bold" fontSize="14">
                  QUANTITY
                </FormLabel>
                <Select
                  bg="#f5f5f5"
                  h="12"
                  onChange={(e) =>
                    setItemQuantity(parseInt(e.target.value, 10))
                  }
                >
                  {quantity?.map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button
              onClick={() => addProductToCart(product)}
              bg="#5828e8"
              w="100%"
              color="#fff"
              mt="6"
              fontSize="14"
            >
              ADD TO CART
            </Button>
          </Box>
        </Flex>
      ))}
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const response = await client.query({
    query: findBySlug,
    variables: {
      slug: `${params.slug}`,
    },
  });

  return {
    props: {
      products: response.data.allProducts,
      categories: response.data.allCategory,
    },
  };
};

export default ViewProduct;
