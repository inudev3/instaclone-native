import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItem,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../types";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { gql, useQuery } from "@apollo/client";
import ScreenLayOut from "../components/ScreenLayout";
import { seeFeed, seeFeed_seeFeed } from "../__generated__/seeFeed";
import Photo from "../components/Photo";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
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
  const { data, loading } = useQuery<seeFeed>(FEED_QUERY);
  console.log(data);
  const renderPhoto: ListRenderItem<seeFeed_seeFeed> = ({ item: photo }) => {
    return <Photo {...photo} />;
  };

  return (
    <ScreenLayOut loading={loading}>
      <FlatList
        data={data?.seeFeed}
        renderItem={renderPhoto}
        keyExtractor={(photo) => "" + photo.id}
      />
    </ScreenLayOut>
  );
}
