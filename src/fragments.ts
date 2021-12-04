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
export const FEED_PHOTO_FRAGMENT = gql`
  fragment FeedPhoto on Photo {
    ...PhotoFragment
    caption
    createdAt
    isMine
    comments {
      ...CommentFragment
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;
export const ROOM_FRAGMENT = gql`
  fragment RoomFragment on Room {
    id
    unreadTotal
    users {
      avatar
      username
    }
  }
`;
export const MESSAGE_FRAGMENT = gql`
  fragment messageFragment on Message {
    id
    payload
    user {
      avatar
      username
    }
    read
  }
`;
