import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Body from "../components/Body";
import { BlurView } from "expo-blur";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const fetchDatas = async () => {
    try {
      const { data } = await axios.get("https://api.jikan.moe/v4/anime");
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <>
      <Body>
        <StatusBar style="light" />
        <View style={styles.view}>
          <BlurView intensity={80} tint="dark">
            <Text style={styles.text}> Netflix </Text>
          </BlurView>
        </View>
        <ScrollView>
          <View style={{ marginTop: 100, paddingLeft: 5 }}>
            <Text style={styles.title}> Released in the past year</Text>
            <FlatList
              data={data}
              renderItem={({ item, index }) => <Card key={index} item={item} />}
              horizontal={true}
              style={{}}
            />
            <Text style={styles.title}>Trending Now</Text>
            <FlatList
              data={data}
              renderItem={({ item, index }) => <Card key={index} item={item} />}
              horizontal={true}
            />
            <Text style={styles.title}>Only on Netflix</Text>
            <FlatList
              data={data}
              renderItem={({ item, index }) => <Card key={index} item={item} />}
              horizontal={true}
            />
            <FlatList
              data={data}
              renderItem={({ item, index }) => <Card key={index} item={item} />}
              horizontal={true}
              style={{ marginTop: 10 }}
            />
          </View>
        </ScrollView>
      </Body>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    height: 110,
    backgroundColor: "transparent",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    zIndex: 3,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
    width: 700,
    color: "white",
    marginLeft: 10,
    marginTop: 60,
  },
  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
});
