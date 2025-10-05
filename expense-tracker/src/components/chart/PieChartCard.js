import { View, StyleSheet, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { groupTransactionByCategory } from "../../utils/groupTransaction";
import { isEmptyTransactions } from "../../utils/isEmpty";

const screenWidth = Dimensions.get("window").width;

const PieChartCard = ({ transactions, tab, month, year }) => {
  const pieData = groupTransactionByCategory(transactions, tab, month, year);
  // const isEmpty =
  //   !pieData ||
  //   pieData.length === 0 ||
  //   pieData.every((item) => item.amount === 0);
  if (isEmptyTransactions(pieData)) {
    return <Text style={styles.noData}>No data</Text>;
  }

  return (
    <View style={styles.container}>
      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={180}
        accessor="amount"
        backgroundColor="transparent"
        chartConfig={{
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        hasLegend={true}
      />
    </View>
  );
};

export default PieChartCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  legend: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#333",
  },
  noData: {
    textAlign: "center",
    marginVertical: 50,
  },
});
