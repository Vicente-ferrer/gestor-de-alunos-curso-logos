import React, { useState, useEffect, useContext } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthContext } from "../../Context/ContextMethods";

const Home = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [studentId, setStudentId] = useState("");

  const { ValidateFrequency, validateMessage } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {}, [studentId]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setStudentId(data);
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
      <View style={styles.StatusContainer}>
        <Text style={styles.text}>Cpf: {studentId}</Text>
        <Text style={styles.text}>Status: {validateMessage}</Text>
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
              ValidateFrequency(studentId);
              handleReset();
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
  StatusContainer: {
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default Home;