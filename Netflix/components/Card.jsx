import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Card({ item }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Detail", {
          id: item.mal_id,
        })
      }
    >
      <View
        style={{
          width: styles.screenSize.width / 2.5,
          alignItems: "center",
          marginRight: 16,
        }}
      >
        <Image
          source={{
            uri: item.images.jpg.image_url,
          }}
          style={{
            width: styles.screenSize.width / 2.5,
            height: styles.screenSize.height / 4,
            resizeMode: "cover",
            borderRadius: 14,
          }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  content: {
    flex: 3,
  },
  screenSize: { width: windowWidth, height: windowHeight },
});
