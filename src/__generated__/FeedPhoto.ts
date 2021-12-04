/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedPhoto
// ====================================================

export interface FeedPhoto_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface FeedPhoto_comments_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  username: string;
}

export interface FeedPhoto_comments_photo {
  __typename: "Photo";
  id: number;
}

export interface FeedPhoto_comments {
  __typename: "Comment";
  id: number;
  user: FeedPhoto_comments_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
  photo: FeedPhoto_comments_photo;
}

export interface FeedPhoto {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: FeedPhoto_user;
  caption: string | null;
  createdAt: string;
  isMine: boolean;
  comments: (FeedPhoto_comments | null)[] | null;
}
