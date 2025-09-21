// components/common/AuthBackground.js
import { View, StyleSheet } from "react-native";

const AuthBackground = ({ header, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>{header}</View>
      <View style={styles.bottomBackground}>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

export default AuthBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 40,
    marginVertical: 50,
    alignItems: "center",
  },
  bottomBackground: {
    backgroundColor: "#f6d7fdff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    height: "85%",
    marginTop: "auto",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 40,
  },
});
