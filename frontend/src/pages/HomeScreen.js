import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/common/Background";
import TotalCard from "../components/transactions/TotalCard";
import { balanceData } from "../mock/balanceData";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TransactionHistory from "../components/transactions/TransactionHistory";
import { transactions } from "../mock/transactionHistory";

export const HomeScreen = () => {
  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation();

  const handleAddButtonPressed = () => {
    navigation.navigate("AddTransactions");
  };

  const handleEditTransaction = (item) => {
    navigation.navigate("AddTransactions");
  };

  const handleDeleteTransaction = (item) => {
    Alert.alert("confirm delete", "are u sure u want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          console.log("already deleted");
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
          activeOpacity={0.8}
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
