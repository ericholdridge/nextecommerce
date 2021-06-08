import { gql } from "@apollo/client";

export const findBySlug = gql`
  query ($slug: String!) {
    allProducts(where: { slug: { current: { eq: $slug } } }) {
      name
      price
      image {
        asset {
          url
        }
      }
      productSizeQuantity {
      color
      size
      quantity
      inStock
      stock
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
