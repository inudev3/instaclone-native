import React from "react";
import styled from "styled-components/native";
import { seeFeed_seeFeed } from "../__generated__/seeFeed";

const Container = styled.View`
  background-color: white;
`;
const Header = styled.View``;
const UserAvatar = styled.Image``;
const Actions = styled.View``;
const File = styled.Image``;
const Username = styled.Text``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CaptionText = styled.Text``;
const Likes = styled.TouchableOpacity``;
export default function Photo({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
}: seeFeed_seeFeed) {
  return (
    <Container>
      <Header>
        <UserAvatar />
        <Username>{user.username}</Username>
        "Hi"
      </Header>
      <File
        style={{ width: "100px", height: "100px" }}
        source={{ uri: file }}
      />
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      <Caption>
        <Username>{user.username}</Username>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  );
}
