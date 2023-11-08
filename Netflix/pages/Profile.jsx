import { StatusBar } from "expo-status-bar";
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello Profile</Text>
    </SafeAreaView>
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
