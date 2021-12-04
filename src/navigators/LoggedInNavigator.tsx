import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginStackParamList, TabParamList } from "../types";

import useMe from "../hooks/useMe";
import { me } from "../__generated__/me";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";

import UploadNav from "./UploadNav";
import UploadForm from "../screeens/UploadForm";
import { Ionicons } from "@expo/vector-icons";
import MessagesNav from "./MessagesNav";

const Stack = createStackNavigator<LoginStackParamList>();

export default function LoggedInNav() {
  const { data } = useMe();
  console.log(data);
  return (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name={"Tabs"}
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name={"Upload"}
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name={"UploadForm"}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          title: "Upload Photo",
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
        }}
        component={UploadForm}
      />
      <Stack.Screen
        name="Messages"
        component={MessagesNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
