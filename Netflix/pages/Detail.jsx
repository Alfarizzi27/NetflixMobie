import * as React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import { Video, ResizeMode } from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";
import Body from "../components/Body";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const GET_MOVIES_DETAIL = gql`
  query Query($id: ID!) {
    detailMovies(id: $id) {
      id
      title
      slug
      synopsis
      rating
      trailerUrl
      User {
        username
      }
      Casts {
        name
        profilePict
      }
      Genre {
        name
      }
    }
  }
`;

export default function Detail() {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const route = useRoute();

  const { loading, error, data } = useQuery(GET_MOVIES_DETAIL, {
    variables: {
      id: route.params.id,
    },
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require("../assets/netflixload.json")}
        />
      </View>
    );
  }

  return (
    <Body>
      <SafeAreaView>
        <View>
          {/* <YouTube
          videoId="ir7i-QpMOHQ"
          play
          fullscreen
          loop
          style={{ alignSelf: "stretch", height: 300 }}
        /> */}
          {/* <Video
            ref={video}
            style={styles.video}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay
          /> */}
          <YoutubePlayer
            height={220}
            play={true}
            videoId={data?.detailMovies.trailerUrl}
          />
        </View>
        <View style={styles.containerContent}>
          <View style={styles.containerRating}>
            <View style={styles.containerRating}>
              <View style={styles.ratingItem}>
                <AntDesign name="star" size={25} color="red" />
                <Text style={styles.rating}>
                  {data?.detailMovies.rating}/10
                </Text>
              </View>
              <View style={styles.ratingItem}>
                <AntDesign name="staro" size={25} color="red" />
                <Text style={styles.rating}>Rate This</Text>
              </View>
              <View style={styles.ratingItem}>
                <MaterialCommunityIcons
                  name="video-vintage"
                  size={24}
                  color="red"
                />
                <Text style={styles.rating}>
                  {data?.detailMovies.User.username}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView>
            <Text style={styles.text}>{data?.detailMovies.title}</Text>
            <View style={styles.genre}>
              <Text style={styles.textGenre}>
                {data?.detailMovies.Genre.name}
              </Text>
            </View>
            <Text style={styles.synopsisTitle}>Synopsis</Text>
            <Text style={styles.synopsis}>{data?.detailMovies.synopsis}</Text>
            <Text style={[styles.synopsisTitle, { marginTop: 9 }]}>Casts</Text>
            <View style={styles.cast}>
              {data?.detailMovies.Casts.map((el, index) => (
                <View
                  style={{
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Image
                    source={{
                      uri: el.profilePict,
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      resizeMode: "cover",
                      borderRadius: 100,
                    }}
                  ></Image>
                  <Text style={styles.synopsis}>{el.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Body>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  video: {
    alignSelf: "center",
    width: windowWidth,
    height: 200,
  },
  text: {
    fontSize: 25,
    fontWeight: "700",
    color: "white",
  },
  synopsis: {
    fontSize: 12,
    textAlign: "justify",
    color: "white",
    marginTop: 10,
  },
  synopsisTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    marginTop: 15,
  },
  rating: {
    fontSize: 12,
    fontWeight: "700",
    color: "gray",
    marginTop: 5,
  },
  containerContent: {
    display: "flex",
    flexDirection: "column",
    width: windowWidth,
    height: windowHeight,
    padding: 10,
  },
  ratingItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  genre: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent",
    alignSelf: "flex-start",
  },
  textGenre: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
  },
  containerRating: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: windowWidth - 30,
    alignItems: "center",
    marginBottom: 5,
  },
  cast: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});
