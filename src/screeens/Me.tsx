import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../types";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import useMe from "../hooks/useMe";
import { me } from "../__generated__/me";

export default function Me({
  navigation,
  route: { params },
}: NativeStackScreenProps<TabParamList, "Me">) {
  const { data } = useMe();
  console.log(data);
  useEffect(() => {
    navigation.setOptions({ title: data?.me?.username });
  }, []);
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
