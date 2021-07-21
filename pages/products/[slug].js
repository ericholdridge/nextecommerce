import React, { useContext, useEffect, useState } from "react";
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
import { CartContext } from "../../components/Context/CartContext";
import { Spinner } from "@chakra-ui/react";
import { allProducts } from "../../queries/allProducts";

const ViewProduct = ({ products, categories }) => {
  const {
    setSize,
    cart,
    addProductToCart,
    quantity,
    setItemQuantity,
    loading,
  } = useContext(CartContext);

  return (
    <Layout categories={categories} cart={cart}>
      {products.map((product, index) => (
        <Flex
          key={index}
          justify="space-between"
          width="100%"
          mt={{xs: "6", md: "14"}}
          flexDir={{ xs: "column", md: "row" }}
          padding={{ sm: "0 0 30px 0" }}
        >
          <Box
            bg="#f5f5f5"
            borderRadius="4"
            p="6"
            alignItems="flex-start"
            boxShadow="md"
            width={{ md: "48%" }}
          >
            <Flex justifyContent="center" alignItems="center">
              <Image
                src={product?.image?.asset?.url}
                alt="Picture of the author"
                width={600}
                height={600}
                layout="intrinsic"
                blurDataURL={product?.image?.asset?.url}
                placeholder="blur"
              />
            </Flex>
          </Box>
          <Box width={{ md: "48%" }} mb={{xs: "6"}}>
            <Heading
              as="h2"
              color="#6B46C1"
              pt={{ xs: "4" }}
              fontSize={{ xs: "3xl", md: "4xl" }}
            >
              {product.name}
            </Heading>
            <Box
              as="span"
              fontSize={{ md: "xl", lg: "2xl" }}
              fontWeight="bold"
              py={{ xs: "2", md: "2" }}
              display="block"
            >
              {product ? "$" + product.price : null}
            </Box>
            <Box
              as="p"
              color="#888"
              fontWeight="medium"
              lineHeight={{xs: "1.6", md: "2"}}
              pb={{ xs: "2", md: "4" }}
            >
              {product.description}
            </Box>
            <Box>
              <SimpleGrid columns={4} spacing={2} maxW="345px">
                {product.productSizeQuantity.map((item) => {
                  return (
                    <Radio key={item} options={item.size} setSize={setSize} />
                  );
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
                  {quantity?.map((num, index) => (
                    <option key={index} value={num}>
                      {num}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button
              onClick={() => addProductToCart(product)}
              bg="#6B46C1"
              width="100%"
              color="#fff"
              fontWeight="black"
              mt="6"
              display="block"
              fontSize="14"
              _hover={{ bg: "green.400" }}
              _focus={{ outline: "transparent" }}
            >
              {loading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="sm"
                />
              ) : (
                "ADD TO CART"
              )}
            </Button>
          </Box>
        </Flex>
      ))}
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const productSlug = await client.query({
    query: allProducts,
  });

  const paths = productSlug.data.allProducts.map((slug) => ({
    params: { slug: slug.slug.current },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
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
