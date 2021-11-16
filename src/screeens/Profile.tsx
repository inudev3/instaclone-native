import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { ProfileScreenProp, TabParamList } from "../types";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  seeProfile,
  seeProfile_seeProfile_photos,
} from "../__generated__/seeProfile";
import styled from "styled-components/native";
import FollowBtn from "../components/FollowBtn";
import { toggleFollow } from "../__generated__/toggleFollow";
import { PHOTO_FRAGMENT } from "../fragments";

import { seeFeed_seeFeed } from "../__generated__/seeFeed";
import Photo from "../components/Photo";
import { SEEPROFILE_QUERY } from "../queries";
import { TOGGLE_FOLLOW_MUTATION } from "../mutations";

const Header = styled.View`
  height: 120px;
  display: flex;
  flex-direction: row;
  background-color: black;
`;
const AvatarContainer = styled.View`
  display: flex;
  width: 35%;
  margin: 0px 15px;
  justify-content: center;
  align-items: center;
`;
const UserAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;
const UserInfo = styled.View`
  width: 65%;
`;
const UserName = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Count = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 500;
`;
const Follow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Name = styled.View`
  Text {
    font-size: 16px;
    color: white;
  }
`;

const Separator = styled.View``;
const ProfilePhoto = styled.TouchableOpacity`
  width: 33vw;
  height: 150px;
  flex: 1;
  overflow: hidden;
`;
const PhotoContainer = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;
const BioText = styled.Text``;
export default function Profile({
  navigation,
  route: { params },
}: ProfileScreenProp) {
  console.log(params);
  const { data, loading, refetch, fetchMore } = useQuery<seeProfile>(
    SEEPROFILE_QUERY,
    {
      variables: {
        username: params?.username,
        lastId: 0,
      },
    }
  );
  const [toggleFollow, { data: FollowData }] = useMutation<toggleFollow>(
    TOGGLE_FOLLOW_MUTATION,
    {
      variables: { username: params?.username },
    }
  );
  const { width, height } = useWindowDimensions();

  console.log(data);
  const renderPhoto: ListRenderItem<seeProfile_seeProfile_photos> = ({
    item: photo,
  }) => {
    return (
      <ProfilePhoto
        onPress={() =>
          navigation.navigate("Feed", {
            userId: photo.user.id,
            lastId: photo.id,
          })
        }
      >
        <Image
          source={{ uri: photo?.file }}
          style={{ height: width / 3, width: width / 3, borderColor: "white" }}
        />
      </ProfilePhoto>
    );
  };

  return (
    <>
      <Header>
        <AvatarContainer>
          <UserAvatar source={{ uri: data?.seeProfile?.avatar }} />
        </AvatarContainer>
        <UserInfo>
          <UserName>
            <Text style={{ width: 50, color: "white", fontWeight: 500 }}>
              {data?.seeProfile?.username}
            </Text>
            <FollowBtn
              toggle={toggleFollow}
              isMe={data?.seeProfile?.isMe}
              isFollowing={data?.seeProfile?.isFollowing}
            />
          </UserName>
          <Follow>
            <Count>{data?.seeProfile?.totalFollowers}</Count>
            <Count>{data?.seeProfile?.totalFollowing}</Count>
          </Follow>
          <Name>
            <Text>{data?.seeProfile?.firstName}</Text>
            <Text>{data?.seeProfile?.lastName}</Text>
          </Name>
        </UserInfo>
      </Header>
      <PhotoContainer>
        <FlatList
          numColumns={3}
          data={data?.seeProfile?.photos}
          renderItem={renderPhoto}
          ItemSeparatorComponent={() => <Separator />}
          onEndReachedThreshold={1}
          keyExtractor={(photo) => "" + photo.id}
          onEndReached={async () => {
            await fetchMore({
              variables: {
                username: params?.username,
                lastId: data?.seeProfile?.photos?.length,
              },
            });
          }}
        />
      </PhotoContainer>
    </>
  );
}
