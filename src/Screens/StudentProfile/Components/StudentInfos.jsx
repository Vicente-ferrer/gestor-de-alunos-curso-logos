import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { AuthContext } from "../../../Context/ContextMethods";


const StudentProfile = ({
  cpf,
  username,
}) => {
  const { GetFrequencyHistory, frequencyHistory, GenerateQrcode } = useContext(AuthContext);

  useEffect(() => {
    GetFrequencyHistory(cpf);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          {username}
        </Text>

        <Text style={{ fontSize: 18 }}>CPF: {cpf}</Text>
      </View>

      <View style={{ marginTop: 32, width: "80%" }}>
        <TouchableOpacity
          style={styles.CodeBTN}
          onPress={() => {
            GenerateQrcode(cpf)
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 16 }}>Gerar QrCode</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 32, width: "80%" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
          Histórico de frequência
        </Text>
        <FlatList
          data={frequencyHistory}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text style={{ flex: 1 }}>{item.date}</Text>
              <Text style={{ color: item.justified ? "green" : "red" }}>
                {item.justified ? "Justificada" : "Faltou"}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  BackIcon: {
    fontSize: 45,
    color: "#4F4F4F",
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  MenuIcon: {
    fontSize: 45,
    color: "#4F4F4F",
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  CodeBTN: {
    padding: 16,
    backgroundColor: "#2d8ab9",
    alignItems: "center",
    borderRadius: 8,
  },
});
export default StudentProfile;