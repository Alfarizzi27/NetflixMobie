import * as React from "react";
import { StyleSheet, Text, SafeAreaView, View, Dimensions } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import { Video, ResizeMode } from "expo-av";
import YouTube from "react-native-youtube";
import Body from "../components/Body";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      User {
        username
      }
      Casts {
        name
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
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay
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
          <Text style={styles.text}>{data?.detailMovies.title}</Text>
          <View style={styles.genre}>
            <Text style={styles.textGenre}>
              {data?.detailMovies.Genre.name}
            </Text>
          </View>
          <Text style={styles.synopsisTitle}>Synopsis</Text>
          <Text style={styles.synopsis}>{data?.detailMovies.synopsis}</Text>
          <Text style={[styles.synopsisTitle, { marginTop: 9 }]}>Casts</Text>
          {data?.detailMovies.Casts.map((el) => (
            <Text style={styles.synopsis}>{el.name}</Text>
          ))}
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
    marginTop: 30,
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
    width: "max-content",
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
    marginTop: 5,
    marginBottom: 5,
  },
});
