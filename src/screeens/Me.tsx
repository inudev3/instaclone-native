import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../types";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import useMe from "../hooks/useMe";
import { me } from "../__generated__/me";
import Profile from "./Profile";

export default function Me({
  navigation,
  route: { params },
}: BottomTabScreenProps<TabParamList, "Me">) {
  const { data } = useMe();
  console.log(data);
  useEffect(() => {
    navigation.setOptions({ title: data?.me?.username });
  }, []);
  return navigation.navigate("Profile", { username: data?.me?.username });
}
