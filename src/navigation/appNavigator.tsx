import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { View } from "react-native";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LogList">
      <Stack.Screen
        name="LogList"
        component={() => <View>Log Screen</View>}
        options={{ title: "Farming Logs" }}
      />
    </Stack.Navigator>
  );
};
