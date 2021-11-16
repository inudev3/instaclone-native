import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { me } from "../__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

function useMe() {
  const hasToken = useReactiveVar(isLoggedInVar);

  const { loading, data } = useQuery<me>(ME_QUERY, {
    // to query
    skip: !hasToken, //if not logged in, do not execute query
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
}

export default useMe;
