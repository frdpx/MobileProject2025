import { NavigationContainer } from "@react-navigation/native";
import { MainTabNavigator } from "./MainTabNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddTransactionsScreen } from "../pages/AddTransactionsScreen";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MainTab">
              {(props) => <MainTabNavigator {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="AddTransactions"
              component={AddTransactionsScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Auth">
            {(props) => <AuthNavigator {...props} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
