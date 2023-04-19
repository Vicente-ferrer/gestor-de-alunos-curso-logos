import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthContext } from "../../context/contextMethods";

const DateScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredDate, setFilteredDate] = useState("");
  const { exportSheetPerDay, exportSheetPerMonth } = useContext(AuthContext);

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

  return (
    <View style={styles.container}>
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
          maximumDate={new Date()} // Evita datas anteriores à atual
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
});

export default DateScreen;
