import { View, StyleSheet, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { groupTransactionByCategory } from "../utils/groupTransaction";

const screenWidth = Dimensions.get("window").width;

const PieChartCard = ({ transactions, tab }) => {
  const pieData = groupTransactionByCategory(transactions, tab).map((item) => ({
    name: item.name,
    amount: item.amount,
    color: item.color,
    legendFontColor: "#333",
    legendFontSize: 12,
  }));

  if (pieData.length === 0) {
    return <Text style={styles.noData}>No data</Text>;
  }

  return (
    <View style={styles.container}>
      <PieChart
        data={pieData}
        width={screenWidth - 10}
        height={180}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
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
    marginTop: 20,
  },
});
