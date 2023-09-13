import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

import { Post } from "@/types";

type PostListItemProps = {
  post: Post;
};

type FooterButtonProps = {
  text: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
};

function FooterButton({ text, icon }: FooterButtonProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      <FontAwesome name={icon} size={16} color="black" />
      <Text style={{ marginLeft: 5, color: "grey", fontWeight: "500" }}>
        {text}
      </Text>
    </View>
  );
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <Link href={`/posts/${post.id}`} asChild>
      <Pressable style={styles.container}>
        {/* header */}
        <Link href={`/users/${post.author.id}`} asChild>
          <Pressable style={styles.header}>
            <Image
              source={{ uri: post.author.image }}
              style={styles.userImage}
            />
            <View>
              <Text style={styles.username}>{post.author.name}</Text>
              <Text>{post.author.position}</Text>
            </View>
          </Pressable>
        </Link>

        <Text style={styles.content}>{post.content}</Text>
        {post.image && (
          <Image source={{ uri: post.image }} style={styles.postImage} />
        )}
        <View style={styles.footer}>
          <FooterButton text="Like" icon="thumbs-o-up" />
          <FooterButton text="Comment" icon="comment-o" />
          <FooterButton text="Share" icon="share" />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postImage: {
    width: "100%",
    aspectRatio: 3 / 2,
  },
  content: {
    margin: 10,
    marginTop: 0,
  },
  footer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderColor: "lightgray",
  },
});
