import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import Body from "../components/Body";
import { BlurView } from "expo-blur";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Home() {
  const [data, setData] = useState([]);

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
            <Text style={[styles.text, { color: "red" }]}> Netflix </Text>
          </BlurView>
        </View>
        <ScrollView>
          <View style={{ marginTop: 100, paddingLeft: 5, paddingRight: 5 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={styles.shadowContainer}>
                <View style={styles.cardContainer}>
                  <Image
                    source={{
                      uri: "https://media.21cineplex.com/webcontent/gallery/pictures/169683621225139_405x594.jpg",
                    }}
                    style={{
                      width: "auto",
                      height: windowHeight - 350,
                      // width: styles.screenSize.width / 2.5,
                      // height: styles.screenSize.height / 4,
                      resizeMode: "cover",
                    }}
                  />
                </View>
              </View>
            </View>
            <Text style={[styles.title, { marginTop: 30 }]}>
              Released in the past year
            </Text>
            <FlatList
              data={data}
              renderItem={({ item, index }) => <Card key={index} item={item} />}
              horizontal={true}
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
  cardContainer: {
    height: windowHeight - 350,
    backgroundColor: "white",
    width: windowWidth - 50,
    marginTop: 40,
    borderRadius: 10,
    overflow: "hidden",
  },
  shadowContainer: {
    shadowColor: "red",
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
});
