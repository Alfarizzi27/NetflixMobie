import * as React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import YouTube from "react-native-youtube";

export default function Detail() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <SafeAreaView>
      <View>
        <YouTube
          videoId="ir7i-QpMOHQ"
          style={{ alignSelf: "stretch", height: 300 }}
        />
        {/* <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "www.youtube.com/embed/ir7i-QpMOHQ",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
});
