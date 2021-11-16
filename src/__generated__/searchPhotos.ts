/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchPhotos
// ====================================================

export interface searchPhotos_searchPhotos_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface searchPhotos_searchPhotos {
  __typename: "Photo";
  id: number;
  file: string;
  user: searchPhotos_searchPhotos_user;
}

export interface searchPhotos {
  searchPhotos: (searchPhotos_searchPhotos | null)[] | null;
}

export interface searchPhotosVariables {
  keyword: string;
}
