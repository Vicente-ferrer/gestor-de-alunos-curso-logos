import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/Home/Index";
import ReportsScreen from "../Screens/Reports/Index";
import NewStudentScreen from "../Screens/CreateStudent/Index";
import Preload from "../Screens/Preload/Index";
import MainTab from "./TabRoutes";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <View style={{ flex: 1 }} initialRouteName="Preload">
      <Stack.Navigator>
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
          name="Home_Screen"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Reports_Screen"
          options={{ headerShown: false }}
          component={ReportsScreen}
        />
        <Stack.Screen
          name="NewStudent_Screen"
          options={{ headerShown: false }}
          component={NewStudentScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Routes;
