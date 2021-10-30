import { ActivityIndicator, View } from "react-native";
import React from "react";
import { PropsWithChildren } from "../types";

export default function ScreenLayOut({
  loading,
  children,
}: PropsWithChildren<{ loading: boolean }>) {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? <ActivityIndicator color="white" size="large" /> : children}
    </View>
  );
}
