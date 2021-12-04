import { gql } from "@apollo/client";
import {
  COMMENT_FRAGMENT,
  FEED_PHOTO_FRAGMENT,
  PHOTO_FRAGMENT,
} from "./fragments";

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;
export const Login_mutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;
export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;
export const TOGGLE_FOLLOW_MUTATION = gql`
  mutation toggleFollow($username: String!) {
    toggleFollow(username: $username) {
      ok
      error
    }
  }
`;
export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      id
    }
  }
`;
export const EDIT_COMMENT_MUTATION = gql`
  mutation editComment($id: Int!, $payload: String!) {
    editComment(id: $id, payload: $payload) {
      ok
      id
    }
  }
`;
export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
    }
  }
`;
export const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String!) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO_FRAGMENT}
`;
export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;
