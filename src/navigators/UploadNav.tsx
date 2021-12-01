import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screeens/SelectPhoto";
import TakePhoto from "../screeens/TakePhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { colors } from "../colors";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "red", top: 0 },
      }}
    >
      <Tab.Screen name="SelectRoot">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "black",
                shadowOpacity: 0.3,
              },

              headerBackTitleVisible: false,
              headerTintColor: "white",
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              options={{ title: "Choose a Photo" }}
              name="Select"
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="TakeRoot" component={TakePhoto} />
    </Tab.Navigator>
  );
}
