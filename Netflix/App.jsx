import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainTab from "./navigator/MainTab";
import Body from "./components/Body";
export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
}
