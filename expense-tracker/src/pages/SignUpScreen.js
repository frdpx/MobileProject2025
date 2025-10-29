import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Alert,
  Keyboard,
  Platform,
  InputAccessoryView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthBackground from "../components/common/AuthBackground";
import Button from "../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import FormInput from "../components/common/FormInput";
import PasswordInput from "../components/common/PasswordInput";
import Calendar from "../components/calendar/calendar";
import { useAuthStore } from "../store/useAuthStore";

export const SignUpSreen = () => {
  const navigation = useNavigation();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState(undefined);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, loading } = useAuthStore();

  const handleSignUp = async () => {
    if (
      !firstname ||
      !lastname ||
      !email ||
      !mobile ||
      !dob ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      // ป้องกัน dob เป็น undefined หรือ parse ไม่ได้
      if (!(dob instanceof Date) || isNaN(dob.getTime())) {
        Alert.alert("Error", "กรุณาเลือกวันเกิดให้ถูกต้อง");
        return;
      }

      // เก็บแบบ date-only ไม่ผูก timezone (กันเพี้ยน -1 วัน)
      const y = dob.getFullYear();
      const m = String(dob.getMonth() + 1).padStart(2, "0");
      const d = String(dob.getDate()).padStart(2, "0");
      const dateOfBirth = `${y}-${m}-${d}`;

      await register({
        firstName: firstname,
        lastName: lastname,
        email,
        mobile,
        dateOfBirth, // << ส่งสตริง YYYY-MM-DD เข้าไป
        password,
      });

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Sign up failed:", error);
      Alert.alert("Error", error.message || "Sign up failed");
      return;
    }
  };

  const accessoryId = "mobileDoneAccessory";

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // ถ้าหัวมี Header สูง ๆ ปรับ offset ได้ เช่น 8–24
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        {/* แตะพื้นหลังเพื่อปิดคีย์บอร์ด */}
        <Pressable style={styles.flex1} onPress={Keyboard.dismiss}>
          <AuthBackground
            header={<Text style={styles.headerTitle}>Sign Up</Text>}
          >
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingBottom: 40,
                rowGap: 12,  
          }}
              keyboardShouldPersistTaps="handled"
            >
              <FormInput
                label={"First Name"}
                placholder={"Please input your first name"}
                value={firstname}
                onChangeText={setFirstname}
                returnKeyType="next"
              />

              <FormInput
                label={"Last Name"}
                placholder={"Please input your last name"}
                value={lastname}
                onChangeText={setLastname}
                returnKeyType="next"
              />

              <FormInput
                label={"Email"}
                placholder={"Please input your email"}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
              />

              {/* Mobile number */}
              <FormInput
                label={"Mobile Number"}
                placholder={"Please input your mobile number"}
                value={mobile}
                onChangeText={setMobile}
                keyboardType={
                  Platform.OS === "ios" ? "number-pad" : "phone-pad"
                }
                returnKeyType="done"
                blurOnSubmit
                onSubmitEditing={Keyboard.dismiss}
                inputAccessoryViewID={
                  Platform.OS === "ios" ? accessoryId : undefined
                }
              />

              {/* แถบ Done สำหรับ iOS number-pad */}
              {Platform.OS === "ios" && (
                <InputAccessoryView nativeID={accessoryId}>
                  <View style={styles.accessoryBar}>
                    <Pressable
                      onPress={Keyboard.dismiss}
                      style={styles.doneBtn}
                    >
                      <Text style={styles.doneText}>Done</Text>
                    </Pressable>
                  </View>
                </InputAccessoryView>
              )}

              {/* DOB (ถูกล็อกให้พิมพ์ไม่ได้อยู่แล้ว) */}
              <View style={{ marginBottom: 14 }}>
                <Calendar label="Date of Birth" value={dob} onChange={setDob} />
              </View>

              <PasswordInput value={password} onChangeText={setPassword} />
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <Button
                title={loading ? "Creating..." : "Sign Up"}
                onPress={handleSignUp}
                width={"100%"}
                color={"black"}
                textColor={"#fff"}
              />

              <View style={styles.footerRow}>
                <Text style={styles.footer}>Already have an account? </Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={[
                      styles.footer,
                      { color: "#a538abff", fontWeight: "bold" },
                    ]}
                  >
                    Log In
                  </Text>
                </Pressable>
              </View>

              <View style={{ height: 12 }} />
            </ScrollView>
          </AuthBackground>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  screen: { flex: 1, backgroundColor: "#fff" },
  headerTitle: { fontSize: 32, fontWeight: "bold", color: "#000" },
  // body: {
  //   paddingHorizontal: 20,
  //   paddingBottom: 16,
  //   gap: 12, // ช่องไฟสม่ำเสมอระหว่างฟิลด์
  // },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  footer: { textAlign: "center", color: "#000" },
  accessoryBar: {
    backgroundColor: "#f2f2f2",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    alignItems: "flex-end",
    paddingRight: 12,
  },
  doneBtn: { paddingVertical: 10, paddingHorizontal: 16 },
  doneText: { color: "#007aff", fontWeight: "600", fontSize: 16 },
});
