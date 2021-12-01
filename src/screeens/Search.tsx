import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  useWindowDimensions,
  FlatList,
  Image,
  ListRenderItem,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { SearchScreenProp, TabParamList } from "../types";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";
import ScreenLayOut from "../components/ScreenLayout";
import {
  searchPhotos,
  searchPhotos_searchPhotos,
} from "../__generated__/searchPhotos";
import { USER_FRAGMENT } from "../fragments";
import { SEARCH_PHOTOS } from "../queries";

const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
`;
const Input = styled.TextInput<{ width: number }>`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 2}px;
  padding: 5px 10px;
  border-radius: 10px;
`;

export default function Search({ navigation, route }: SearchScreenProp) {
  const { width } = useWindowDimensions();
  const numColumns = 3;

  const renderItem: ListRenderItem<searchPhotos_searchPhotos> = ({
    item: photo,
  }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PhotoScreen", {
            photoId: photo.id,
          })
        }
      >
        <Image
          style={{
            width: width / numColumns,
            height: width / numColumns,
          }}
          source={{ uri: photo.file }}
        />
      </TouchableOpacity>
    );
  };
  const { handleSubmit, setValue, register, control, watch, getValues } =
    useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery<searchPhotos>(
    SEARCH_PHOTOS,
    {
      variables: {
        keyword: getValues("keyword"),
      },
    }
  );

  const SearchBox = () => {
    return (
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            width={width}
            placeholderTextColor="rgba(0,0,0,0.8)"
            placeholder="Search"
            autoCapitalize="none"
            returnKeyLabel="Search"
            returnKeyType="search"
            onChangeText={onChange}
            value={value}
            onSubmitEditing={() => startQueryFn}
            autoCorrect={false}
          />
        )}
        name="keyword"
        rules={{ required: true, minLength: 3 }}
      />
    );
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {!called ? (
          <MessageContainer>
            <MessageText>Searching by keyword</MessageText>
          </MessageContainer>
        ) : loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? ( //when we search
            <MessageContainer>
              <MessageText>Could not find anything</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchPhotos}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
