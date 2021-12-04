/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: uploadPhoto
// ====================================================

export interface uploadPhoto_uploadPhoto_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface uploadPhoto_uploadPhoto_comments_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  username: string;
}

export interface uploadPhoto_uploadPhoto_comments_photo {
  __typename: "Photo";
  id: number;
}

export interface uploadPhoto_uploadPhoto_comments {
  __typename: "Comment";
  id: number;
  user: uploadPhoto_uploadPhoto_comments_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
  photo: uploadPhoto_uploadPhoto_comments_photo;
}

export interface uploadPhoto_uploadPhoto {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: uploadPhoto_uploadPhoto_user;
  caption: string | null;
  createdAt: string;
  isMine: boolean;
  comments: (uploadPhoto_uploadPhoto_comments | null)[] | null;
}

export interface uploadPhoto {
  uploadPhoto: uploadPhoto_uploadPhoto | null;
}

export interface uploadPhotoVariables {
  file: any;
  caption: string;
}
