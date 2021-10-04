import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
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
      const response = await fetch(
        `https://dog.ceo/api/breed/${animal}/images/random/5`
      );
      const json = await response.json();
      setImageAnimals(json.message);
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
      <View style={styles.viewTitle}>
        <Text style={styles.titleText}>Dog App</Text>
      </View>
      <Picker
        style={styles.pickerContainer}
        selectedValue={selectedAnimal}
        onValueChange={(itemValue) => getImageRandom(itemValue)}
      >
        <Picker.Item label="Selecione..." />
        {Object.keys(data).map((oneKey, i) => {
          return <Picker.Item key={i} label={oneKey} value={oneKey} />;
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
  viewTitle: {
    backgroundColor: "#aaa",
    width: "100%",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  pickerContainer: {
    marginTop: "4%",
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
