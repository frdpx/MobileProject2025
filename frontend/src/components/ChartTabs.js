import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TABS = ["Total", "Expense", "Income"];

const ChartTabs = ({ activeTab, onChangeTab }) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={styles.tab}
          onPress={() => onChangeTab(tab.toLowerCase())}
        >
          <Text
            style={[
              styles.label,
              activeTab === tab.toLowerCase() && styles.activeLabel,
            ]}
          >
            {tab}
          </Text>
          {activeTab === tab.toLowerCase() && <View style={styles.indicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChartTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 30,
  },
  tab: {
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#777",
  },
  activeLabel: {
    color: "#000",
    fontWeight: "bold",
  },
  indicator: {
    height: 2,
    backgroundColor: "#715337ff",
    width: "100%",
    marginTop: 4,
  },
});
