import { View, Text } from "react-native";
import React from "react";

import { Post } from "@/types";

type PostListItemProps = {
  post: Post;
};

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <View>
      <Text>{post.content}</Text>
    </View>
  );
}
