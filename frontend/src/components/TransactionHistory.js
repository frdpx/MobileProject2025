import { FlatList, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TransactionHistory = ({ data }) => {
  const renderItem = ({ item }) => {
    const icon = item.category.toLowerCase();
    const iconColor = item.type === "income" ? "#C8F7C5" : "#FADBD8";
    const iconName =
      icon === "salary"
        ? "wallet"
        : icon === "food"
        ? "fast-food"
        : icon === "gift"
        ? "gift"
        : icon === "shopping"
        ? "cart"
        : icon === "travel"
        ? "airplane"
        : icon === "medical"
        ? "bandage"
        : icon === "party"
        ? "beer"
        : icon === "sport"
        ? "barbell"
        : icon === "other"
        ? "heart"
        : "pricetag";

    return (
      <View style={styles.row}>
        <View style={[styles.iconWrapper, { backgroundColor: iconColor }]}>
          <Ionicons name={iconName} color={"black"} size={18} />
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{item.category}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <Text style={styles.amount}>${item.amount.toLocaleString()}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
