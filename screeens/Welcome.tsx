import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";

// const Container = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
//   background-color: black;
// `;
// const Logo = styled.Image`
//   width: 50%;
//   height: ;
// `;
// const CreateAccount = styled.View`
//   background-color: ${colors.blue};
//   padding: 10px 5px;
// `;
// const CreateAccountText = styled.Text`
//   color: white;
// `;
// const LoginLink = styled.Text`
//   color: ${colors.blue};
// `;
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 100px;
`;

const CreateAccount = styled.View`
  background-color: ${colors.blue};
  padding: 7px 10px;
  border-radius: 3px;
`;
const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
`;

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 10px;
`;

export default function Welcome({ navigation }) {
  return (
    <Container>
      <Logo
        resizeMode="contain"
        source={require("../assets/1200px-Instagram_logo.svg.png")}
      />
      <TouchableOpacity>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <LoginLink>Log in</LoginLink>
    </Container>
  );
}
