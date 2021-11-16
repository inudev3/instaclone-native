import styled from "styled-components/native";
import { colors } from "../colors";
import React from "react";

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;
type FollowProps = {
  toggle: any;
  isMe: boolean;
  isFollowing: boolean;
};
export default function FollowBtn({ toggle, isFollowing, isMe }: FollowProps) {
  return isMe ? null : (
    <Button onPress={() => toggle()}>
      <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
    </Button>
  );
}
