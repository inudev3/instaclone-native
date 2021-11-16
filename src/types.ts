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
  Profile: { username: string } | undefined;
  PhotoScreen: { photoId: number } | undefined;
  Me: undefined;
  Likes: { photoId: number } | undefined;
  Comments: { photoId: number } | undefined;
};

type ProfileScreenTabProp = BottomTabScreenProps<TabParamList, "Profile">;
type ProfileScreenStackProp = NativeStackScreenProps<TabParamList, "Profile">;

export type ProfileScreenProp = CompositeScreenProps<
  NativeStackScreenProps<TabParamList, "Profile">,
  BottomTabScreenProps<TabParamList>
>;

export type PhotoScreenProp = CompositeScreenProps<
  NativeStackScreenProps<TabParamList, "PhotoScreen">,
  BottomTabScreenProps<TabParamList>
>;
export type SearchScreenProp = CompositeScreenProps<
  NativeStackScreenProps<TabParamList, "Search">,
  BottomTabScreenProps<TabParamList>
>;
export type NotificationsScreenProp = CompositeScreenProps<
  NativeStackScreenProps<TabParamList, "Notifications">,
  BottomTabScreenProps<TabParamList>
>;

export type FeedScreenProp = CompositeScreenProps<
  NativeStackScreenProps<TabParamList, "Feed">,
  BottomTabScreenProps<TabParamList>
>;
export type LikeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TabParamList, "Likes">,
  BottomTabScreenProps<TabParamList>
>;
export type CommentScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TabParamList, "Comments">,
  BottomTabScreenProps<TabParamList>
>;
