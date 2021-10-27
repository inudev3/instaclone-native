import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type RootStackParamList = {
  Login: {};
};
export default function Login({ navigation }) {
  console.log(navigation);
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
