import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { transactions } from "../mock/transactionHistory";
import Header from "../components/Header";
import ChartTabs from "../components/ChartTabs";
import PieChartCard from "../components/PieChartCard";

export const ChartScreen = () => {
  const [activeTab, setActiveTab] = useState("total");

  return (
    <View style={styles.container}>
      <Header balance={10870} />
      <ChartTabs activeTab={activeTab} onChangeTab={setActiveTab} />
      <View style={styles.chartWrapper}>
        <PieChartCard transactions={transactions} tab={activeTab} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chartWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
