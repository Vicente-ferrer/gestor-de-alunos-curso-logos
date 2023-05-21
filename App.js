import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet,  Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppRoutes from "./src/routes/Index";
import { AuthProvider } from "./src/Context/ContextMethods";

const statusBarHeight = Platform.OS === "android" ?  45 : 18 ;

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
});