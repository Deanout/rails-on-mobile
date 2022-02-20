import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { BlogScreen } from './app/screens/BlogScreen';
import { Provider as PaperProvider } from "react-native-paper";
import  NavBar  from "./app/components/NavBar";
import { Headline } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Headline style={styles.heading}>Hello, World!</Headline>
        <BlogScreen />
        <NavBar />
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50
  },
  heading: {
    color: "#000"
  }
});
