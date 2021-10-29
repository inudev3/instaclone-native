import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../types";

export default function Photo({
  navigation,
}: BottomTabScreenProps<TabParamList, "Photo">) {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={{ color: "white" }}>Someone's Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
