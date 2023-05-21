import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../../Context/ContextMethods";


const DateScreen = ({ handleClose }) => {
  const { exportSheetPerDay, exportSheetPerMonth, JustifyAbsence } =
    useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filteredDate, setFilteredDate] = useState("");
  const [justifyDate, setJustifyDate] = useState("");
  const [cpf, setCpf] = useState("");

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);

    const year = currentDate.getFullYear();
    const month = `${currentDate.getMonth() + 1}`.padStart(2, "0");
    const day = `${currentDate.getDate()}`.padStart(2, "0");
    const formattedDate = `${day}/${month}/${year}`;
    setFilteredDate(formattedDate);
  };

  const showMode = () => {
    setShowDatePicker(true);
  };
  const validateCpf = (cpf) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(cpf);
  };
  const cleanForm = () => {
    setCpf("");
    setJustifyDate("");
  };
  return (
    <View style={styles.container}>
      <Feather name="arrow-left" style={styles.Icon} onPress={handleClose} />
      <Text style={styles.Txt}>Data escolhida: {filteredDate}</Text>
      <TouchableOpacity style={styles.button} onPress={showMode}>
        <Text style={styles.buttonText}>Escolher data</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      <TouchableOpacity
        style={[styles.button, styles.exportButton]}
        onPress={() => exportSheetPerDay(filteredDate)}
      >
        <Text style={styles.buttonText}>Exportar por dia</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.exportButton]}
        onPress={() => exportSheetPerMonth()}
      >
        <Text style={styles.buttonText}>Exportar por mês</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.exportButton]}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.buttonText}>Justificar falta</Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={styles.Modalcontainer}>
          <TextInput
            style={styles.input}
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            placeholder="CPF"
          />

          <TextInput
            style={styles.input}
            value={justifyDate}
            onChangeText={setJustifyDate}
            placeholder="ex: 21/02/2022"
          />
          <Button
            title="Salvar"
            onPress={() => {
              if (cpf === "" || justifyDate === "") {
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

              JustifyAbsence(cpf, justifyDate);
              Alert.alert("Salvo com sucesso!");
              cleanForm();
              setShowModal(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  Modalcontainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  exportButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  Txt: {
    fontSize: 18,
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
  Icon: {
    fontSize: 45,
    color: "#4F4F4F",
    position: "absolute",
    top: "5%",
    left: "5%",
  },
});

export default DateScreen;