import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AuthBackground from "../components/common/AuthBackground";
import FormInput from "../components/common/FormInput";
import PasswordInput from "../components/common/PasswordInput";
import Button from "../components/common/Button";

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("❌ Error", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("❌ Error", "Passwords ไม่ตรงกัน");
      return;
    }
    navigation.navigate("Login"); // กลับหน้า Login
  };

  return (
    <AuthBackground header={<Text style={styles.headerTitle}>Forgot Password</Text>}>
      <FormInput label="Email" placholder="example@example.com" value={email} onChangeText={setEmail} />
      <PasswordInput label="New Password" value={password} onChangeText={setPassword} />
      <PasswordInput label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} />
      <Button title="Change Password" onPress={handleChangePassword} width="100%" color="black" textColor="#fff" />
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  headerTitle: { fontSize: 32, fontWeight: "bold", color: "#000" },
});
