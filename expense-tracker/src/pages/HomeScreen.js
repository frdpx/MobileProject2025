import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TransactionHistory from "../components/transactions/TransactionHistory";
import Background from "../components/common/Background";
import TotalCard from "../components/transactions/TotalCard";
import { Ionicons } from "@expo/vector-icons";
import { useTransactionStore } from "../store/useTransactions";
import { useAuthStore } from "../store/useAuthStore";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [pressed, setPressed] = useState(false);

  const { user } = useAuthStore();
  const { transactions, listenTransactions, deleteTransaction } =
    useTransactionStore();

  useEffect(() => {
    if (user?.uid) {
      const unsub = listenTransactions(user.uid);
      return () => unsub && unsub(); // cleanup listener ตอนออกจากหน้า
    }
  }, [user]);

  const handleAddButtonPressed = () => {
    navigation.navigate("AddTransactions", { mode: "add" });
  };

  const handleEditTransaction = (item) => {
    navigation.navigate("AddTransactions", { mode: "edit", transaction: item });
  };

  const handleDeleteTransaction = (item) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTransaction(item.id),
      },
    ]);
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Background firstName={user?.firstName} lastName={user?.lastName} />
      <TotalCard />
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  history: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addButton: {
    alignItems: "center",
    marginVertical: 20,
  },
});
