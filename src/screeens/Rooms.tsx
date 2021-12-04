import React, { useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { SEE_ROOMS_QUERY } from "../queries";
import ScreenLayOut from "../components/ScreenLayout";
import { seeRooms, seeRooms_seeRooms } from "../__generated__/seeRooms";
import useMe from "../hooks/useMe";
import { colors } from "../colors";
import Room from "../components/RoomItem";
import { RoomsScreenProp } from "../types";
import RoomItem from "../components/RoomItem";

const Separator = styled.View`
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
`;
export default function Rooms({ navigation, route }: RoomsScreenProp) {
  const { data, loading, refetch } = useQuery<seeRooms>(SEE_ROOMS_QUERY);
  console.log(data);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const renderItem: ListRenderItem<seeRooms_seeRooms> = ({ item: room }) => {
    return <RoomItem {...room} />;
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayOut loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        ItemSeparatorComponent={() => <Separator />}
        style={{ width: "100%" }}
        data={data?.seeRooms}
        renderItem={renderItem}
        keyExtractor={(room) => "" + room.id}
      />
    </ScreenLayOut>
  );
}
