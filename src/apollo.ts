import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { persistCache } from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token: any) => {
  await AsyncStorage.setItem("token", token);
  isLoggedInVar(true);
  tokenVar(token);
};
export const logUserOut = async () => {
  await AsyncStorage.removeItem("token");
  isLoggedInVar(false);
  tokenVar("");
};
const httpLink = createHttpLink({
  uri: "http://ba9d-39-118-200-159.ngrok.io/graphql",
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});
const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("GraphQL Error", graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});
const uploadHttpLink = createUploadLink({
  uri: "http://548f-39-118-200-159.ngrok.io/graphql",
});
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
        //     {
        //   keyArgs: false,
        //   merge(existing = [], incoming = []) {
        //     return [...existing, ...incoming];
        //   },
        // },
      },
    },
  },
});

export const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink), //httpLink should be the terminating link
  cache,
});
export default client;
