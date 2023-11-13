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
import { gql, useQuery } from "@apollo/client";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const GET_MOVIES = gql`
  query Query {
    movies {
      id
      title
      slug
      rating
      imgUrl
    }
  }
`;

export default function Home() {
  let { loading, error, data } = useQuery(GET_MOVIES);
  const [datas, setDatas] = useState([]);

  const fetchDatas = async () => {
    try {
      const { data } = await axios.get("https://api.jikan.moe/v4/anime");
      setDatas(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDatas();
    console.log(data);
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "transparent",
              }}
            >
              <View style={styles.shadowContainer}>
                <View style={styles.cardContainer}>
                  <Image
                    source={{
                      uri: "https://cdns.klimg.com/kapanlagi.com/p/budipekerti.jpg",
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
              data={data?.movies || []}
              renderItem={({ item, index }) => <Card key={index} item={item} />}
              horizontal={true}
            />
            <Text style={styles.title}>Trending Now</Text>
            <FlatList
              data={data?.movies || []}
              renderItem={({ item, index }) => <Card key={index} item={item} />}
              horizontal={true}
            />
            <Text style={styles.title}>Only on Netflix</Text>
            <FlatList
              data={data?.movies || []}
              renderItem={({ item, index }) => <Card key={index} item={item} />}
              horizontal={true}
            />
            <Text style={styles.title}>Recomendation for you</Text>
            <FlatList
              data={data?.movies || []}
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
    shadowColor: "white",
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
});
