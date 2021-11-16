import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItem,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FeedScreenProp, TabParamList } from "../types";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { gql, useQuery } from "@apollo/client";
import ScreenLayOut from "../components/ScreenLayout";
import { seeFeed, seeFeed_seeFeed } from "../__generated__/seeFeed";
import Photo from "../components/Photo";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { set } from "react-hook-form";
import { FEED_QUERY } from "../queries";

export default function Feed(props: FeedScreenProp) {
  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, fetchMore, refetch } = useQuery<seeFeed>(FEED_QUERY, {
    variables: {
      lastId: 0,
      ...(props.route.params?.userId && { userId: props.route.params?.userId }),
    },
  });
  console.log(data?.seeFeed?.length);
  const renderPhoto: ListRenderItem<seeFeed_seeFeed> = ({ item: photo }) => {
    return <Photo key={photo.id + ""} {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayOut loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={async () => {
          await fetchMore({
            variables: {
              lastId: data?.seeFeed?.length,
            },
          });
        }}
        onEndReachedThreshold={1}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        renderItem={renderPhoto}
        keyExtractor={(photo) => "" + photo.id}
      />
    </ScreenLayOut>
  );
}
// variables: {
//   lastId: 0,
// },
