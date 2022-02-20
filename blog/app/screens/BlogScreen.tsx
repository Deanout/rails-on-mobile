import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { getPosts } from "./api/blogAPI";
import  BlogPost  from "../components/BlogPost";
import { Portal, Dialog } from "react-native-paper";

export function BlogScreen(): any {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = React.useState(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, [getPosts]);
  return (

        <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
            <SafeAreaView>
              {posts && posts.map((post: any) => (
                <View key={post.id}>
                  <BlogPost title={post.title} body={post.body} />
                </View>
              ))}
          </SafeAreaView>
        </ScrollView>

    
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 25,
  },
});
