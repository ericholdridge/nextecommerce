import { Text, SimpleGrid } from "@chakra-ui/layout";
import Product from "../../components/Product/Product";
import Layout from "../../components/Layout/Layout";
import client from "../../utils/graphClient";
import { findCategoryIdFromCategorySlug } from "../../queries/findCategoryIdFromCategorySlug";
import { findProductsFromCategoryId } from "../../queries/findProductsFromCategoryId";
import { allCategories } from "../../queries/allCategories";
import { findBySlug } from "../../queries/findBySlug";

const Category = ({ products, categories, categoryName }) => {
  return (
    <Layout categories={categories}>
      <Text
        as="h1"
        fontSize={{ xs: "3xl", sm: "6xl" }}
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

export const getStaticPaths = async () => {
  const categoryName = await client.query({
    query: allCategories,
  });

  const paths = categoryName.data.allCategory.map((category) => ({
    params: { category: category.slug.current },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
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
      slug: `${params.category}`,
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
