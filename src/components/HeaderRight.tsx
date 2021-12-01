import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

type Prop = {
  text: string;
  onPress: (event: GestureResponderEvent) => void | Promise<void>;
};
export default function HeaderRight({ text, onPress }: Prop) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
