/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed_comments_user {
  __typename: "User";
  id: number;
  avatar: string | null;
  username: string;
}

export interface seeFeed_seeFeed_comments_photo {
  __typename: "Photo";
  id: number;
}

export interface seeFeed_seeFeed_comments {
  __typename: "Comment";
  id: number;
  user: seeFeed_seeFeed_comments_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
  photo: seeFeed_seeFeed_comments_photo;
}

export interface seeFeed_seeFeed {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: seeFeed_seeFeed_user;
  caption: string | null;
  createdAt: string;
  isMine: boolean;
  comments: (seeFeed_seeFeed_comments | null)[] | null;
}

export interface seeFeed {
  seeFeed: seeFeed_seeFeed[] | null;
}

export interface seeFeedVariables {
  lastId?: number | null;
}
