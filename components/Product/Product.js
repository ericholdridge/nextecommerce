import NextLink from "next/link";
import { Flex, Text } from "@chakra-ui/layout";
import Image from "next/image";
import { Box } from "@chakra-ui/layout";
import { useContext } from "react";
import { CartContext } from "../../components/Context/CartContext";

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
        boxShadow="md"
      >
        <Image
          src={product?.image?.asset?.url}
          width={330}
          height={330}
          blurDataURL={product?.image?.asset?.url}
          placeholder="blur"
        />
        <Box pt={{ xs: "2", sm: "4", md: "8" }}>
          <Text textAlign="center" fontSize="lg" fontWeight="bold">
            {product.name}
          </Text>
          <Text align="center" color="#888" fontSize="14" pt="2">
            {product ? "$" + product.price : null}
          </Text>
        </Box>
      </Flex>
    </NextLink>
  );
};

export default Product;
