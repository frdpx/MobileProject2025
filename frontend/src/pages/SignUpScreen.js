import { useState } from "react";
import { Pressable, StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import AuthBackground from "../components/common/AuthBackground";
import Button from "../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import FormInput from "../components/common/FormInput";
import PasswordInput from "../components/common/PasswordInput";
import Calendar from "../components/calendar/calendar";

export const SignUpSreen = () => {
  const navigation = useNavigation();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState(undefined);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // ตรวจสอบว่ากรอกครบทุกช่อง
    if (!firstname || !lastname || !email || !mobile || !dob || !password || !confirmPassword) {
      Alert.alert("❌ Error", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    // ตรวจสอบรหัสผ่านตรงกัน
    if (password !== confirmPassword) {
      Alert.alert("❌ Error", "Passwords do not match!");
      return;
    }

    // Mock signup success
    console.log("Signup success:", {
      firstname,
      lastname,
      email,
      mobile,
      dob,
      password,
    });

    // ไปหน้า Login หลัง signup สำเร็จ
    navigation.navigate("Login"); // ตรวจสอบชื่อ screen ให้ตรงกับ AuthNavigator
  };

  return (
    <AuthBackground header={<Text style={styles.headerTitle}>Sign Up</Text>}>
      <FormInput
        label={"First Name"}
        placholder={"John"}
        value={firstname}
        onChangeText={setFirstname}
      />

      <FormInput
        label={"Last Name"}
        placholder={"Doe"}
        value={lastname}
        onChangeText={setLastname}
      />

      <FormInput
        label={"Email"}
        placholder={"example@example.com"}
        value={email}
        onChangeText={setEmail}
      />

      <FormInput
        label={"Mobile Number"}
        placholder={"0812345678"}
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />

      {/* Calendar component */}
      <Calendar label="Date of Birth" value={dob} onChange={setDob} />

      <PasswordInput value={password} onChangeText={setPassword} />

      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        title="Sign Up"
        onPress={handleSignUp}
        width={"100%"}
        color={"black"}
        textColor={"#fff"}
      />

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        <Text style={styles.footer}>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.footer, { color: "#a538abff", fontWeight: "bold" }]}>
            Log In
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
  footer: {
    textAlign: "center",
    marginTop: 10,
    color: "#000",
  },
});
