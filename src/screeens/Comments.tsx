import React, { useState } from "react";
import { CommentScreenProps } from "../types";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toggleLike } from "../__generated__/toggleLike";
import { CREATE_COMMENT_MUTATION, TOGGLE_LIKE_MUTATION } from "../mutations";
import {
  seePhotoComments,
  seePhotoComments_seePhotoComments,
} from "../__generated__/seePhotoComments";
import { SEEPHOTOCOMMENTS_QUERY } from "../queries";
import ScreenLayOut from "../components/ScreenLayout";
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { CommentRow } from "../components/CommentRow";
import useMe from "../hooks/useMe";
import { createComment } from "../__generated__/createComment";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { COMMENT_FRAGMENT } from "../fragments";
import { StyledInput } from "../components/auth/AuthShared";
import DismissKeyboard from "../components/DismissKeyboard";
import AuthLayout from "../components/auth/AuthLayout";
import styled from "styled-components/native";
import { CommentFragment } from "../__generated__/CommentFragment";

type createCommentForm = {
  commentPayload: string;
};
const Input = styled.TextInput<{ width: number }>`
  background-color: black;
  color: white;
  width: ${(props) => props.width / 2}px;
  padding: 5px 10px;
  border-radius: 10px;
`;
const SubmitBotton = styled.TouchableOpacity`
  background-color: black;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 20px;
`;
export default function Comments({
  navigation,
  route: { params },
}: CommentScreenProps) {
  const { data: userData } = useMe();
  const { register, handleSubmit, getValues, setValue, control } =
    useForm<createCommentForm>();
  const { data, loading, refetch } = useQuery<seePhotoComments>(
    SEEPHOTOCOMMENTS_QUERY,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        id: params?.photoId,
      },
    }
  );

  console.log(params);
  const [refreshing, setRefreshing] = useState(false);
  const { width, height } = useWindowDimensions();
  const [createCommentMutation, { data: createData, loading: createloading }] =
    useMutation<createComment>(CREATE_COMMENT_MUTATION, {
      update: (cache, result: any) => {
        const { commentPayload } = getValues();
        const {
          data: {
            createComment: { ok, id: newId },
          },
        } = result;
        setValue("commentPayload", "");
        if (ok && userData?.me) {
          const newComment = {
            __typename: "Comment",
            id: newId,
            createdAt: Date.now() + "",
            isMine: true,
            payload: commentPayload,
            user: {
              ...userData?.me,
            },
          };
          console.log(newComment);
          const fragmentId = `Photo:${params?.photoId}`;
          const newCacheComment = cache.writeFragment({
            data: newComment,
            fragment: COMMENT_FRAGMENT,
          });
          console.log(newCacheComment);
          cache.modify({
            id: `Photo:${params?.photoId}`,
            fields: {
              comments(prev) {
                return [...prev, newCacheComment];
              },
              commentNumber(prev) {
                return prev + 1;
              },
            },
          });
        }
      },
    });
  const onSubmitCreate = () => {
    const { commentPayload } = getValues();
    if (!createloading)
      createCommentMutation({
        variables: { photoId: params?.photoId, payload: commentPayload },
      });
    console.log(createData);
  };
  const renderItem: ListRenderItem<seePhotoComments_seePhotoComments> = ({
    item: comment,
  }) => <CommentRow fullView={true} {...comment} />;
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayOut loading={loading}>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        refreshing={refreshing}
        onRefresh={refresh}
        data={data?.seePhotoComments}
        renderItem={renderItem}
        keyExtractor={(comment) => "" + comment.id}
      />
      <DismissKeyboard>
        <KeyboardAvoidingView style={{ flexDirection: "row" }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                width={width}
                placeholder="Comment"
                placeholderTextColor="gray"
                returnKeyType="comment"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="commentPayload"
            rules={{ required: true }}
          />
          <SubmitBotton activeOpacity={0.7} onPress={() => onSubmitCreate()}>
            <Text style={{ color: "white", opacity: 0.7 }}>게시</Text>
          </SubmitBotton>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </ScreenLayOut>
  );
}
