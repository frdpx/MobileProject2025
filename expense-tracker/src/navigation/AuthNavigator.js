import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogInScreen } from "../pages/LogInScreen";
import { SignUpSreen } from "../pages/SignUpScreen";
import { WelcomeScreen } from "../pages/WelcomeScreen";
import { ForgotPasswordScreen } from "../pages/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();
export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="Signup" component={SignUpSreen} />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
