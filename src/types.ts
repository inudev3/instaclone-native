import { ReactNode } from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "react-native-screens/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { seeFeed_seeFeed } from "./__generated__/seeFeed";

export type PropsWithChildren<P> = P & { children?: ReactNode };
export type RootStackParamList = {
  Welcome: undefined;
  Login: { username: string; password: string } | undefined;
  CreateAccount: undefined;
};
export type TabParamList = {
  Feed: { userId: number; lastId: number } | undefined;
  Notifications: undefined;
  Search: undefined;
  Profile: { username: string | undefined } | undefined;
  PhotoScreen: { photoId: number } | undefined;
  Me: { username: string } | undefined;
  Likes: { photoId: number } | undefined;
  Comments: { photoId: number } | undefined;
};
export type LoginStackParamList = {
  UploadForm: { uri: string } | undefined;
  Upload: undefined;
  Tabs: undefined;
};
export type UploadTabParamList = {
  SelectRoot: undefined;
  TakeRoot: undefined;
};
export type SelectStackParamList = {
  Select: undefined;
};
export type SelectPhoroScreenProp = CompositeScreenProps<
  BottomTabScreenProps<UploadTabParamList, "SelectRoot">,
  NativeStackScreenProps<SelectStackParamList>
>;
export type TakePhotoScreenProp = BottomTabScreenProps<
  UploadTabParamList,
  "TakeRoot"
>;
type ProfileScreenTabProp = BottomTabScreenProps<TabParamList, "Profile">;
type ProfileScreenStackProp = NativeStackScreenProps<TabParamList, "Profile">;

export type UploadScreenProp = CompositeScreenProps<
  BottomTabScreenProps<LoginStackParamList, "Upload">,
  NativeStackScreenProps<LoginStackParamList>
>;
export type UploadFormScreenProp = BottomTabScreenProps<
  LoginStackParamList,
  "UploadForm"
>;
export type ProfileScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Profile">,
  NativeStackScreenProps<TabParamList>
>;

export type PhotoScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "PhotoScreen">,
  NativeStackScreenProps<TabParamList>
>;
export type SearchScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Search">,
  NativeStackScreenProps<TabParamList>
>;
export type NotificationsScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Notifications">,
  NativeStackScreenProps<TabParamList>
>;

export type FeedScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Feed">,
  NativeStackScreenProps<TabParamList>
>;
export type LikeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Likes">,
  NativeStackScreenProps<TabParamList>
>;
export type CommentScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Comments">,
  NativeStackScreenProps<TabParamList>
>;
