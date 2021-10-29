import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../types";
import Feed from "../screeens/Feed";
import Profile from "../screeens/Profile";
import Notifications from "../screeens/Notifications";
import Search from "../screeens/Search";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import Photo from "../screeens/Photo";

const Tabs = createBottomTabNavigator<TabParamList>();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "rgba(255,2555,255,0.2)",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" color={color} size={focused ? 24 : 20} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="search" color={color} size={focused ? 24 : 20} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Photo"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="camera" color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Photo" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="heart" color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="person" color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Profile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
