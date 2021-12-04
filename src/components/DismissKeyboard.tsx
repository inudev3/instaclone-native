import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Platform } from "@unimodules/react-native-adapter";
import { PropsWithChildren } from "../types";
import React from "react";

export default function DismissKeyboard({ children }: PropsWithChildren<any>) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={dismissKeyboard}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
