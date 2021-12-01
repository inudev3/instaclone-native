import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import React, { useRef } from "react";
import styled from "styled-components/native";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { Platform } from "@unimodules/react-native-adapter";
import { StyledInput } from "../components/auth/AuthShared";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";
import { isLoggedInVar } from "../apollo";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { RootStackParamList } from "../types";
import { CREATE_ACCOUNT_MUTATION } from "../mutations";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
type FormProps = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};
export default function CreateAccount({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "CreateAccount">) {
  const { register, handleSubmit, control, formState, getValues, watch } =
    useForm<FormProps>();
  const [createAccountMutation, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      const { username, password } = getValues();
      const {
        createAccount: { ok },
      } = data;
      if (ok) {
        navigation.navigate("Login", { username, password });
      }
    },
  });

  const lastNameRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const onNext = (nextOne: React.RefObject<TextInput>) => {
    nextOne.current?.focus();
  };
  const onValid: SubmitHandler<FormProps> = (data) => {
    if (!loading)
      createAccountMutation({
        variables: { ...data },
      });
  };
  return (
    <AuthLayout>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledInput
            autoFocus
            placeholder="First Name"
            placeholderTextColor="gray"
            returnKeyType="next"
            onChangeText={onChange}
            value={value}
            onSubmitEditing={() => onNext(lastNameRef)}
          />
        )}
        name="firstName"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledInput
            ref={lastNameRef}
            placeholder="Last Name"
            placeholderTextColor="gray"
            returnKeyType="next"
            onChangeText={onChange}
            value={value}
            onSubmitEditing={() => onNext(usernameRef)}
          />
        )}
        name="lastName"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledInput
            ref={usernameRef}
            placeholder="Username"
            placeholderTextColor="gray"
            returnKeyType="next"
            onChangeText={onChange}
            value={value}
            onSubmitEditing={() => onNext(emailRef)}
          />
        )}
        name="username"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledInput
            ref={emailRef}
            placeholder="Email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={onChange}
            value={value}
            onSubmitEditing={() => onNext(passwordRef)}
          />
        )}
        name="email"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledInput
            ref={passwordRef}
            placeholder="password"
            secureTextEntry
            placeholderTextColor="gray"
            returnKeyType="done"
            onChangeText={onChange}
            value={value}
            onSubmitEditing={handleSubmit(onValid)}
            lastOne={true}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      <AuthButton
        loading={loading}
        onPress={handleSubmit(onValid)}
        disabled={
          !watch("username") || !watch("email") || !watch("password") || loading
        }
        text="Create Account"
      />
    </AuthLayout>
  );
}
