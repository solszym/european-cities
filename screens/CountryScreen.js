import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { styles } from "../style.js";
import axios from "axios";
import { countryImages } from "../countryImages.js";

const CountryScreen = ({ route }) => {
  const [temperature, setTemperature] = useState(null);
  const [highestTemperature, setHighestTemperature] = useState(null);
  const [lowestTemperature, setLowestTemperature] = useState(null);
  const [middleTemperatures, setMiddleTemperatures] = useState(null);

  const { country, images } = route.params;
  //   useEffect(() => {
  //     const { latitude, longitude } = route.params;

  //     const fetchWeather = () => {
  //       axios
  //         .get(
  //           `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
  //         )
  //         .then((response) => {
  //           const data = response.data;
  //           const temperatureCelsius = data.hourly.temperature_2m[0];
  //           setTemperature(temperatureCelsius);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching weather data:", error);
  //         });
  //     };

  //     fetchWeather();
  //   }, [route.params]);

  useEffect(() => {
    const { latitude, longitude } = route.params;

    const fetchHistoricalWeather = () => {
      axios
        .get(
          `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2022-01-01&end_date=2022-12-31&daily=temperature_2m_mean&timezone=Europe%2FBerlin`
        )
        .then((response) => {
          const data = response.data;
          //   console.log(data);
          const temperatureCelsius = data.daily.temperature_2m_mean;
          // console.log(temperatureCelsius.length);
          const monthlyTemperatures = [];
          let temperatures = [];
          let currentMonth = 1;

          temperatureCelsius.forEach((temperature) => {
            temperatures.push(temperature);

            if (
              temperatures.length === 30
              // temperature === temperatureCelsius[temperatureCelsius.length - 1]
            ) {
              const averageTemperature =
                temperatures.reduce((sum, temp) => sum + temp, 0) /
                temperatures.length;
              monthlyTemperatures.push(averageTemperature);
              temperatures = [];
              currentMonth++;
            }
          });

          let highestTemperature = monthlyTemperatures[0];
          let lowestTemperature = monthlyTemperatures[0];
          let middleTemperatures = [];
          // let middleTemperature = [...monthlyTemperatures].sort(
          //   (a, b) => a - b
          // )[5];

          monthlyTemperatures.forEach((temp) => {
            if (temp > highestTemperature) {
              highestTemperature = temp;
            }
          });

          monthlyTemperatures.forEach((temp) => {
            if (temp < lowestTemperature) {
              lowestTemperature = temp;
            }
          });

          monthlyTemperatures.forEach((temp) => {
            if (temp > 18 && temp < 26) {
              middleTemperatures.push(temp);
            }
          });

          if (middleTemperatures.length === 0) {
            middleTemperatures.push(highestTemperature);
          }

          // console.log(`lowest ${lowestTemperature}`);
          // console.log(`middle ${middleTemperature}`);
          // console.log(`highest ${highestTemperature}`);

          setTemperature(monthlyTemperatures);
          setHighestTemperature(highestTemperature);
          setLowestTemperature(lowestTemperature);
          setMiddleTemperatures(middleTemperatures);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    };

    fetchHistoricalWeather();
  }, [route.params]);

  const { countryName, countryDescription, imageSource } = route.params;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const renderTemperatureItem = ({ item }) => (
  //   <Text>
  //     {item.month}: {item.temp.toFixed(1)}°C
  //   </Text>
  // );

  // const renderTemperatureColumn = (data) => (
  //   <View style={styles.temperatureColumn}>
  //     <FlatList
  //       data={data}
  //       keyExtractor={(item) => item.month}
  //       renderItem={renderTemperatureItem}
  //     />
  //   </View>
  // );

  return (
    <ScrollView>
      <View style={styles.countryScreen}>
        {/* <Image source={imageSource} style={{ height: 200, width: 200 }} /> */}
        <View style={styles.SwiperView}>
          <Swiper style={styles.swiperContainer} showsPagination={false}>
            <Image
              source={countryImages[country].photos[1]}
              style={styles.imageCountryScreen}
            />
            <Image
              source={countryImages[country].photos[2]}
              style={styles.imageCountryScreen}
            />
            <Image
              source={countryImages[country].photos[3]}
              style={styles.imageCountryScreen}
            />
          </Swiper>
        </View>
        <Text style={styles.description}>{countryDescription}</Text>

        {temperature && (
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureTitle}>
              Average temperatures by month:
            </Text>
            <View style={styles.temperaturesValues}>
              <View style={styles.temperatureColumn}>
                {/* {console.log(temperature)} */}
                {temperature.slice(0, 6).map((temp, index) => (
                  <Text
                    key={index}
                    style={[
                      // temp === highestTemperature && styles.highestTemperature,
                      // temp === lowestTemperature && styles.lowestTemperature,
                      middleTemperatures != null &&
                        middleTemperatures.includes(temp) &&
                        styles.middleTemperature,
                      { padding: 2 },
                    ]}
                  >
                    {monthNames[index]}: {temp.toFixed(1)}°C
                  </Text>
                ))}
              </View>
              <View style={styles.temperatureColumn}>
                {temperature.slice(6, 12).map((temp, index) => (
                  <Text
                    key={index}
                    style={[
                      // temp === highestTemperature && styles.highestTemperature,
                      // temp === lowestTemperature && styles.lowestTemperature,
                      middleTemperatures != null &&
                        middleTemperatures.includes(temp) &&
                        styles.middleTemperature,
                      { padding: 2 },
                    ]}
                  >
                    {/* {console.log(middleTemperatures)} */}
                    {monthNames[index + 6]}: {temp.toFixed(1)}°C
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}
        {/* {temperature && (
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureTitle}>
              Średnie temperatury w danym miesiącu:
            </Text>
            <View style={styles.temperatureRowsContainer}>
              {[...Array(3)].map((_, rowIndex) => (
                <View style={styles.temperatureRow} key={rowIndex}>
                  {temperature
                    .slice(rowIndex * 4, (rowIndex + 1) * 4)
                    .map((temp, index) => (
                      <Text
                        key={index}
                        style={[
                          styles.temperature,
                          temp === highestTemperature &&
                            styles.highlightedTemperature,
                        ]}
                      >
                        {rowIndex * 4 + index + 1}. {temp.toFixed(1)}°C
                        <Text></Text>
                      </Text>
                    ))}
                </View>
              ))}
            </View>
          </View>
        )} */}
        {/* {temperature && (
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureTitle}>
              Monthly Average Temperatures:
            </Text>

            {temperature.slice(1, 13).map((temp, index) => (
              <Text
                key={index}
                style={[
                  styles.temperature,
                  temp === highestTemperature && styles.highlightedTemperature, // Add the conditional styling
                ]}
              >
                {index + 1}. {temp.toFixed(1)}°C
              </Text>
            ))}
          </View>
        )} */}
      </View>
    </ScrollView>
  );
};

export default CountryScreen;
