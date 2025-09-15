import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BalanceCard = ({ balance }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Total Balance</Text>

        <Text style={styles.amount}>฿{balance.total.toLocaleString()}</Text>

        <View style={styles.row}>
          <View style={styles.col}>
            <View style={styles.rowCenter}>
              <Ionicons name="arrow-down-circle" size={16} color="lightgreen" />
              <Text style={[styles.label, { color: "lightgreen" }]}>
                Income
              </Text>
            </View>
            <Text style={styles.value}>฿{balance.income.toLocaleString()}</Text>
          </View>

          <View style={[styles.col, { alignItems: "flex-end" }]}>
            <View style={styles.rowCenter}>
              <Ionicons name="arrow-up-circle" size={16} color="salmon" />
              <Text style={[styles.label, { color: "salmon" }]}>Expenses</Text>
            </View>
            <Text style={styles.value}>
              ฿{balance.expenses.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#333",
    marginTop: -70,
    borderRadius: 20,
    padding: 20,
    width: "90%",
  },
  title: { color: "#aaa", fontSize: 14 },
  amount: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  col: {
    flex: 1,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  value: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
