import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from "expo-app-loading";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import {Asset} from "expo-asset";



export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish= ()=>setLoading(false);
  const preload = async ()=>{
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font)=>Font.loadAsync(font));
    const imagesToLoad = [require("./assets/splash.png"), "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",]
    const imagePromises = imagesToLoad.map(image=>Asset.loadAsync(image));
    const newPromises = [...imagePromises,...fontPromises];

    await Promise.all<Promise<void>|Promise<Asset[]>>([...fontPromises,...imagePromises]);

  }
  if(loading){
    return <AppLoading onError={console.warn}  onFinish={onFinish} startAsync={preload} />
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
