import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import userJson from "../../../assets/data/user.json";
import { Experience, User } from "@/types";
import ExperienceLIstItem from "@/components/ExperienceLIstItem";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query MyQuery($id: ID!) {
    profile(id: $id) {
      name
      image
      position
      about
      experience {
        id
        companyname
        companyimage
        title
      }
      backimage
    }
  }
`;

export default function UserProfile() {
  const { id } = useLocalSearchParams();

  const { loading, error, data } = useQuery(query, { variables: { id } });
  const user = data?.profile;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: user?.name || "User" });
  }, [user?.name]);

  const onConnect = () => {
    console.warn("Connect pressed");
  };

  if (loading) return <ActivityIndicator />;

  if (error) return <Text>Something went wrong!</Text>;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        {/* bg image */}
        <Image source={{ uri: user.backimage }} style={styles.backImage} />
        <View style={styles.headerContent}>
          {/* profile image */}
          <Image source={{ uri: user.image }} style={styles.image} />
          {/* name and position */}
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.position}>{user.position}</Text>
          {/* connect button */}
          <Pressable onPress={onConnect} style={styles.button}>
            <Text style={styles.buttonText}>Connect</Text>
          </Pressable>
        </View>
      </View>
      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.paragraph}>{user.about}</Text>
      </View>
      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {user.experience?.map((experience: Experience) => (
          <ExperienceLIstItem key={experience.id} experience={experience} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "white",
    marginBottom: 5
  },
  backImage: {
    width: "100%",
    aspectRatio: 5 / 2,
    marginBottom: -60
  },
  headerContent: { padding: 10, paddingTop: 0 },
  image: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white"
  },
  name: {
    fontSize: 24,
    fontWeight: "500"
  },
  position: {},
  button: {
    backgroundColor: "royalblue",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "500"
  },
  section: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 5
  },
  paragraph: {
    lineHeight: 20
  }
});
