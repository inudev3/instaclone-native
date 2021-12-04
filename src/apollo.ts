import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
  useApolloClient,
  useReactiveVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import { persistCache } from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token: any) => {
  await AsyncStorage.setItem("token", token);
  isLoggedInVar(true);
  tokenVar(token);
  console.log(isLoggedInVar);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem("token");
  isLoggedInVar(false);
  tokenVar("");
};
const httpLink = createHttpLink({
  uri: "http://bbf3-39-118-200-159.ngrok.io/graphql",
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
  uri:
    process.env.NODE_ENV === "production"
      ? "https://instaclone-backend-inust33.herokuapp.com/graphql"
      : "http://adf5-39-118-200-159.ngrok.io/graphql",
});
const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "wss://instaclone-backend-inust33.herokuapp.com/graphql"
      : "ws://adf5-39-118-200-159.ngrok.io/graphql",
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: tokenVar(),
    }),
  },
});
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        //
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
const allHttpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  uploadHttpLink
);

export const client = new ApolloClient({
  link: allHttpLinks, //httpLink should be the terminating link
  cache,
});

export default client;
