import { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import AuthBackground from "../components/common/AuthBackground";
import Button from "../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import FormInput from "../components/common/FormInput";
import PasswordInput from "../components/common/PasswordInput";
import { useAuthStore } from "../store/useAuthStore";

export const LogInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleLoginButtonPressed = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password");
      return;
    }
    try {
      await login(email.trim(), password.trim());
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed", error.message || "Invalid credentials");
    }
  };

  return (
    <AuthBackground header={<Text style={styles.headerTitle}>Log In</Text>}>
      {/* Username or Email */}
      <FormInput
        label={"Email"}
        placeholder={"example@example.com"}
        value={email}
        onChangeText={(text) => setEmail(text.trim())}
      />

      <PasswordInput value={password} onChangeText={setPassword} />

      <Button
        title="Log In"
        onPress={handleLoginButtonPressed}
        width={"100%"}
        color={"black"}
        textColor={"#fff"}
      />

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
