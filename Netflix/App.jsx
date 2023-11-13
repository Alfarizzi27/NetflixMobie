import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainTab from "./navigator/MainTab";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Body from "./components/Body";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </ApolloProvider>
  );
}
