import { createContext, useState } from "react";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Alert, Linking } from "react-native";
import axios from "axios";
import {baseUrl} from "../Config";

export const AuthContext = createContext({});

// context providers for use on all screens

export const AuthProvider = ({ children }) => {
    const [students, setStudents] = useState();
    const [frequencyHistory, setFrequencyHistory] = useState();
    const [validateMessage, setValidateMessage] = useState("");
  
    const NewStudent = async (cpf, username) => {
      try {
        const resp = await axios.post(`${baseUrl}students`, {
          cpf: cpf,
          username: username,
        });
  
        if (resp.status >= 200 && resp.status < 300) {
          Alert.alert("Estudante criado com sucesso!");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          Alert.alert("Erro ao salvar ");
        }
      }
    };
  
    const AlterStudent = async (id, userName, Cpf) => {
      try {
        const resp = await axios.patch(
          `${baseUrl}students?studentId=${Cpf}`,
          {
            cpf: id,
            username: userName,
          },
          {
            headers: {
              "Content-Type": "application/json",
              'studentId': Cpf,
            },
          }
        );
  
        if (resp.status >= 200 && resp.status < 300) {
          Alert.alert("Estudante atualizado com sucesso!");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          Alert.alert("Erro ao atualizar ");
        }
      }
    };
  
    const DeleteStudent = async (Cpf) => {
      try {
        const res = await axios.delete(`${baseUrl}students?studentId=${Cpf}`);
        if (res.status >= 200 && res.status < 300) {
          Alert.alert("Estudante deletado com sucesso!");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          Alert.alert("Erro ao deletar ");
        }
      }
    };
   
  
    
   
    
    
  const GenerateQrcode = async (Cpf) => {
    try {
      const res = await axios.get(`${baseUrl}qrcode/generate?studentId=${Cpf}`);
      if (res.status >= 200 && res.status < 300) {
        const { data } = res;
        const fileUri = FileSystem.cacheDirectory + 'qrcode.png';
        await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.Base64 });
        Sharing.shareAsync(fileUri, { mimeType: 'image/png', dialogTitle: 'Compartilhar QR Code' });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao gerar QR Code ");
    }
  };
    
  
    const ValidateFrequency = async (studentId) => {
      try {
        const res = await axios.post(
          `${baseUrl}frequency?studentId=${studentId}`,
          { studentId: studentId }
        );
        setValidateMessage(res.data.message);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          Alert.alert("Erro ao validar ");
        }
      }
    };
  
    const JustifyAbsence = async (studentId , date ) => {
      try {
        const resp = await axios.post(
          `${baseUrl}frequency?studentId=${studentId}&date=${date}`,
          {
            cpf: studentId,
            date: date,
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    const AlterAbsence = async (Cpf, absenceDate) => {
      try {
        const resp = await axios.put(`${baseUrl}frequency?studentId=${Cpf}&date=${absenceDate}`);
        if (resp.status >= 200 && resp.status < 300) {
          Alert.alert("Estudante deletado com sucesso!");
        }
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          console.log(error);
          Alert.alert("Erro ao deletar ");
        }
      }
    };
    
  
    const GetAllStudents = async () => {
      try {
        const res = await axios.get(`${baseUrl}students/get-all`);
        setStudents(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const GetFrequencyHistory = async (cpf) => {
      try {
        const resp = await axios.get(`${baseUrl}frequency?studentId=${cpf}`);
        setFrequencyHistory(resp.data.daysListThatStudentGoToClass);
      } catch (error) {
        console.log(error);
      }
    };
  
    const exportSheetPerDay = async (filteredDate) => {
      try {
        const url = `${baseUrl}frequency/sheet?date=${filteredDate}`;
        await Linking.openURL(url);
      } catch (error) {
        console.log(error);
      }
    };
  
    const exportSheetPerMonth = async () => {
      try {
        const url = `${baseUrl}/frequency/sheet`;
        Linking.openURL(url).catch((err) =>
          console.error("Erro ao abrir o URL:", err)
        );
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <AuthContext.Provider
        value={{
          GenerateQrcode,
          ValidateFrequency,
          GetFrequencyHistory,
          GetAllStudents,
          students,
          frequencyHistory,
          NewStudent,
          AlterStudent,
          DeleteStudent,
          exportSheetPerDay,
          exportSheetPerMonth,
          JustifyAbsence,
          AlterAbsence,
          validateMessage,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };