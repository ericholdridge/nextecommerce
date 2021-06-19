import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: "https://nqmw43nk.api.sanity.io/v1/graphql/production/default",
  cache: new InMemoryCache(),
});