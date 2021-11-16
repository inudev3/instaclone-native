import React from "react";
import styled from "styled-components/native";
import {
  seeFeed_seeFeed_comments,
  seeFeed_seeFeed_user,
} from "../__generated__/seeFeed";
import { CommentRow } from "./CommentRow";
import { TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import DismissKeyboard from "./DismissKeyboard";
import AuthLayout from "./auth/AuthLayout";
import { StyledInput } from "./auth/AuthShared";
import { seePhoto_seePhoto_user } from "../__generated__/seePhoto";
import { seePhotoComments_seePhotoComments } from "../__generated__/seePhotoComments";

type IProps = {
  author: seeFeed_seeFeed_user | seePhoto_seePhoto_user;
  caption: string;
  commentNumber: number;
  comments: seeFeed_seeFeed_comments[] | seePhotoComments_seePhotoComments[];
};
const CommentsContainer = styled.View`
  margin-top: 20px;
`;
const CommentCount = styled.Text`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;
const PostCommentContainer = styled.View`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.TextInput`
  width: 100%;
`;
export default function CommentSection({
  author,
  caption,
  commentNumber,
  comments,
}: IProps) {
  const { register, handleSubmit, control } = useForm();

  return (
    <CommentsContainer>
      {comments.map((comment) => (
        <CommentRow {...comment} avatar={true} />
      ))}
      <PostCommentContainer>
        <AuthLayout>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <PostCommentInput
                autoFocus
                placeholder="First Name"
                placeholderTextColor="gray"
                returnKeyType="next"
                onChangeText={onChange}
                value={value}
                onSubmitEditing={}
              />
            )}
            name="comment"
            rules={{ required: true }}
          />
        </AuthLayout>
      </PostCommentContainer>
    </CommentsContainer>
  );
}
