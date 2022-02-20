import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { getPosts } from "./api/blogAPI";

export function BlogScreen(): any {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, [getPosts]);
  return (
    <View>
      {posts && posts.map((post: any) => (
        <View key={post.id}>
          <Text>{post.title}</Text>
          <Text>{post.body}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
