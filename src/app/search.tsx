import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import users from "../../assets/data/users.json";
import UserListItem from "@/components/UserListItem";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { gql, useQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";

const query = gql`
  query profileSearch($term: String) {
    profileSearch(term: $term) {
      id
      image
      name
      position
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const { data, loading, error } = useQuery(query, {
    variables: { term: `%${search}%` }
  });
  console.log(data?.profileSearch);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search users",
        onChangeText: (event) => setSearch(event.nativeEvent.text)
      }
    });
  }, [navigation]);

  if (loading && !data?.profileSearch) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>something went wrong!</Text>;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        contentContainerStyle={{ marginTop: 150 }}
        data={data?.profileSearch || []}
        keyExtractor={(item, index) => item.name}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </SafeAreaView>
  );
}
