import {ReactNode} from "react";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {CompositeScreenProps} from "@react-navigation/native";
import {seeFeed_seeFeed} from "./__generated__/seeFeed";
import {seeRooms_seeRooms_users} from "./__generated__/seeRooms";

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
    Messages: undefined;
};

export type MessagesStackParamList = {
    Rooms: undefined;
    Room: { id: number, talkingTo: seeRooms_seeRooms_users } | undefined;
}

export type UploadTabParamList = {
    SelectRoot: undefined;
    TakeRoot: undefined;
};
export type SelectStackParamList = {
    Select: undefined;
    Take: undefined;
};
export type RoomsScreenProp = CompositeScreenProps<NativeStackScreenProps<MessagesStackParamList, 'Rooms'>, NativeStackScreenProps<LoginStackParamList>;
export type RoomScreenProp = CompositeScreenProps<NativeStackScreenProps<MessagesStackParamList, 'Room'>, NativeStackScreenProps<LoginStackParamList>;
export type SelectPhoroScreenProp = CompositeScreenProps<BottomTabScreenProps<UploadTabParamList, "SelectRoot">,
    NativeStackScreenProps<SelectStackParamList>>;
export type TakePhotoScreenProp = BottomTabScreenProps<UploadTabParamList,
    "TakeRoot">;
type ProfileScreenTabProp = BottomTabScreenProps<TabParamList, "Profile">;
type ProfileScreenStackProp = NativeStackScreenProps<TabParamList, "Profile">;

export type UploadScreenProp = NativeStackScreenProps<LoginStackParamList, "Upload">;

export type UploadFormScreenProp = NativeStackScreenProps<LoginStackParamList,
    "UploadForm">;
export type ProfileScreenProp = CompositeScreenProps<NativeStackScreenProps<TabParamList, "Profile">,
    CompositeScreenProps<BottomTabScreenProps<TabParamList>, NativeStackScreenProps<LoginStackParamList>>;

export type PhotoScreenProp = CompositeScreenProps<NativeStackScreenProps<TabParamList, "PhotoScreen">,
    CompositeScreenProps<BottomTabScreenProps<TabParamList>, NativeStackScreenProps<LoginStackParamList>>;
export type SearchScreenProp = CompositeScreenProps<NativeStackScreenProps<TabParamList, "Search">,
    CompositeScreenProps<BottomTabScreenProps<TabParamList>, NativeStackScreenProps<LoginStackParamList>>;
export type NotificationsScreenProp = CompositeScreenProps<NativeStackScreenProps<TabParamList, "Notifications">,
    CompositeScreenProps<BottomTabScreenProps<TabParamList>, NativeStackScreenProps<LoginStackParamList>>;

export type FeedScreenProp = CompositeScreenProps<NativeStackScreenProps<TabParamList, "Feed">,
    CompositeScreenProps<BottomTabScreenProps<TabParamList>, NativeStackScreenProps<LoginStackParamList>>;
export type LikeScreenProps = CompositeScreenProps<NativeStackScreenProps<TabParamList, "Likes">,
    CompositeScreenProps<BottomTabScreenProps<TabParamList>, NativeStackScreenProps<LoginStackParamList>>;
export type CommentScreenProps = CompositeScreenProps<NativeStackScreenProps<TabParamList, "Comments">,
    CompositeScreenProps<BottomTabScreenProps<TabParamList>, NativeStackScreenProps<LoginStackParamList>>;
