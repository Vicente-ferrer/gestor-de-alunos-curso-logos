import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { baseUrl } from "../Services/Config";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [students, setStudents] = useState();

  const NewStudent = async (cpf, username) => {
    try {
      const resp = await axios.post(`${baseUrl}students`, {
        cpf: cpf,
        username: username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ValidateFrequency = async () => {
    const studentId = await SecureStore.getItemAsync("StudentId");
    try {
      const res = await axios.post(
        `${baseUrl}frequency?studentId=${studentId}`
      );
    } catch (error) {
      console.log(error);
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

  const exportSheetPerDay = async (filteredDate) => {
    try {
      const resp = await axios.post(`${baseUrl}frequency/sheet`, {
        date: filteredDate,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const exportSheetPerMonth = async () => {
    try {
      const resp = await axios.get(`${baseUrl}frequency/sheet`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ValidateFrequency,
        GetAllStudents,
        students,
        NewStudent,
        exportSheetPerDay,
        exportSheetPerMonth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
