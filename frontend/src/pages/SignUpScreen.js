import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import AuthBackground from "../components/common/AuthBackground";
import Button from "../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import FormInput from "../components/common/FormInput";
import PasswordInput from "../components/common/PasswordInput";
import { DatePickerInput } from "react-native-paper-dates";

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
  // เช็คว่ามีช่องว่างที่ยังไม่ได้กรอก
  if (!firstname || !lastname || !email || !mobile || !dob || !password || !confirmPassword) {
    alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  // เช็ครหัสผ่านตรงกันไหม
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // ถ้าผ่านทุก validation
  console.log("Signup success:", {
    firstname,
    lastname,
    email,
    mobile,
    dob,
    password,
  });

  // TODO: ส่งข้อมูลไป backend หรือ firebase ได้
};


  return (
    <AuthBackground header={<Text style={styles.headerTitle}>Sign Up</Text>}>
      {/* First Name */}
      <FormInput
        label={"First Name"}
        placholder={"John"}
        value={firstname}
        onChangeText={setFirstname}
      />

      {/* Last Name */}
      <FormInput
        label={"Last Name"}
        placholder={"Doe"}
        value={lastname}
        onChangeText={setLastname}
      />

      {/* Email */}
      <FormInput
        label={"Email"}
        placholder={"example@example.com"}
        value={email}
        onChangeText={setEmail}
      />

      {/* Mobile */}
      <FormInput
        label={"Mobile Number"}
        placholder={"0812345678"}
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />

      {/* Date of Birth */}
      <DatePickerInput
        locale="en"
        label="Date of Birth"
        value={dob}
        onChange={(d) => setDob(d)}
        inputMode="start"
        style={{ marginTop: 10 }}
      />

      {/* Password */}
      <PasswordInput value={password} onChangeText={setPassword} />

      {/* Confirm Password */}
      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Signup Button */}
      <Button
        title="Sign Up"
        onPress={handleSignUp}
        width={"100%"}
        color={"black"}
        textColor={"#fff"}
      />

      {/* Extra Links */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text style={styles.footer}>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate("LoginScreen")}>
          <Text
            style={[styles.footer, { color: "#a538abff", fontWeight: "bold" }]}
          >
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

