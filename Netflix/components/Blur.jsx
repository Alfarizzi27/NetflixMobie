import { BlurView } from "expo-blur";
import { View } from "react-native";

const MenuBlur = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 55,
          borderRadius: 90,
          borderTopColor: "white",
          borderBottomColor: "white",
          overflow: "hidden",
        }}
      >
        <BlurView
          intensity={10}
          style={{ flex: 1, backgroundColor: " rgba(61, 53, 105, 0.4)" }}
        />
      </View>
    </View>
  );
};
