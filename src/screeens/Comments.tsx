import React, { useState } from "react";
import { CommentScreenProps } from "../types";
import { useMutation, useQuery } from "@apollo/client";
import { toggleLike } from "../__generated__/toggleLike";
import { TOGGLE_LIKE_MUTATION } from "../mutations";
import {
  seePhotoComments,
  seePhotoComments_seePhotoComments,
} from "../__generated__/seePhotoComments";
import { SEEPHOTOCOMMENTS_QUERY } from "../queries";
import ScreenLayOut from "../components/ScreenLayout";
import { FlatList, ListRenderItem } from "react-native";
import { CommentRow } from "../components/CommentRow";

export default function Comments({
  navigation,
  route: { params },
}: CommentScreenProps) {
  const { data, loading, refetch } = useQuery<seePhotoComments>(
    SEEPHOTOCOMMENTS_QUERY,
    {
      variables: {
        id: params?.photoId,
      },
    }
  );
  console.log(data);
  const [refreshing, setRefreshing] = useState(false);
  const renderItem: ListRenderItem<seePhotoComments_seePhotoComments> = ({
    item: comment,
  }) => <CommentRow {...comment} />;
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayOut loading={loading}>
      <FlatList
        style={{ width: "100%", height: "100%" }}
        refreshing={refreshing}
        onRefresh={refresh}
        data={data?.seePhotoComments}
        renderItem={renderItem}
        keyExtractor={(comment) => "" + comment.id}
      />
    </ScreenLayOut>
  );
}
