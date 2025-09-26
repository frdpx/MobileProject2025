import { NavigationContainer } from "@react-navigation/native";
import { MainTabNavigator } from "./MainTabNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddTransactionsScreen } from "../pages/AddTransactionsScreen";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MainTab">
              {(props) => (
                <MainTabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="AddTransactions"
              component={AddTransactionsScreen}
            />
          </>
        ) : (
          // ส่ง setIsLoggedIn ลงไปให้ AuthNavigator
          <Stack.Screen name="Auth">
            {(props) => <AuthNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
