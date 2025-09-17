import { View, StyleSheet, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { categoryColors } from "../constants/colors";

const screenWidth = Dimensions.get("window").width;

const PieChartCard = ({ transactions, tab }) => {
  let pieData = [];

  if (tab === "total") {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    pieData = [
      {
        name: "Income",
        amount: income,
        color: "lightgreen",
        legendFontColor: "#333",
        legendFontSize: 12,
      },
      {
        name: "Expense",
        amount: expenses,
        color: "salmon",
        legendFontColor: "#333",
        legendFontSize: 12,
      },
    ];
  } else {
    const filtered = transactions.filter(
      (t) => t.type.toLowerCase() === tab.toLowerCase()
    );

    const grouped = filtered.reduce((acc, t) => {
      const key = t.category.toLowerCase().replace(/\s+/g, "_");
      acc[key] = (acc[key] || 0) + t.amount;
      return acc;
    }, {});

    pieData = Object.entries(grouped).map(([cat, amount]) => ({
      name: cat.replace(/_/g, " "),
      amount,
      color: categoryColors[cat] || "#ccc",
      legendFontColor: "#333",
      legendFontSize: 12,
    }));
    // console.log("tab =", tab);
    // console.log("filtered =", filtered);
  }

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
    marginVertical: 25,
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
