import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useRef } from "react";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { RootStackParamList } from "../types";
import AuthLayout from "../components/auth/AuthLayout";
import { StyledInput } from "../components/auth/AuthShared";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar, logUserIn } from "../apollo";
import { login, loginVariables } from "../__generated__/login";
import { Login_mutation } from "../mutations";

type FormProp = {
  username: string;
  password: string;
  result?: string;
};
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation, route: { params } }: Props) {
  const { register, handleSubmit, setValue, control, reset, formState, watch } =
    useForm<FormProp>({
      defaultValues: { username: params?.username, password: params?.password },
    });
  const [Login, { loading }] = useMutation<login, loginVariables>(
    Login_mutation,
    {
      onCompleted: async (data) => {
        const {
          login: { ok, error, token },
        } = data;
        if (error) {
          return;
        }
        if (ok) {
          await logUserIn(token);
        }
      },
    }
  );
  const passwordRef = useRef<TextInput>(null);
  const onNext = (nextOne: React.RefObject<TextInput>) => {
    nextOne.current?.focus();
  };

  const onValid: SubmitHandler<FormProp> = (data) => {
    if (!loading) Login({ variables: { ...data } });
  };

  return (
    <AuthLayout>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledInput
            placeholder="Username"
            placeholderTextColor="gray"
            autoCapitalize={"none"}
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledInput
            placeholder="password"
            autoCapitalize={"none"}
            secureTextEntry
            placeholderTextColor="gray"
            returnKeyType="done"
            lastOne={true}
            onChangeText={onChange}
            onSubmitEditing={handleSubmit(onValid)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      <AuthButton
        onPress={handleSubmit(onValid)}
        loading={loading}
        disabled={!watch("username") || !watch("password") || loading}
        text="Login"
      />
    </AuthLayout>
  );
}
