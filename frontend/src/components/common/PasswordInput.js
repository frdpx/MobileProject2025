import { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const PasswordInput = ({ value, onChangeText, style, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextInput
      label={"Password"}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      style={[styles.input, style]}
      secureTextEntry={!showPassword}
      theme={{
        colors: {
          text: "#FFFFFF",
          placeholder: "#bab8b8ff",
          outline: "#CCCCCC",
        },
      }}
      right={
        <TextInput.Icon
          icon={showPassword ? "eye" : "eye-off"}
          onPress={() => setShowPassword(!showPassword)}
          forceTextInputFocus={false}
          color="#817b7bff"
        />
      }
      {...props}
    />
  );
};
export default PasswordInput;

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    width: "100%",
  },
});
