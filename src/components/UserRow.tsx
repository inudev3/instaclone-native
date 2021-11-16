import React from "react";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";
import { seePhotoLikes_seePhotoLikes } from "../__generated__/seePhotoLikes";
import { toggleFollow } from "../__generated__/toggleFollow";
import { colors } from "../colors";
import FollowBtn from "./FollowBtn";
import { useNavigation } from "@react-navigation/native";
import { LikeScreenProps } from "../types";
import { TOGGLE_FOLLOW_MUTATION } from "../mutations";

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
`;
const Username = styled.Text`
  font-weight: 600;
  color: white;
`;

export default function UserRow({
  id,
  avatar,
  username,
  isFollowing,
  isMe,
}: seePhotoLikes_seePhotoLikes) {
  const navigation = useNavigation<LikeScreenProps>();
  const [toggleFollowMutation, { data, loading }] = useMutation<toggleFollow>(
    TOGGLE_FOLLOW_MUTATION,
    {
      variables: {
        username,
      },
      update: (cache, result: any) => {
        const {
          data: {
            toggleFollow: { ok, error },
          },
        } = result;
        if (ok) {
          const UserId = `User:${id}`;
          cache.modify({
            id: UserId,
            fields: {
              isFollowing(prev) {
                return !prev;
              },
            },
          });
        }
      },
    }
  );
  console.log(isFollowing);
  return (
    <Wrapper>
      <Column
        onPress={() =>
          navigation.navigate("Profile", {
            id,
            username,
          })
        }
      >
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      <FollowBtn
        isFollowing={isFollowing}
        isMe={isMe}
        toggle={toggleFollowMutation}
      />
    </Wrapper>
  );
}
