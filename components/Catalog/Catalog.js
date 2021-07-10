import { Box, Text } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";
import Product from "../Product/Product";

const Catalog = ({ products }) => {
  return (
    <Box>
      <Text
        as="h1"
        fontSize="6xl"
        textColor="#6B46C1"
        fontWeight="bold"
        pt="10"
      >
        Latest
      </Text>
      <SimpleGrid
        columns={{sm:1, md:2, lg:3}}
        spacing={14}
        py="10"
      >
        {products.map((product) => (
          <Product product={product} key={product.name} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Catalog;
