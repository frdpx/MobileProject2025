import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { transactions } from "../mock/transactionHistory";
import Header from "../components/common/Header";
import ChartTabs from "../components/chart/ChartTabs";
import PieChartCard from "../components/chart/PieChartCard";
import MonthDropdown from "../components/chart/MonthDropdown";
import SummaryCard from "../components/chart/SummaryCard";
import CategoryList from "../components/chart/CategoryList";
import { this_month, this_year } from "../utils/dateUtils";
import { groupTransactionByCategory } from "../utils/groupTransaction";
import { calcBalance } from "../utils/calcTotal";

export const ChartScreen = () => {
  const [activeTab, setActiveTab] = useState("total");
  const [month, setMonth] = useState(this_month);
  const [year, setYear] = useState(this_year);

  const totalBalance = calcBalance(transactions);

  return (
    <View style={styles.container}>
      <Header balance={totalBalance} />
      <ChartTabs activeTab={activeTab} onChangeTab={setActiveTab} />
      <View style={styles.dropdown}>
        <MonthDropdown value={month} onChange={setMonth} width={160} />
      </View>
      <View style={styles.chartWrapper}>
        <PieChartCard
          transactions={transactions}
          tab={activeTab}
          month={month}
          year={year}
        />
        <SummaryCard
          transactions={transactions}
          tab={activeTab}
          month={month}
          year={year}
        />
        <CategoryList
          transactions={transactions}
          tab={activeTab}
          month={month}
          year={year}
        />
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
    marginVertical: 5,
  },
  dropdown: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 5,
  },
});
