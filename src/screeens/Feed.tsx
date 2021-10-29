import React from "react";
import { View, Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../types";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

export const FEED_QUERY = gql`
  query seeFeed($lastId: Int) {
    seeFeed(lastId: $lastId) {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed(
  props: BottomTabScreenProps<TabParamList, "Feed">
) {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Hello</Text>
    </View>
  );
}
