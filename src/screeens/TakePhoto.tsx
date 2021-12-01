import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Camera } from "expo-camera";
import { Alert, Image, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { set } from "react-hook-form";
import { TakePhotoScreenProp, UploadScreenProp } from "../types";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.3;
  align-items: center;
  justify-content: space-around;
`;
const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;
const ButtonsContainer = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  align-items: center;
  padding: 0px 50px;
`;
const SliderContainer = styled.View``;
const ActionsContainer = styled.View`
  flex-direction: row;
`;
const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;
const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;
export default function TakePhoto({ navigation, route }: UploadScreenProp) {
  const camera = useRef<Camera>(null);
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState<boolean>(false);
  const { on, off, auto } = Camera.Constants.FlashMode;
  const [flashMode, setFlashMode] = useState(on);
  const { front, back } = Camera.Constants.Type;
  const [cameraType, setCameraType] = useState(front);
  const [zoom, setZoom] = useState(0);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };

  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === front) {
      setCameraType(back);
    } else {
      setCameraType(front);
    }
  };
  const onZoomValueChange = (e: any) => {
    setZoom(e);
  };
  const onFlashModeChange = (e: any) => {
    if (flashMode === on) {
      setFlashMode(auto);
    } else if (flashMode === off) {
      setFlashMode(on);
    } else {
      setFlashMode(off);
    }
  };
  const onCameraReady = () => setCameraReady(true);
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const photo = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(photo.uri);
    }
  };
  const gotoUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("UploadForm", { uri: takenPhoto });
  };
  const onDismiss = () => setTakenPhoto("");
  const onUpload = () => {
    Alert.alert("Save Photo?", "Save Photo & Upload or just upload", [
      {
        text: "Save & Upload",
        onPress: () => gotoUpload(true),
      },
      {
        text: "Just upload",
        onPress: () => gotoUpload(false),
        style: "destructive",
      },
    ]);
  };
  const isFocused = useIsFocused();
  return (
    <>
      <Container>
        {isFocused ? <StatusBar hidden={true} /> : null}
        {takenPhoto === "" ? (
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={{ flex: 1 }}
            zoom={zoom}
            ref={camera}
            onCameraReady={onCameraReady}
          />
        ) : (
          <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
        )}

        <CloseButton onPress={() => navigation.navigate("Tabs")}>
          <Ionicons name="close" color="white" size={30} />
        </CloseButton>
      </Container>
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={0.1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255,255,255,0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashModeChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  name={
                    flashMode === off
                      ? "flash-off"
                      : flashMode === on
                      ? "flash"
                      : "eye"
                  }
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons
                  color="white"
                  size={30}
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? "camera-reverse"
                      : "camera"
                  }
                />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        <Actions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </Actions>
      )}
    </>
  );
}
