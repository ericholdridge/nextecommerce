import { gql } from "@apollo/client";

// Query all of the products
export const allProducts = gql`
  query {
    allProducts {
      image {
        asset {
          url
        }
      }
      name
      price
      slug {
        current
      }
    }
    allCategory {
      name
      slug {
        current
      }
    }
  }
`;
