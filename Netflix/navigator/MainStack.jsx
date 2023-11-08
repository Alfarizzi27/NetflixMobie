import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
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
        name="Detail Page"
        component={Detail}
        options={{ gestureDirection: "vertical" }}
      />
    </Stack.Navigator>
  );
}
