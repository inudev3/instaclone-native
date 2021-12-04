import FollowBtn from "./FollowBtn";
import React, { useState } from "react";
import { seePhotoComments_seePhotoComments } from "../__generated__/seePhotoComments";
import { useNavigation } from "@react-navigation/native";
import { CommentScreenProps } from "../types";
import styled from "styled-components/native";
import { Button, Text, View } from "react-native";
import { useMutation } from "@apollo/client";
import {
  CREATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  EDIT_COMMENT_MUTATION,
} from "../mutations";
import { createComment } from "../__generated__/createComment";
import { editComment } from "../__generated__/editComment";
import { deleteComment } from "../__generated__/deleteComment";
import { cache } from "../apollo";
import { SubmitHandler, useForm } from "react-hook-form";
import useMe from "../hooks/useMe";
import { seeFeed_seeFeed_comments } from "../__generated__/seeFeed";

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 15px;
`;
const CommentInfo = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;
const TimeStamp = styled.Text`
  font-size: 12px;
  opacity: 0.5;
  color: white;
`;
const Username = styled.Text`
  font-weight: 600;
  color: white;
  margin-right: 10px;
`;
const Payload = styled.Text`
  font-weight: 400;
  color: white;
`;
const DeleteButton = styled.TouchableOpacity`
  background-color: black;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 20px;
`;
type CommentForm = {
  edit: string;
};
export const CommentRow = ({
  fullView,
  ...comment
}: (seeFeed_seeFeed_comments | seePhotoComments_seePhotoComments) & {
  fullView: boolean;
}) => {
  const { register, handleSubmit, getValues, control, setValue } =
    useForm<CommentForm>();

  const { id, user, payload, isMine, createdAt, photo } = comment;

  const [deleteCommentMutation, { data: deleteData, loading: deleteLoading }] =
    useMutation<deleteComment>(DELETE_COMMENT_MUTATION, {
      variables: { id },
      update: (cache, result) => {
        const {
          data: {
            deleteComment: { ok },
          },
        } = result as any;
        if (ok) {
          cache.evict({ id: `Comment:${id}` });
          cache.modify({
            id: `Photo:${photo.id}`,
            fields: {
              commentNumber(prev) {
                return prev - 1;
              },
            },
          });
        }
      },
    });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  const navigation = useNavigation<CommentScreenProps>();

  return (
    <Wrapper>
      <Column>
        {fullView ? <Avatar source={{ uri: user.avatar }} /> : null}
        <CommentInfo style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <Username
                onPress={() =>
                  navigation.navigate("Profile", { username: user.username })
                }
              >
                {user.username}
              </Username>
              <Payload>{payload}</Payload>
            </View>
            {fullView && (
              <View>
                <TimeStamp>{new Date(createdAt).toTimeString()}</TimeStamp>
              </View>
            )}
          </View>
        </CommentInfo>
      </Column>
      {isMine ? (
        <View style={{ flexDirection: "row" }}>
          <DeleteButton activeOpacity={0.7} onPress={() => onDeleteClick()}>
            <Text style={{ color: "white", opacity: 0.7 }}>Delete</Text>
          </DeleteButton>
        </View>
      ) : null}
    </Wrapper>
  );
};
