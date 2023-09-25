import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Experience } from "@/types";

type ExperienceListItemProps = {
  experience: Experience;
};

export default function ExperienceLIstItem({
  experience
}: ExperienceListItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: experience.companyimage }} style={styles.image} />
      <View>
        <Text style={styles.title}>{experience.title}</Text>
        <Text>{experience.companyname}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    paddingBottom: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: "lightgray"
  },
  image: {
    width: 50,
    aspectRatio: 1,
    marginRight: 5
  },
  title: {
    fontSize: 16,
    fontWeight: "500"
  }
});
