import { Image, Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../../components/Themed";
import { useNavigation, useRouter } from "expo-router";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { gql, useMutation } from "@apollo/client";
import { useUserContext } from "@/context/UserContext";

const insertPost = gql`
  mutation MyMutation($userId: ID, $image: String, $content: String!) {
    insertPost(userid: $userId, image: $image, content: $content) {
      content
      id
      image
      userid
    }
  }
`;

export default function NewPostScreen() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  // @ts-ignore
  const { dbUser } = useUserContext();

  const [handleMutation, { loading, error, data }] = useMutation(insertPost, {
    refetchQueries: ["PostPaginatedListQuery"]
  });

  const navigation = useNavigation();
  const router = useRouter();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onPost = () => {
    try {
      handleMutation({ variables: { userId: dbUser.id, content } });

      router.push("/(tabs)/");
      setContent("");
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={onPost} style={styles.postButton}>
          <Text style={styles.postButtonText}>
            {loading ? "submitting..." : "submit"}
          </Text>
        </Pressable>
      )
    });
  }, [onPost, loading]);

  return (
    <View style={styles.container}>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="What do you want to talk about?"
        style={styles.input}
        multiline
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.footer}>
        <Pressable onPress={pickImage} style={styles.iconButton}>
          <FontAwesome name="image" size={24} color="black" />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <FontAwesome name="camera" size={24} color="black" />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  input: {
    fontSize: 18,
    marginBottom: 70
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  // header
  postButton: {
    backgroundColor: "royalblue",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginRight: 10
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginTop: "auto"
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold"
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  iconButton: {
    backgroundColor: "gainsboro",
    borderRadius: 40,
    padding: 20
  }
});
