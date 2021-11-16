import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { PhotoScreenProp, TabParamList } from "../types";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useQuery } from "@apollo/client";
import { SEE_PHOTO_QUERY } from "../queries";
import Photo from "../components/Photo";
import ScreenLayOut from "../components/ScreenLayout";

export default function PhotoScreen({
  navigation,
  route: { params },
}: PhotoScreenProp) {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEE_PHOTO_QUERY, {
    variables: {
      id: params?.photoId,
    },
  });
  console.log(data);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayOut loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "black" }}
        contentContainerStyle={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Photo {...data?.seePhoto} fullView={true} />
      </ScrollView>
    </ScreenLayOut>
  );
}
