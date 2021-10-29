import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccount from "../screeens/CreateAccount";
import Login from "../screeens/Login";
import Welcome from "../screeens/Welcome";
import { RootStackParamList } from "../types";

const Stack = createStackNavigator<RootStackParamList>();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: true,
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
