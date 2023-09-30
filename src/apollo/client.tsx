import { ApolloClient, InMemoryCache, TypePolicies } from "@apollo/client";

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      postPaginatedList: {
        keyArgs: false,
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        }
      }
    }
  }
};

const client = new ApolloClient({
  uri: "http://192.168.42.104:9000/api/linkedin/__graphql",
  headers: {
    Authorization:
      "apikey graphql::local.net+1000::230cd5297650f3fba42d686efe58676d383242944de4ecbf01d5177167982440"
  },
  cache: new InMemoryCache({ typePolicies })
});

export default client;
