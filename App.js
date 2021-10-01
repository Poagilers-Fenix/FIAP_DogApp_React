import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  StatusBar,
  StyleSheet,
  View,
  LogBox,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [imageAnimals, setImageAnimals] = useState([]);
  const getAllAnimal = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const json = await response.json();
      setData(json.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  async function getImageRandom(animal) {
    try {
      setLoading(true);
      let arrayList = [];
      for (var val = 0; val < 5; val++) {
        const response = await fetch(
          `https://dog.ceo/api/breed/${animal}/images/random`
        );
        const json = await response.json();
        arrayList.push(json.message);
      }
      console.log(imageAnimals);
      setImageAnimals(arrayList);
      setSelectedAnimal(animal);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllAnimal();
  }, []);
  return (
    <View style={styles.container}>
      <Picker
        style={styles.pickerContainer}
        selectedValue={selectedAnimal}
        onValueChange={(itemValue) => getImageRandom(itemValue)}
      >
        <Picker.Item label="Selecione..." />
        {Object.keys(data).map((oneKey) => {
          return <Picker.Item label={oneKey} value={oneKey} />;
        })}
      </Picker>
      {isLoading && (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      {selectedAnimal != "" && (
        <View style={{ height: 650, padding: 15 }}>
          <Swiper showsButtons loop={true}>
            <View testID="Img1" style={styles.slide1}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: imageAnimals[0],
                }}
              />
            </View>
            <View testID="Img2" style={styles.slide2}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: imageAnimals[1],
                }}
              />
            </View>
            <View testID="Img3" style={styles.slide2}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: imageAnimals[2],
                }}
              />
            </View>
            <View testID="Img4" style={styles.slide2}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: imageAnimals[3],
                }}
              />
            </View>
            <View testID="Img5" style={styles.slide2}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: imageAnimals[4],
                }}
              />
            </View>
          </Swiper>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContainer: {
    marginTop: "10%",
    padding: 22,
    width: "90%",
    color: "#aaa",
    backgroundColor: "#ededed",
  },
  wrapper: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  messageContainer: {
    marginTop: 20,
  },
});
