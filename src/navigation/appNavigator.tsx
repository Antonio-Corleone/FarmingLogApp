import AddEditLogScreen from "@/src/screens/AddEditLogScreen";
import LogListScreen from "@/src/screens/LogListScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LogList">
      <Stack.Screen
        name="LogList"
        component={LogListScreen}
        options={{ title: "Farming Logs" }}
      />
      <Stack.Screen
        name="AddEditLog"
        component={AddEditLogScreen}
        options={{ title: "Activity Detail" }}
      />
    </Stack.Navigator>
  );
};
