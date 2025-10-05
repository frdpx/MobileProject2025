import { TextInput } from "react-native-paper";

const FormInput = ({
  label,
  value,
  onChangeText,
  placholder,
  style,
  ...props
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placholder}
      mode="outlined"
      style={[{ marginBottom: 16, width: "100%" }, style]}
      theme={{
        colors: {
          text: "#FFFFFF",
          placeholder: "#bab8b8ff",
          outline: "#CCCCCC",
        },
      }}
      {...props}
    />
  );
};

export default FormInput;
