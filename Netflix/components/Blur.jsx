import { BlurView } from "expo-blur";
import { View } from "react-native";

export default function MenuBlur() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 100,
          borderTopColor: "white",
          borderBottomColor: "white",
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        <BlurView
          intensity={40}
          style={{ flex: 1, backgroundColor: " rgba(0, 3, 6, 0.5)" }}
        />
      </View>
    </View>
  );
}
