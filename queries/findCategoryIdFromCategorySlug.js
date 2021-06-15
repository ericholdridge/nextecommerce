import { gql } from "@apollo/client";

export const findCategoryIdFromCategorySlug = gql`
  query($categorySlug: String!) {
    allCategory(where: { slug: { current: { eq: $categorySlug } } }) {
      _id
      name
    }
  }
`;
