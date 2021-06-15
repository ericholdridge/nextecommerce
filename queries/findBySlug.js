import { gql } from "@apollo/client";

export const findBySlug = gql`
  query ($slug: String!) {
    allProducts(where: { slug: { current: { eq: $slug } } }) {
      description
      name
      price
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
