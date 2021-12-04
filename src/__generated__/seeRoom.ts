/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRoom
// ====================================================

export interface seeRoom_seeRoom_messages_user {
  __typename: "User";
  avatar: string | null;
  username: string;
}

export interface seeRoom_seeRoom_messages {
  __typename: "Message";
  id: number;
  user: seeRoom_seeRoom_messages_user;
  read: boolean;
  payload: string;
}

export interface seeRoom_seeRoom {
  __typename: "Room";
  id: number;
  messages: seeRoom_seeRoom_messages[] | null;
}

export interface seeRoom {
  seeRoom: seeRoom_seeRoom | null;
}

export interface seeRoomVariables {
  id: number;
}
