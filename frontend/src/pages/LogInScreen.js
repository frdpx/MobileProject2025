import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import AuthBackground from "../components/common/AuthBackground";
import Button from "../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import FormInput from "../components/common/FormInput";
import PasswordInput from "../components/common/PasswordInput";

export const LogInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginButtonPressed = () => {
    console.log("Login Pressed");
  };

  return (
    <AuthBackground header={<Text style={styles.headerTitle}>Log In</Text>}>
      {/* Username or Email */}
      <FormInput
        label={"Email"}
        placholder={"example@example.com"}
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <PasswordInput value={password} onChangeText={setPassword} />

      {/* Login Button */}
      <Button
        title="Log In"
        onPress={handleLoginButtonPressed}
        width={"100%"}
        color={"black"}
        textColor={"#fff"}
      />

      {/* Extra Links */}
      <Pressable onPress={() => navigation.navigate("Forgot")}>
        <Text style={styles.link}>Forgot Password?</Text>
      </Pressable>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text style={styles.footer}>Don’t have an account? </Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text
            style={[styles.footer, { color: "#a538abff", fontWeight: "bold" }]}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    borderRadius: 25,
    marginTop: 10,
    paddingVertical: 8,
    width: "100%",
  },
  link: {
    textAlign: "center",
    marginTop: 16,
    fontWeight: "bold",
    color: "#a538abff",
  },
  footer: {
    textAlign: "center",
    marginTop: 10,
    color: "#000",
  },
});
