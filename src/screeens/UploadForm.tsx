import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { UploadFormScreenProp, UploadScreenProp } from "../types";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyledInput } from "../components/auth/AuthShared";

import { gql, makeReference, useMutation } from "@apollo/client";
import { colors } from "../colors";
import { UPLOAD_PHOTO_MUTATION } from "../mutations";
import { ReactNativeFile } from "apollo-upload-client";
import HeaderRight from "../components/HeaderRight";
import { COMMENT_FRAGMENT, FEED_PHOTO_FRAGMENT } from "../fragments";

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
type UploadForm = {
  caption: string;
};
export default function UploadForm({
  navigation,
  route: { params },
}: UploadFormScreenProp) {
  const { register, handleSubmit, control } = useForm<UploadForm>();
  console.log(params);
  const [uploadPhotoMutation, { loading, data, error }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: (cache, result: any) => {
        const {
          data: { uploadPhoto },
        } = result;

        if (uploadPhoto.id) {
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              seeFeed(prev) {
                return [uploadPhoto, ...prev];
              },
            },
          });
          navigation.navigate("Tabs");
        }
      },
    }
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator
      size="small"
      color={colors.blue}
      style={{ marginLeft: 10 }}
    />
  );
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText style={{ color: "white" }}>Next</HeaderRightText>
    </TouchableOpacity>
  );
  console.log(data);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const onValid: SubmitHandler<UploadForm> = (data) => {
    const file = new ReactNativeFile({
      uri: params?.uri,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    console.log(file);
    uploadPhotoMutation({
      variables: {
        caption: data.caption,
        file,
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: params?.uri }} />
        <CaptionContainer>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Caption
                placeholder="Write a caption..."
                placeholderTextColor="rgba(0,0,0,0.5)"
                autoCapitalize={"none"}
                returnKeyType="next"
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="caption"
            rules={{ required: true }}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
