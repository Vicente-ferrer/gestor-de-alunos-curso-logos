import React from "react";
import { SafeAreaView, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/Home/Index";
import ReportsScreen from "../Screens/Reports/Index";
import NewStudentScreen from "../Screens/CreateStudent/Index";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
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
