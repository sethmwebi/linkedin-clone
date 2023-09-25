import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://192.168.42.61:9000/api/linkedin/__graphql",
  headers: {
    Authorization:
      "apikey graphql::local.net+1000::230cd5297650f3fba42d686efe58676d383242944de4ecbf01d5177167982440"
  },
  cache: new InMemoryCache()
});

export default client;
