import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { Alert, View, ActivityIndicator } from "react-native";

const fixedLocation = {
  //ufpa
  latitude: -1.2990397292955775,
  longitude: -47.90069746618683,

};

function Preload() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);

  async function checkLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão de localização negada",
        "Para continuar, é necessário conceder permissão de localização ao aplicativo.",
        [{ text: "OK" }]
      );
      return;
    }

    const watcher = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (newLocation) => {
        setLocation(newLocation);
      }
    );

    return watcher;
  }

  useEffect(() => {
    let watcher;
    checkLocation().then((result) => {
      watcher = result;
    });

    return () => {
      if (watcher) {
        watcher.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const distance = getDistance({ latitude, longitude }, fixedLocation);

      if (distance <= 1000) {
        navigation.navigate("MainTab_Screen");
      } else {
        Alert.alert("Erro ao acessar", "você está fora do espaço do Logos", [
          { text: "OK" },
        ]);
        navigation.navigate("Preload");
      }
    }
  }, [location]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size="large"
        color="#00ff00"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    </View>
  );
}

export default Preload;
