import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { User } from "@/types";

type UserListItemProps = {
  user: User;
};
export default function UserListItem({ user }: UserListItemProps) {
  return (
    <Link href={`/users/${user.id}`} asChild>
      <Pressable style={styles.header}>
        <Image source={{ uri: user.image }} style={styles.userImage} />
        <View>
          <Text style={styles.username}>{user.name}</Text>
          <Text>{user.position}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
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
});
