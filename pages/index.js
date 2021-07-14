import Catalog from "../components/Catalog/Catalog";
import useSWR from "swr";
import Layout from "../components/Layout/Layout";
import { allProducts } from "../queries/allProducts";
import client from "../utils/graphClient";

const Home = ({ products, categories }) => {
  return (
    <Layout categories={categories}>
      <Catalog products={products} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const response = await client.query({
    query: allProducts,
  });

  // If no response, return 404 status and page.
  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: response.data.allProducts,
      categories: response.data.allCategory,
    },
  };
};

export default Home;
