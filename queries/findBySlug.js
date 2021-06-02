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
    }
    allCategory {
      name
      slug {
        current
      }
    }
  }
`;
