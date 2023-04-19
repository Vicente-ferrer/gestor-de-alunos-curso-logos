import React, { useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthContext } from "../../context/contextMethods";

const Home = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");

  const { ValidateFrequency } = useContext(AuthContext);

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
    SecureStore.setItemAsync("StudentId", data);
    // alert(`Olha isso: ${type} e isso: ${data}`);
  };
  const handleReset = () => {
    setScanned(false);
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
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
      </View>
      <View style={styles.container}>
        {scanned && (
          <Button
            title={"Salvar"}
            onPress={() => {
              ValidateFrequency();
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
