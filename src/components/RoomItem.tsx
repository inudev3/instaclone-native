import React from "react";
import styled from "styled-components/native";
import useMe from "../hooks/useMe";
import { seeRooms_seeRooms } from "../__generated__/seeRooms";
import { colors } from "../colors";
import { useNavigation } from "@react-navigation/native";
import { RoomsScreenProp } from "../types";

const RoomContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: black;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const RoomText = styled.Text`
  color: white;
`;
const Column = styled.View`
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
const Data = styled.View``;
const UnreadIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  color: white;
  margin-top: 2px;
  font-weight: 500;
`;
export default function RoomItem({
  users,
  unreadTotal,
  id,
}: seeRooms_seeRooms) {
  const navigation = useNavigation<RoomsScreenProp>();
  const { data: userData } = useMe();
  const talkingTo = users?.find(
    (user) => user?.username !== userData?.me?.username
  );

  return (
    <RoomContainer
      onPress={() => navigation.navigate("Room", { id, talkingTo })}
    >
      <Column>
        <Avatar source={{ uri: talkingTo?.avatar }} />
        <Data>
          <Username>{talkingTo?.username}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
        <UnreadIndicator />
      </Column>
      <RoomText>
        {unreadTotal === 0
          ? `${talkingTo?.username}`
          : `${unreadTotal} messages`}
      </RoomText>
    </RoomContainer>
  );
}
