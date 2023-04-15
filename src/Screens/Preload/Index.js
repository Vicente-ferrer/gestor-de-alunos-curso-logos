import React, { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { Alert, View } from "react-native";
import { ActivityIndicator } from 'react-native';

const fixedLocation = {
    // latitude: -1.2990397292955775,
    // longitude: -47.90069746618683,
  latitude: -1.3034953490102914,
  longitude: -47.910862487954574,
};

function Preload() {

  const navigation = useNavigation();

  async function checkLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão de localização negada",
        "Para continuar, é necessário conceder permissão de localização ao aplicativo.",
        [{ text: "OK" }]
      );
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = coords;
    const distance = getDistance({ latitude, longitude }, fixedLocation);

    if (distance <= 100) {
      navigation.navigate("MainTab_Screen");
    } else {
   
      Alert.alert(
        "Erro ao acessar",
        "você está fora do espaço do Logos", 
        
        [{ text: "OK" }]
      );
      navigation.navigate("Preload");
    }
  }

  useEffect(() => {
    checkLocation();
  }, []);

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center' }} >
      <ActivityIndicator
      size="large"
      color="#00ff00"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}/>
    </View>
  );
}

export default Preload;
