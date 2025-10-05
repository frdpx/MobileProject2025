import { View, Text, StyleSheet } from "react-native";
import { useTransactionStore } from "../../store/useTransactions";
import { calcBalance } from "../../utils/calcTotal";

const Header = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const balance = calcBalance(transactions);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Balance</Text>
      <Text style={styles.amount}>
        ฿{(balance.total ?? 0).toLocaleString()}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    paddingTop: 50,
    paddingVertical: 20,
    alignItems: "center",
  },
  title: {
    color: "gray",
    fontSize: 14,
  },
  amount: {
    color: "#000000ff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
});
