import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Rooms from "../screeens/Rooms";
import Room from "../screeens/Room";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
export default function MessagesNav({}) {
  console.log("hi");
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: "black" },
      }}
    >
      <Stack.Screen
        name="Rooms"
        component={Rooms}
        options={{
          headerBackImage: ({ tintColor }) => (
            <Ionicons name="chevron-down" size={25} color={tintColor} />
          ),
        }}
      />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
