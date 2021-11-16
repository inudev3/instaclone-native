import { gql } from "@apollo/client";
import { PHOTO_FRAGMENT, USER_FRAGMENT } from "./fragments";

export const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;
export const SEEPROFILE_QUERY = gql`
  query seeProfile($username: String!, $lastId: Int) {
    seeProfile(username: $username) {
      id
      username
      email
      avatar
      bio
      firstName
      lastName
      totalFollowing
      totalFollowers
      isFollowing
      isMe
      photos(lastId: $lastId) {
        ...PhotoFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;
export const FEED_QUERY = gql`
  query seeFeed($lastId: Int) {
    seeFeed(lastId: $lastId) {
      id
      user {
        id
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
      createdAt
      isMine
      isLiked
    }
  }
`;
export const SEEPHOTOCOMMENTS_QUERY = gql`
  query seePhotoComments($id: Int!) {
    seePhotoComments(id: $id) {
      id
      user {
        ...UserFragment
      }
      photo {
        ...PhotoFragment
      }
      payload
      isMine
      createdAt
      updatedAt
    }
  }
  ${USER_FRAGMENT}
  ${PHOTO_FRAGMENT}
`;
