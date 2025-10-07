import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AuthBackground from "../components/common/AuthBackground";
import FormInput from "../components/common/FormInput";
import Button from "../components/common/Button";
import { useAuthStore } from "../store/useAuthStore";

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const forgotPassword = useAuthStore((s) => s.forgotPassword);

  const handleSend = async () => {
    try {
      await forgotPassword(email);
      Alert.alert(
        "Check your email",
        "We sent you a password reset link."
      );
      navigation.goBack(); // หรือ navigation.navigate("Login")
    } catch (e) {
      Alert.alert("Reset failed", e?.message ?? "Please try again");
    }
  };

  return (
    <AuthBackground header={<Text style={styles.headerTitle}>Forgot Password</Text>}>
      <FormInput
        label="Email"
        placeholder="example@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Send reset link" onPress={handleSend} width="100%" color="black" textColor="#fff" />
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  headerTitle: { fontSize: 32, fontWeight: "bold", color: "#000" },
});
