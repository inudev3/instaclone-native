/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_photos_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface seeProfile_seeProfile_photos {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: seeProfile_seeProfile_photos_user;
}

export interface seeProfile_seeProfile {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  firstName: string;
  lastName: string | null;
  totalFollowing: number;
  totalFollowers: number;
  isFollowing: boolean;
  isMe: boolean;
  photos: (seeProfile_seeProfile_photos | null)[] | null;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  username: string;
  lastId?: number | null;
}
