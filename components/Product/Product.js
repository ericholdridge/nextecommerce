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
        <Image
          src={product?.image?.asset?.url}
          // src="https://gatsby-graphcms-ecommerce-starter.netlify.app/static/3c1d76b7458d0a6c2d0d16bb0a950200/af144/8514b5cfc86d29a6a15591cc0f5afbaf_preview.png"
          // alt="Picture of the author"
          width={330}
          height={330}
        />
        <Box pt="8">
          <Text textAlign="center" fontSize="lg" fontWeight="bold">
            {product.name}
          </Text>
          <Text align="center" color="#888" fontSize="14" pt="2">{product.price}</Text>
        </Box>
      </Flex>
    </NextLink>
  );
};

export default Product;
