import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Prop = {
  iconName: any;
  color: string;
  focused: boolean;
};
export default function TabIcon({ focused, iconName, color }: Prop) {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={focused ? 24 : 20}
    />
  );
}
