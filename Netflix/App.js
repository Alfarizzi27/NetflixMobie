import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import Home from "./pages/Home";
import Card from './components/Card'
import { useEffect, useState } from "react";
import axios from 'axios'

export default function App() {

  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const { data } = await axios.get("https://api.jikan.moe/v4/anime")
      setData(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
    console.log(data);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Card />}
        keyExtractor={item => item.mal_id}
      />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
});
