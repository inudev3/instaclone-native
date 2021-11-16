/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PhotoFragment
// ====================================================

export interface PhotoFragment_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface PhotoFragment {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: PhotoFragment_user;
}
