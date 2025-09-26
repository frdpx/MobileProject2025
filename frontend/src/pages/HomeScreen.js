import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TransactionHistory from "../components/transactions/TransactionHistory";
import { balanceData } from "../mock/balanceData";
import { transactions as mockTransactions } from "../mock/transactionHistory";
import Background from "../components/common/Background";
import TotalCard from "../components/transactions/TotalCard";
import { Ionicons } from "@expo/vector-icons";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState(mockTransactions);
  const [pressed, setPressed] = useState(false);

  const handleAddButtonPressed = () => {
    navigation.navigate("AddTransactions", { setTransactions, transactions });
  };

  const handleEditTransaction = (item) => {
    navigation.navigate("AddTransactions", { setTransactions, transactions, transaction: item });
  };

  const handleDeleteTransaction = (item) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTransactions((prev) => prev.filter((t) => t.id !== item.id));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background firstname="MooDeng" lastname="Safariworld" />
      <TotalCard balance={balanceData} />
      <View style={styles.addButton}>
        <TouchableOpacity
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          onPress={handleAddButtonPressed}
        >
          <Ionicons
            name="add-circle"
            size={80}
            color={pressed ? "#75617cff" : "#333"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.history}>
        <TransactionHistory
          data={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  history: { flex: 1, paddingHorizontal: 20 },
  addButton: { alignItems: "center", marginVertical: 20 },
});
