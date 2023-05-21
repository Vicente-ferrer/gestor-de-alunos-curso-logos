import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Preload from "../Screens/Preload/Index";
import MainTab from "./MainTab";
import StudentScreen from "../Screens/StudentProfile/Index";
import ReportScreen from "../Screens/Reports/Index";


const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="MainTab_Screen">
        <Stack.Screen
          name="Preload"
          options={{ headerShown: false }}
          component={Preload}
        />
        <Stack.Screen
          name="MainTab_Screen"
          options={{ headerShown: false }}
          component={MainTab}
        />
        <Stack.Screen
          name="Report_Screen"
          options={{ headerShown: false }}
          component={ReportScreen}
        />
        <Stack.Screen
          name="Student_Screen"
          options={{ headerShown: false }}
          component={StudentScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Routes;