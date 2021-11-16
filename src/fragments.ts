import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
  }
`;
export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
    user {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      id
      avatar
      username
    }
    payload
    isMine
    createdAt
  }
`;
