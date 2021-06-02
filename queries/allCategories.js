import { gql } from "@apollo/client";

// Query all of the categories
export const allCategories = gql`
  query {
    allCategory {
      name
      slug {
        current
      }
    }
  }
`;
