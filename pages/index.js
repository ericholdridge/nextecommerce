import Catalog from "../components/Catalog/Catalog";
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
  return {
    props: {
      products: response.data.allProducts,
      categories: response.data.allCategory,
    },
  };
};

export default Home;
