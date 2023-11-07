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

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello world</Text>
      <ScrollView className="flex-row">
        <TouchableOpacity
          style={styles.button}
          className="bg-blue-500 px-4 py-2 rounded"
          onPress={onPress}
        >
          <Text className="texts text-white">Sentuh aku mas</Text>
        </TouchableOpacity>
      </ScrollView>
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
