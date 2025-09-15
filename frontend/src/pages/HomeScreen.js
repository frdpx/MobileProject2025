import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../components/Background";
import BalanceCard from "../components/TotalCard";
import { balanceData } from "../mock/balanceData";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TransactionHistory from "../components/TransactionHistory";
import { transactions } from "../mock/transactionHistory";

export const HomeScreen = () => {
  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation();

  const handleAddButtonPressed = () => {
    navigation.navigate("AddTransactions");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Background firstname="MooDeng" lastname="Safariworld" />
      <BalanceCard balance={balanceData} />
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
        <TransactionHistory data={transactions} />
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
