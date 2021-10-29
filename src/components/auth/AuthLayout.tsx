import React from "react";
import styled from "styled-components/native";
import { PropsWithChildren } from "../../types";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Platform } from "@unimodules/react-native-adapter";

const Container = styled.View`
  flex: auto;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
`;

export default function AuthLayout({ children }: PropsWithChildren<any>) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <KeyboardAvoidingView
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require("../../../assets/instagram-logo-black-on-white.webp")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
