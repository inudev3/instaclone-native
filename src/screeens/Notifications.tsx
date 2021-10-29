import React from "react";
import { View, Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../types";

export default function Notifications(
  props: BottomTabScreenProps<TabParamList, "Notifications">
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
