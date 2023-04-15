import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import Axios from "./Config";

async function NewUser(cpf, username) {
  try {
    Axios.post("student", { cpf: cpf, username: username });
  } catch (error) {
    console.log(error);
  }
}

async function ValidateFrequency() {
  const [studentId, setStudentId] = useState("");
  try {
    SecureStore.getItemAsync("StudentId");
    Axios.post(`frequency?studentId=${studentId}`);
  } catch (error) {
    console.log(error);
  }
}

async function UserFrequencyData() {
  const [studentId, setStudentId] = useState("");
  try {
    SecureStore.getItemAsync("StudentId");
    Axios.get(`frequency?studentId=${studentId}`);
  } catch (error) {
    console.log(error);
  }
}

export default { NewUser, ValidateFrequency, UserFrequencyData };
