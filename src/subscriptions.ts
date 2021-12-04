import { gql } from "@apollo/client";

export const ROOM_UPDATE = gql`
  subscription roomUpdates($id: Int!) {
    id
    paylaod {
      username
      avatar
    }
    read
  }
`;
