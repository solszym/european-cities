import HomeScreen from "./screens/HomeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { capitalize } from "lodash";

import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import CountryScreen from "./screens/CountryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium: Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "European capital cities" }}
        />
        <Stack.Screen
          name="Country"
          component={CountryScreen}
          options={({ route }) => ({
            title: capitalize(route.params.country), // Set the country name as the title
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
