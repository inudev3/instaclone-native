import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccount from "../screeens/CreateAccount";
import Login from "../screeens/Login";
import Welcome from "../screeens/Welcome";

const Stack = createStackNavigator();

export default function LoggedOutNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{ title: "Welcome Baby", headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
