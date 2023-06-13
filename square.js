import { Text, TouchableOpacity, View, Image, FlatList } from "react-native";
import { styles } from "./style.js";
import { countryData } from "./countryData.js";
import { capitalize } from "lodash";

export const Square = ({ imageSource, countryName, navigation }) => {
  const country = countryData[countryName];
  const navigateToCountryScreen = () => {
    navigation.navigate("Country", {
      countryName: countryName,
      countryDescription: country.description,
      latitude: country.latitude,
      longitude: country.longitude,
      imageSource,
      country: countryName,
    });
  };

  return (
    <View style={styles.box}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={navigateToCountryScreen}
      >
        <Image source={imageSource} style={styles.image} />
        <Text style={{ fontFamily: "Poppins_500Medium" }}>{countryName}</Text>
      </TouchableOpacity>
    </View>
  );
};
