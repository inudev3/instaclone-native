/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RoomFragment
// ====================================================

export interface RoomFragment_users {
  __typename: "User";
  avatar: string | null;
  username: string;
}

export interface RoomFragment {
  __typename: "Room";
  id: number;
  unreadTotal: number;
  users: (RoomFragment_users | null)[] | null;
}
