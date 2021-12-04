import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RoomScreenProp } from "../types";
import { gql, useMutation, useQuery } from "@apollo/client";
import { MESSAGE_FRAGMENT, ROOM_FRAGMENT } from "../fragments";
import { SEE_ROOM_QUERY, SEE_ROOMS_QUERY } from "../queries";
import ScreenLayOut from "../components/ScreenLayout";
import {
  seeRoom,
  seeRoom_seeRoom,
  seeRoom_seeRoom_messages,
} from "../__generated__/seeRoom";
import styled from "styled-components/native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { colors } from "../colors";
import { SEND_MESSAGE_MUTATION } from "../mutations";
import useMe from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";
import { ROOM_UPDATE } from "../subscriptions";
import client from "../apollo";

type MessageProp = {
  isMine: boolean;
};
const MessageContainer = styled.View<MessageProp>`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
  align-items: flex-end;
`;
const Author = styled.View`
  margin-right: 10px;
`;
const Avatar = styled.Image`
  height: 25px;
  width: 25px;
  border-radius: 25px;
`;
const Username = styled.Text`
  color: black;
`;
const Message = styled.Text`
  color: black;
  background-color: ${colors.blue};
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 10px;
`;
const StyledInput = styled.TextInput`
  color: white;
  width: 90%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 1000px;
`;
const InputContainer = styled.View`
  margin-bottom: 50px;
  margin-top: 25px;
  width: 95%;
  flex-direction: row;
  align-items: center;
`;
const SendButton = styled.TouchableOpacity``;
export default function Room({
  navigation,
  route: { params },
}: RoomScreenProp) {
  const {
    data: roomData,
    loading,
    subscribeToMore,
  } = useQuery<seeRoom>(SEE_ROOM_QUERY, {
    variables: {
      id: params?.id,
    },
  });
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (roomData?.seeRoom) {
      subscribeToMore({
        document: ROOM_UPDATE,
        variables: { id: params?.id },

        updateQuery: (prevQuery, options) => {
          const {
            subscriptionData: {
              data: { seeRoom: message },
            },
          } = options;
          if (message?.id) {
            const messageFragment = client.cache.writeFragment({
              fragment: MESSAGE_FRAGMENT,
              data: message,
              fragmentName: "messageFragment",
            });
            client.cache.modify({
              id: `Room:${params?.id}`,
              fields: {
                messages(prev) {
                  const existing = prev.find(
                    (aMessage) => aMessage.__ref === messageFragment?.__ref
                  );
                  if (existing) {
                    return prev;
                  } else {
                    return [messageFragment, ...prev];
                  }
                },
              },
            });
          }
        },
      });
    }
  }, [roomData]);
  const { data: userData } = useMe();
  const { watch, handleSubmit, control, setValue, getValues } = useForm();
  const [sendMessageMutation, { data: sendData, loading: sendLoading }] =
    useMutation(SEND_MESSAGE_MUTATION, {
      update: (cache, result: any) => {
        const {
          data: {
            sendMessage: { ok, id: newId },
          },
        } = result;
        const { message } = getValues();
        setValue("message", "");
        if (ok && userData) {
          const newMessage = {
            __typename: "Message",
            id: newId,
            read: true,
            user: {
              ...userData?.me,
            },
            payload: message,
          };
          const newCacheMessage = cache.writeFragment({
            fragment: MESSAGE_FRAGMENT,
            data: newMessage,
            fragmentName: "messageFragment",
          });
          cache.modify({
            id: `Room:${params?.id}`,
            fields: {
              messages(prev) {
                return [newCacheMessage, ...prev];
              },
            },
          });
        }
      },
    });
  useEffect(() => {
    navigation.setOptions({
      title: `Conversation with ${params?.talkingTo}`,
    });
  }, []);
  const onValid: SubmitHandler<{ message: string }> = (data) => {
    if (!sendLoading) {
      sendMessageMutation({
        variables: {
          payload: data.message,
          roomId: roomData?.seeRoom?.id,
        },
      });
    }
  };
  const renderItem: ListRenderItem<seeRoom_seeRoom_messages> = ({
    item: message,
  }) => {
    return (
      <MessageContainer
        isMine={message.user.username !== params?.talkingTo.username}
      >
        <Author>
          <Avatar source={{ uri: message.user.avatar }} />
          <Username>{message.user.username}</Username>
        </Author>
        <Message>{message.payload}</Message>
      </MessageContainer>
    );
  };
  const messages = [...(roomData?.seeRoom?.messages ?? [])];
  messages.reverse();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={100}
    >
      <ScreenLayOut loading={loading}>
        <FlatList
          style={{ width: "100%" }}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(message) => "" + message.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          inverted
        />
        <InputContainer>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                autoFocus
                placeholder="Write a Message..."
                placeholderTextColor="rgba(255,255,255,0.5)"
                onChangeText={onChange}
                value={value}
                returnKeyLabel="Send Message"
                returnKeyType="send"
                onSubmitEditing={handleSubmit(onValid)}
              />
            )}
            name="message"
            rules={{ required: true }}
          />
          <SendButton disabled={!Boolean(watch("message"))}>
            <Ionicons
              name="send"
              color={
                !Boolean(watch("message")) ? "rgba(255,255,255,0.5)" : "white"
              }
              size={22}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayOut>
    </KeyboardAvoidingView>
  );
}
