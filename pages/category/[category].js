import { Text, SimpleGrid } from "@chakra-ui/layout";
import Product from "../../components/Product/Product";
import Layout from "../../components/Layout/Layout";
import client from "../../utils/graphClient";
import { findCategoryIdFromCategorySlug } from "../../queries/findCategoryIdFromCategorySlug";
import { findProductsFromCategoryId } from "../../queries/findProductsFromCategoryId";
import { findBySlug } from "../../queries/findBySlug";

const Category = ({ products, categories, categoryName }) => {
  return (
    <Layout categories={categories}>
      <Text
        as="h1"
        fontSize="6xl"
        textColor="#6B46C1"
        fontWeight="bold"
        py="10"
      >
        {categoryName}
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={14} pt="5" pb="10">
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const categoryId = await client.query({
    query: findCategoryIdFromCategorySlug,
    variables: {
      categorySlug: params.category,
    },
  });

  const products = await client.query({
    query: findProductsFromCategoryId,
    variables: {
      categoryId: categoryId.data.allCategory[0]._id,
    },
  });

  const getCategories = await client.query({
    query: findBySlug,
    variables: {
      slug: `${params.slug}`,
    },
  });

  if (!products) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: products.data.allProducts,
      categories: getCategories.data.allCategory,
      categoryName: categoryId.data.allCategory[0].name,
    },
  };
};

export default Category;
