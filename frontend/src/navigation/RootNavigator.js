import { NavigationContainer } from "@react-navigation/native";
import { MainTabNavigator } from "./MainTabNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddTransactionsScreen } from "../pages/AddTransactionsScreen";

const Stack = createNativeStackNavigator();

const isLoggedIn = true;
export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MainTab" component={MainTabNavigator} />
            <Stack.Screen
              name="AddTransactions"
              component={AddTransactionsScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
