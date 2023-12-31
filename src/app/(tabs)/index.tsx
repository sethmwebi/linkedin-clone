import { ActivityIndicator, FlatList, Text } from "react-native";

import PostListItem from "@/components/PostListItem";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
// import posts from "../../../assets/data/posts.json";

const postList = gql`
  query PostListQuery {
    postList {
      id
      image
      content
      profile {
        id
        name
        position
        image
      }
    }
  }
`;

const postPaginatedList = gql`
  query PostPaginatedListQuery($first: Int, $after: Int) {
    postPaginatedList(first: $first, after: $after) {
      id
      image
      content
      profile {
        id
        name
        position
        image
      }
    }
  }
`;

export default function HomeFeedScreen() {
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, data, fetchMore, refetch } = useQuery(
    postPaginatedList,
    {
      variables: { first: 2 }
    }
  );

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }

    const res = await fetchMore({
      variables: { after: data.postPaginatedList.length }
    });
    if (res.data.postPaginatedList.length === 0) {
      setHasMore(false);
    }
  };

  if (loading) return <ActivityIndicator />;

  if (error) return <Text>something went wrong!</Text>;

  return (
    <FlatList
      data={data.postPaginatedList}
      renderItem={({ item }) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      refreshing={loading}
      onRefresh={refetch}
      contentContainerStyle={{ gap: 10 }}
    />
  );
}
