import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Background = ({ firstname, lastname }) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />

      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
        <Text style={styles.username}>
          {firstname} {lastname}
        </Text>
      </View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 200,
    justifyContent: "flex-start",
  },
  backgroundCircle: {
    position: "absolute",
    top: -250,
    width: width * 1.25,
    height: width * 1.25,
    borderRadius: (width * 1.25) / 2,
    backgroundColor: "black",
    opacity: 0.63,
    zIndex: -1,
    alignSelf: "center",
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 60,
  },
  welcomeText: {
    color: "white",
    fontSize: 14,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
