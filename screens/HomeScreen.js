import React, { useState } from "react";
import { View, ScrollView, FlatList, Dimensions } from "react-native";
import { styles } from "../style.js";
import { Square } from "../square.js";
import { countryData } from "../countryData.js";
import { countryImages } from "../countryImages.js";
import { filter } from "lodash";

export default function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [squares, setSquares] = useState(Object.keys(countryData));

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeHolder: "Search",
        onChangeText: (event) => handleFilter(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  function handleFilter(searchTerm) {
    const filteredSquares = Object.keys(countryData).filter((country) =>
      country.includes(searchTerm)
    );
    setSquares(filteredSquares);
  }

  // function renderSquares() {
  //   const squareList = squares.length > 0 ? squares : Object.keys(countryData);

  //   return (
  //     <View style={styles.boxContainer}>
  //       {squareList.map((country) => (
  //         <Square
  //           key={country}
  //           imageSource={countryImages[country].square}
  //           countryName={country}
  //           description={countryData[country].description}
  //           navigation={navigation}
  //         />
  //       ))}
  //     </View>
  //   );
  // }

  // function renderSquares() {
  //   const squareList = squares.length > 0 ? squares : Object.keys(countryData);

  //   return squareList.map((country) => (
  //     <Square
  //       key={country}
  //       imageSource={countryImages[country].square}
  //       countryName={country}
  //       description={countryData[country].description}
  //       navigation={navigation}
  //     />
  //   ));
  // }

  function renderSquares() {
    // const squareList = squares.length > 0 ? squares : Object.keys(countryData);
    const squareList = squares;
    // console.log(countryData["Berlin"].description);

    return squareList.map((country) => (
      <View key={country} style={styles.box}>
        <Square
          imageSource={countryImages[country].square}
          countryName={country}
          description={countryData[country].description}
          navigation={navigation}
        />
      </View>
    ));
  }

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length % numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push(<View style={styles.box}></View>);
      numberOfElementsLastRow++;
    }

    return data;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={formatData(renderSquares(), 3)}
        renderItem={({ item }) => item}
        numColumns={3}
        contentContainerStyle={styles.boxContainer}
      />
    </View>
  );
}
