import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Platform,
  ActionSheetIOS,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import { categoryIcons, defaultIcon } from "../constants/icons";
import { normalizeKey } from "../utils/string";

const TransactionHistory = ({ data, onEdit, onDelete }) => {
  const latest = [...data]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  const [detailIndex, setDetailIndex] = useState(null);

  const handleMenuPress = (index, item) => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "View Comment", "Edit", "Delete"],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 3,
        },
        (buttonImdex) => {
          if (buttonImdex === 1) {
            setDetailIndex(detailIndex === index ? null : index);
          } else if (buttonImdex === 2) {
            onEdit?.(item);
          } else if (buttonImdex === 3) {
            onDelete?.(item);
          }
        }
      );
    } else {
      Alert.alert(
        "Options",
        "Choose an option",
        [
          {
            text: "View Comment",
            onPress: () => setDetailIndex(detailIndex === index ? null : index),
          },
          { text: "Edit", onPress: () => onEdit?.(item) },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => onDelete?.(item),
          },
          { text: "Cancel", style: "cancel" },
        ],
        {
          cancelable: true,
        }
      );
    }
  };

  const renderItem = ({ item, index }) => {
    const iconColor = item.type === "income" ? "#C8F7C5" : "#FADBD8";
    const category = normalizeKey(item.category);
    const iconName = categoryIcons[category] || defaultIcon;

    const isExpanded = detailIndex === index;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <View style={[styles.iconWrapper, { backgroundColor: iconColor }]}>
            <Ionicons name={iconName} color={"black"} size={18} />
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>{item.category}</Text>
            <Text style={styles.date}>{formatDate(item.date)}</Text>
          </View>

          <Text style={styles.amount}>฿{item.amount.toLocaleString()}</Text>

          <TouchableOpacity onPress={() => handleMenuPress(index, item)}>
            <Ionicons name="ellipsis-vertical" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {isExpanded && (
          <View style={styles.commentExpand}>
            <Text style={styles.commentText}>
              {item.comment || "No Comment"}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={latest}
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
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
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
  commentExpand: {
    marginTop: 5,
    paddingLeft: 52,
  },
  commentText: {
    fontSize: 12,
    color: "#555",
    fontStyle: "italic",
  },
});
