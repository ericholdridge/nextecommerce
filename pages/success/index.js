import { Box, Heading } from "@chakra-ui/layout";
import Layout from "../../components/Layout/Layout";
import { allCategories } from "../../queries/allCategories";
import client from "../../utils/graphClient";

const SuccessPage = ({ categories }) => {
  return (
    <Layout categories={categories} title="Thank you for your order">
      <Heading as="h2" color="#6B46C1" pt="20" pb="10" size="3xl">
        Success! Thank you.
      </Heading>
      <Box mt="4">Please take note of your order reference:</Box>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const response = await client.query({
    query: allCategories,
  });

  return {
    props: {
      categories: response.data.allCategory,
    },
  };
};

export default SuccessPage;
