import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { seeFeed_seeFeed } from "../__generated__/seeFeed";
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  Modal,
  Alert,
} from "react-native";

import { FeedScreenProp, TabParamList } from "../types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { BSname } from "../__generated__/BSname";
import { toggleLike } from "../__generated__/toggleLike";
import { TOGGLE_LIKE_MUTATION } from "../mutations";

import { seePhoto_seePhoto } from "../__generated__/seePhoto";
import { CommentRow } from "./CommentRow";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const File = styled.Image``;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const Action = styled.TouchableOpacity``;
const Caption = styled.View`
  flex-direction: row;
  padding: 5px;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Likes = styled.TouchableOpacity`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;

export default function Photo({
  ...photo
}: seeFeed_seeFeed | seePhoto_seePhoto) {
  const { id, user, caption, file, isLiked, likes, commentNumber, comments } =
    photo;

  const [toggleLikeMutation, { data, loading, error }] =
    useMutation<toggleLike>(TOGGLE_LIKE_MUTATION, {
      variables: { id },
      //refetchQueries: [{ query: FEED_QUERY }], refetching the whole query is not a good idea
      update: (cache, result: any) => {
        console.log(isLiked);
        const {
          data: {
            toggleLike: { ok },
          },
        } = result;
        if (ok) {
          const photoId = `Photo:${id}`;
          cache.modify({
            id: photoId,
            fields: {
              isLiked(prev) {
                return !prev;
              },
              likes(prev) {
                if (isLiked) {
                  return prev - 1;
                }
                return prev + 1;
              },
            },
          });
        }
      },
    });
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const goToProfile = (_: any) => {
    navigation.navigate("Profile", { username: user.username, id: user.id });
  };
  const [imageHeight, setImageHeight] = useState(height - 450);

  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="contain"
        style={{ width, height: imageHeight }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <Action onPress={() => toggleLikeMutation()}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "white"}
              size={22}
            />
          </Action>
          <Action
            onPress={() => navigation.navigate("Comments", { photoId: id })}
          >
            <Ionicons name="chatbubble-outline" color="white" size={22} />
          </Action>
        </Actions>

        <Likes onPress={() => navigation.navigate("Likes", { photoId: id })}>
          <Text>{likes === 1 ? "1 like" : `${likes} likes`}</Text>
        </Likes>
        <Caption>
          <TouchableOpacity onPress={goToProfile}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
        {commentNumber > 3 ? (
          <>
            <Text>...댓글 {commentNumber - 3}개 더 보기</Text>
            {comments?.slice(-3, 3).map((comment) => (
              <CommentRow key={comment?.id} {...comment} fullView={false} />
            ))}
          </>
        ) : comments ? (
          comments.map((comment) => (
            <CommentRow key={comment?.id} {...comment} fullView={false} />
          ))
        ) : null}
      </ExtraContainer>
    </Container>
  );
}
