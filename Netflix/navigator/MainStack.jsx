import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { HeaderStyleInterpolators } from "@react-navigation/stack";
import Home from "../pages/Home";
import Detail from "../pages/Detail";

export default function MainStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home Page"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: "Detail",
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
