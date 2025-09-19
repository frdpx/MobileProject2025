import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Summary = ({ label, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>฿{value.toLocaleString()}</Text>
    </View>
  );
};

const SummaryCard = ({ summary }) => {
  const [month, setMonth] = useState("Month");

  return (
    <View style={styles.row}>
      {Object.entries(summary).map(([key, val]) => (
        <Summary
          key={key}
          label={key}
          value={val}
          onPress={() => setMonth(key)}
        />
      ))}
    </View>
  );
};
export default SummaryCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
