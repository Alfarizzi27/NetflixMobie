import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import News from "../pages/News";
import MenuBlur from "../components/Blur";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import MainStack from "./MainStack";
import Profile from "../pages/Profile";

export default function MainTab() {
  const Tab = createBottomTabNavigator();

  return (
    // <BlurView intensity={80} tint="dark">
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute" },
        tabBarBackground: () => <MenuBlur />,
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "red",
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="whatshot" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My Netflix"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
    // </BlurView>
  );
}
