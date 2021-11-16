import FollowBtn from "./FollowBtn";
import React from "react";
import { seePhotoComments_seePhotoComments } from "../__generated__/seePhotoComments";
import { useNavigation } from "@react-navigation/native";
import { CommentScreenProps } from "../types";
import styled from "styled-components/native";
import { View } from "react-native";

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
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
const Date = styled.Text`
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
  font-weight: 450;
  color: white;
`;
export const CommentRow = ({
  ...comment
}: seePhotoComments_seePhotoComments) => {
  const navigation = useNavigation<CommentScreenProps>();
  const { id, user, payload, isMine, createdAt } = comment;
  console.log(comment);
  return (
    <Wrapper>
      <Column
        onPress={() =>
          navigation.navigate("Profile", {
            id,
            username: user.username,
          })
        }
      >
        <Avatar source={{ uri: user.avatar }} />
        <CommentInfo>
          <View style={{ flexDirection: "row" }}>
            <Username>{user.username}</Username>
            <Payload>{payload}</Payload>
          </View>
          <View>
            <Date>{createdAt}</Date>
          </View>
        </CommentInfo>
      </Column>
    </Wrapper>
  );
};
