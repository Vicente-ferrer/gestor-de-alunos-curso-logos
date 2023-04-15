import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const Home = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {}, [data]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
    // alert(`Olha isso: ${type} e isso: ${data}`);
  };
  const handleReset = () => {
    setScanned(false);
    SecureStore.setItemAsync(data);
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Dado escaneado: {data}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginTop: 120,
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={styles.container}>
        {scanned && (
          <Button
            title={"Salvar"}
            onPress={() => {
              handleReset();
              setData("");
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  Btn: {
    marginTop: 200,
  },
});

export default Home;
