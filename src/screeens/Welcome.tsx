import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { RootStackParamList } from "../types";

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

const LoginLink = styled.Text`
  color: ${colors.blue}
  font-weight: 600;
  margin-top: 20px;
`;
type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;
export default function Welcome({ navigation }: Props) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <AuthLayout>
      <AuthButton
        loading={false}
        text="Create New Account"
        disabled={false}
        onPress={goToCreateAccount}
      />

      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
