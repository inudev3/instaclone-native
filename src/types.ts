import { ReactNode } from "react";

export type PropsWithChildren<P> = P & { children?: ReactNode };
export type RootStackParamList = {
  Welcome: undefined;
  Login: { username: string; password: string } | undefined;
  CreateAccount: undefined;
};
export type TabParamList = {
  Feed: undefined;
  Notifications: undefined;
  Search: undefined;
  Profile: undefined;
  PhotoScreen: undefined;
  Me: undefined;
};
