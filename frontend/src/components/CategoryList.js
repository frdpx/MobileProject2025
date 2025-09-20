import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { groupTransactionByCategory } from "../utils/groupTransaction";

const CategoryList = ({ transactions, tab }) => {
  const data = groupTransactionByCategory(transactions, tab);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={20} color="#000" />
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.right}>
        <Text style={styles.amount}>฿ {item.amount.toLocaleString()}</Text>
        {item.percent && <Text style={styles.percent}>{item.percent}%</Text>}
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    padding: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    textTransform: "capitalize",
  },
  right: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 15,
    fontWeight: "600",
  },
  percent: {
    fontSize: 13,
    color: "#777",
  },
});
