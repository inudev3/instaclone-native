import { gql } from "@apollo/client";
import {
  COMMENT_FRAGMENT,
  PHOTO_FRAGMENT,
  ROOM_FRAGMENT,
  USER_FRAGMENT,
} from "./fragments";

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
      ...PhotoFragment
      caption
      createdAt
      isMine
      comments {
        ...CommentFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;
export const SEEPHOTOCOMMENTS_QUERY = gql`
  query seePhotoComments($id: Int!) {
    seePhotoComments(id: $id) {
      id
      user {
        ...UserFragment
      }
      payload
      isMine
      createdAt
      photo {
        ...PhotoFragment
      }
    }
  }
  ${USER_FRAGMENT}
  ${PHOTO_FRAGMENT}
`;
export const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      caption
      createdAt
      isMine
      comments {
        ...CommentFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;
export const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomFragment
    }
  }
  ${ROOM_FRAGMENT}
`;
export const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        user {
          avatar
          username
        }
        read
        payload
      }
    }
  }
`;
