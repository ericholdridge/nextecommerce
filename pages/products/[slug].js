import React from "react";
import Layout from "../../components/Layout/Layout";
import Image from "next/image";
import { Box, Heading, Flex } from "@chakra-ui/layout";
import client from "../../utils/graphClient";
import { findBySlug } from "../../queries/findBySlug";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";

const ViewProduct = ({ products, categories }) => {
  return (
    <Layout categories={categories}>
      {products.map((product) => (
        <Flex justify="space-between" w="100%" mt="14">
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
              Awesome GraphCMS Tshirt, available in a variety of colours, and
              super comfortable. Rep your favorite Headless CMS in style.
            </Box>
            <Flex justify="space-between">
              <FormControl maxW="450px">
                <FormLabel fontWeight="bold" fontSize="14">
                  STYLE
                </FormLabel>
                <Select bg="#f5f5f5" h="12">
                  <option>Black / XS</option>
                  <option>Black / S</option>
                </Select>
              </FormControl>
              <FormControl maxWidth="130px">
                <FormLabel fontWeight="bold" fontSize="14">
                  QUANTITY
                </FormLabel>
                <Select bg="#f5f5f5" h="12">
                  <option>1</option>
                </Select>
              </FormControl>
            </Flex>
            <Button bg="#5828e8" w="100%" color="#fff" mt="6" fontSize="14">ADD TO CART</Button>
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
