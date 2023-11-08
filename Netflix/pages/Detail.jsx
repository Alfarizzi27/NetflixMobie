import { StyleSheet, Text, SafeAreaView } from "react-native";

export default function Detail() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello Detail</Text>
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
