import React, { useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import StudentInfos from "./Components/StudentInfos";
import { AuthContext } from "../../Context/ContextMethods";


const StudentProfile = () => {
  const { username, Cpf } = useRoute().params;
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isEditAbsenceOpen, setIsEditAbsenceOpen] = useState(false);
  const [absenceReason, setAbsenceReason] = useState("");
  const [absenceDate, setAbsenceDate] = useState("");
  const { AlterStudent, AlterAbsence, DeleteStudent } = useContext(AuthContext);

  const OpenEditUser = () => {
    setIsEditUserOpen(true);
  };

  const OpenEditAbsence = () => {
    setIsEditAbsenceOpen(true);
  };

  const validateCpf = (id) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => setIsMenuOpen(true)}>
        <Feather name="menu" style={styles.icon} />
      </TouchableOpacity>

      <StudentInfos cpf={Cpf} username={username} />

      <Modal visible={isMenuOpen} animationType="slide" transparent={false}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.button} onPress={OpenEditUser}>
            <Text style={styles.buttonText}>Editar informações do usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={OpenEditAbsence}>
            <Text style={styles.buttonText}>Editar justificativa de falta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert(
                "Confirmação",
                "Deseja realmente excluir este estudante?",
                [
                  {
                    text: "Não",
                    style: "cancel",
                  },
                  {
                    text: "Sim",
                    onPress: () => {
                      DeleteStudent(Cpf);
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={styles.buttonText}>Deletar estudante</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
            <Text style={styles.closeButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={isEditUserOpen} animationType="slide" transparent={false}>
        <View style={styles.modal}>
          <Text style={styles.title}>Editar informações do usuário</Text>

          <TextInput
            style={styles.input}
            placeholder="Novo nome"
            value={userName}
            onChangeText={setUserName}
          />
          <TextInput
            style={styles.input}
            placeholder="Novo CPF"
            value={id}
            onChangeText={setId}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (id === "" || userName === "") {
                Alert.alert(
                  "Ops!",
                  "Parece que esqueceu de preencher algum campo!"
                );
                return;
              }

              if (!validateCpf(id)) {
                Alert.alert("CPF inválido", "O CPF deve ter 11 dígitos.");
                return;
              }

              AlterStudent(id, userName, Cpf);
              setIsEditUserOpen(false);
            }}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsEditUserOpen(false)}>
            <Text style={styles.closeButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={isEditAbsenceOpen}
        animationType="fade"
        transparent={false}
      >
        <View style={styles.modal}>
          <Text style={styles.title}>Editar justificativa de falta</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 05/05/2022"
            value={absenceDate}
            onChangeText={setAbsenceDate}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              AlterAbsence(Cpf, absenceDate);
            }}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsEditAbsenceOpen(false)}>
            <Text style={styles.closeButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "75%",
    height: "6%",
    backgroundColor: "#2494f4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  closeButton: {
    fontSize: 16,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  icon: {
    fontSize: 45,
    color: "#4F4F4F",
    position: "absolute",
    top: "5%",
    right: "5%",
    zIndex: 1,
  },
});

export default StudentProfile;