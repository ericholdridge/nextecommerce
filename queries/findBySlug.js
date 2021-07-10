import { gql } from "@apollo/client";

export const findBySlug = gql`
  query ($slug: String!) {
    allProducts(where: { slug: { current: { eq: $slug } } }) {
      _id
      description
      name
      price
      productWeight
      slug {
        current
      }
      image {
        asset {
          url
        }
      }
      productSizeQuantity {
        inStock
        stock
        size
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
