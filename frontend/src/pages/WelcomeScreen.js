import { View, Image, StyleSheet, Text } from "react-native";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";
import Images from "../constants/images";
import Button from "../components/Button";

export const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    AlfaSlabOne: AlfaSlabOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const LogInButtonPressed = () => {
    navigation.navigate("Login");
  };

  const SignUpButtonPressed = () => {
    navigation.navigate("Signup");
  };
  return (
    <View style={styles.container}>
      <Image source={Images.Logo} style={styles.logo} />
      <View>
        <Text style={styles.title}>KebTang</Text>
        <Text style={styles.subtitle}>Easily control your finances</Text>
        <Text style={styles.subtitle}>Record all your income and expenses</Text>
      </View>

      <View style={styles.button}>
        <Button title="Log In" onPress={LogInButtonPressed} />
        <Button title="Sign Up" onPress={SignUpButtonPressed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 36,
    textAlign: "center",
    fontFamily: "AlfaSlabOne",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 5,
  },
  button: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
});
