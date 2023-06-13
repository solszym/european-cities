import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  boxContainer: {
    // // flexDirection: "row",
    // // flexWrap: "wrap",
    paddingTop: 150,
  },
  box: {
    // aspectRatio: 1,
    // // width: 130,
    // borderColor: "#e4f7f7",
    // flex: 1,
    // height: 50,
    // flexBasis: "33.33%",
    // borderColor: "#e4f7f7",
    // // borderWidth: 0.5,
    flex: 1,
    // margin: 1,
    height: Dimensions.get("window").width / 3,
  },
  titleBar: {
    backgroundColor: "#e4f7f7",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  countryScreen: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
  SwiperView: {
    margin: 10,
    height: 320,
    width: 320,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },

  swiperContainer: {
    // height: 450,
    // width: 100,
    // borderColor: "black",
    // borderWidth: 1,
  },
  imageCountryScreen: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  description: {
    fontFamily: "Poppins_500Medium",
    // alignContent: "justify",
    textAlign: "justify",
    paddingHorizontal: 30,
  },
  temperatureContainer: {
    alignSelf: "center",
    alignItems: "flex-start",
    paddingHorizontal: 30,
  },
  temperatureTitle: {
    fontFamily: "Poppins_500Medium",
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "center",
  },
  temperaturesValues: {
    // alignSelf: "flex-start",

    flexDirection: "row",
    justifyContent: "space-around",
  },
  temperatureColumn: {
    paddingHorizontal: 10,
  },
  highestTemperature: {
    color: "red",
    fontWeight: "bold",
  },
  lowestTemperature: {
    color: "blue",
    fontWeight: "bold",
  },
  middleTemperature: {
    color: "green",
    fontWeight: "bold",
  },
  temperatureRow: {
    flexDirection: "row",
  },
});
