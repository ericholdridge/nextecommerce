import NextLink from "next/link";
import { Flex, Text } from "@chakra-ui/layout";
import Image from "next/image";
import { Box } from "@chakra-ui/layout";

const Product = ({ product }) => {
  return (
    <NextLink href={"/products/" + product?.slug?.current}>
      <Flex
        justify="center"
        direction="column"
        bg="#f5f5f5"
        borderRadius="4"
        p="6"
        cursor="pointer"
      >
        <Image src={product?.image?.asset?.url} width={330} height={330} />
        <Box pt="8">
          <Text textAlign="center" fontSize="lg" fontWeight="bold">
            {product.name}
          </Text>
          <Text align="center" color="#888" fontSize="14" pt="2">
            {product.price}
          </Text>
        </Box>
      </Flex>
    </NextLink>
  );
};

export default Product;
