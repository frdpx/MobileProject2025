import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { transactions } from "../mock/transactionHistory";
import PieChartCard from "../components/PieChartCard";
import Header from "../components/Header";
export const ChartScreen = () => {
  const balance = 12500;
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={styles.container}>
      <Header balance={balance} />
      <View style={styles.pieChart}>
        <PieChartCard income={income} expenses={expenses} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pieChart: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
