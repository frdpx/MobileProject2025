import { View, StyleSheet, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const PieChartCard = ({ income, expenses }) => {
  const pieData = [
    {
      name: "Income",
      amount: income || 0,
      color: "lightgreen",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Expenses",
      amount: expenses || 0,
      color: "salmon",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={240}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="20"
        hasLegend={true}
        chartConfig={{
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        style={{ marginVertical: 10 }}
      />
    </View>
  );
};

export default PieChartCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
});
