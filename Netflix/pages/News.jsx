import { StatusBar } from "expo-status-bar";
import Body from "../components/Body";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  onPress,
  ScrollView,
} from "react-native";

export default function News() {
  return (
    <Body>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Hello News</Text>
      </SafeAreaView>
    </Body>
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
