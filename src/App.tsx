import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNavigator from "./navigators/LoggedOutNavigator";
import { NavigationContainer } from "@react-navigation/native";
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from "react-native-appearance";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNavigator";
import LoggedOutNav from "./navigators/LoggedOutNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("../assets/splash.png"),
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    const newPromises = [...imagePromises, ...fontPromises];
    return Promise.all<void | Asset[]>([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    await preloadAssets();
  };
  const subscription = Appearance.addChangeListener(({ colorScheme }) =>
    console.log(colorScheme)
  );
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const light = Appearance.getColorScheme() === "light";
  return loading ? (
    <AppLoading
      onError={console.warn}
      onFinish={onFinish}
      startAsync={preload}
    />
  ) : (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
