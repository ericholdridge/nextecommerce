import { gql } from "@apollo/client";

export const findProductsFromCategoryId = gql`
  query($categoryId: ID!) {
    allProducts(
      where: { _: { references: $categoryId } }
    ) {
      name
      price
      image {
        asset {
          url
        }
      }
      slug {
      current
    }
    }
  }
`;
