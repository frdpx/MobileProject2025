import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { transactions } from "../../mock/transactionHistory";
import { groupByPeriod } from "../../utils/groupByPeriod";
import { calcTotal } from "../../utils/calcTotal";

const Summary = ({ label, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>฿{value.toLocaleString()}</Text>
    </View>
  );
};

const SummaryCard = ({ transactions, tab, month, year }) => {
  const periods = {
    Day: groupByPeriod(transactions, "day", month, year),
    Week: groupByPeriod(transactions, "week", month, year),
    Month: groupByPeriod(transactions, "month", month, year),
  };

  return (
    <View style={styles.row}>
      {Object.entries(periods).map(([key, txs]) => (
        <Summary key={key} label={key} value={calcTotal(txs, tab)} />
      ))}
    </View>
  );
};
export default SummaryCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
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
