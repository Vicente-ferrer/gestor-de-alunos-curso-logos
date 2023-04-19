import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { AuthContext } from "../../context/contextMethods";

const CreateStudent = () => {
  const [cpf, setCpf] = useState("");
  const [username, setusername] = useState("");
  const { NewStudent } = useContext(AuthContext);

  const cleanForm = () => {
    setCpf("");
    setusername("");
  };

  const validateCpf = (cpf) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(cpf);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.label}>CPF:</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setusername}
      />
      <Button
        title="Criar Cliente"
        onPress={() => {
          if (cpf === "" || username === "") {
            Alert.alert(
              "Ops!",
              "Parece que esqueceu de preencher algum campo!"
            );
            return;
          }

          if (!validateCpf(cpf)) {
            Alert.alert("CPF inválido", "O CPF deve ter 11 dígitos.");
            return;
          }

          NewStudent(cpf, username);
          Alert.alert("Salvo com sucesso!");
          cleanForm();
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default CreateStudent;
