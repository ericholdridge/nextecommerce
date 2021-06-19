import { gql } from "@apollo/client";

export const getPricesFromMultipleSlugs = gql`
  query ($slugs: [String!]) {
    allProducts(where: { slug: { current: { in: $slugs } } }) {
      price
      productSizeQuantity {
      inStock    
    }
    } 
  }
`;
