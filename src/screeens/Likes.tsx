import React, { useState } from "react";
import { LikeScreenProps } from "../types";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGMENT } from "../fragments";
import ScreenLayOut from "../components/ScreenLayout";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import {
  seePhotoLikes,
  seePhotoLikes_seePhotoLikes,
} from "../__generated__/seePhotoLikes";
import UserRow from "../components/UserRow";
import styled from "styled-components/native";

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
const Separator = styled.View`
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
`;

export default function Likes({ navigation, route }: LikeScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery<seePhotoLikes>(LIKES_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route?.params?.photoId,
  });
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const renderUser: ListRenderItem<seePhotoLikes_seePhotoLikes> = ({
    item: user,
  }) => <UserRow {...user} />;
  console.log(data, route);
  return (
    <ScreenLayOut loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={{
          width: "100%",
          height: "100%",
        }}
        ItemSeparatorComponent={() => <Separator />}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => item?.id + ""}
        renderItem={renderUser}
      />
    </ScreenLayOut>
  );
}
