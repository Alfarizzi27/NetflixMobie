import { View } from "react-native";

export default function Body({ children }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(1, 12, 22)",
      }}
    >
      {children}
    </View>
  );
}
