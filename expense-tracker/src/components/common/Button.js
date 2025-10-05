import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ title, onPress, width, color, textColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color, width: width }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
