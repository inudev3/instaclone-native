import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-media-library";
import {
  FlatList,
  Image,
  ListRenderItem,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import { SelectPhoroScreenProp, UploadScreenProp } from "../types";
import HeaderRight from "../components/HeaderRight";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;
const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;
const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;
export default function SelectPhoto({ navigation, route }: UploadScreenProp) {
  const [ok, setOk] = useState(false);
  const { width, height } = useWindowDimensions();
  const [photos, setPhotos] = useState<Asset[]>([]);
  const [chosenPhoto, setChosenPhoto] = useState<string>();
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };

  const getPermissions = async () => {
    const { canAskAgain, accessPrivileges } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      getPhotos();
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);
  console.log(chosenPhoto);
  const headerRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("UploadForm", { uri: chosenPhoto })}
    >
      <Text
        style={{
          color: colors.blue,
          fontSize: 16,
          fontWeight: "600",
          marginRight: 7,
        }}
      >
        Next
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, []);
  const choosePhoto = (uri: string) => {
    setChosenPhoto(uri);
  };

  const numColumns = 4;
  const renderItem: ListRenderItem<Asset> = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />

      <IconContainer>
        <Ionicons
          name="checkmark"
          size={18}
          color={photo.uri === chosenPhoto ? colors.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width: width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
          numColumns={4}
        />
      </Bottom>
    </Container>
  );
}
