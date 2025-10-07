import { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Calendar from "../components/calendar/calendar";
import { useTransactionStore } from "../store/useTransactions";
import { useAuthStore } from "../store/useAuthStore";

const incomeMenu = [
  { label: "Salary", value: "salary" },
  { label: "Bonus", value: "bonus" },
  { label: "Gift", value: "gift" },
  { label: "Additional Income", value: "additional_income" },
  { label: "Other", value: "other" },
];

const expensesMenu = [
  { label: "Food", value: "food" },
  { label: "Shopping", value: "shopping" },
  { label: "Travel", value: "travel" },
  { label: "Medical", value: "medical" },
  { label: "Party", value: "party" },
  { label: "Sport", value: "sport" },
  { label: "Other", value: "other_expense" },
];

const Dropdown = ({ items, value, onChangeValue, style }) => {
  const [open, setOpen] = useState(false);
  const selectedLabel =
    items.find((item) => item.value === value)?.label || "Select";

  return (
    <View style={[styles.dropdownContainer, style]}>
      <Pressable
        style={styles.dropdownButton}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={styles.dropdownButtonText}>{selectedLabel}</Text>
      </Pressable>
      {open && (
        <View style={styles.dropdownMenu}>
          {items.map((item) => (
            <Pressable
              key={item.value}
              style={styles.dropdownItem}
              onPress={() => {
                onChangeValue(item.value);
                setOpen(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export const AddTransactionsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const transaction = route.params?.transaction ?? null;
  const mode = route.params?.mode ?? "add";

  const { addTransaction, updateTransaction, deleteTransaction } =
    useTransactionStore();
  const user = useAuthStore((state) => state.user);

  const [type, setType] = useState(transaction?.type || "income");
  const [categoryOptions, setCategoryOptions] = useState(
    (transaction?.type || "income") === "income" ? incomeMenu : expensesMenu
  );
  const [category, setCategory] = useState(
    transaction?.category || incomeMenu[0].value
  );
  const [date, setDate] = useState(
    transaction?.date ? new Date(transaction.date) : new Date()
  );
  const [amount, setAmount] = useState(
    transaction ? String(Math.round(transaction.amount * 100)) : "0"
  );
  const [comment, setComment] = useState(transaction?.comment || "");

  useEffect(() => {
    const options = type === "income" ? incomeMenu : expensesMenu;
    setCategoryOptions(options);
    if (!transaction) setCategory(options[0].value);
  }, [type]);

  const handlePressNumber = (num) => {
    if (amount.length < 9) {
      const newAmount = amount + num;
      setAmount(newAmount.replace(/^0+/, "") || "0");
    }
  };

  const handleResetAmount = () => setAmount("0");

  const handleSave = async () => {
    if (!user?.uid) {
      Alert.alert("Error", "You must be logged in to save transactions");
      return;
    }

    const value = parseFloat((parseInt(amount, 10) / 100).toFixed(2));
    const newTransaction = {
      type,
      category,
      date: date.toISOString(),
      amount: value,
      comment,
    };

    try {
      if (mode === "edit" && transaction) {
        await updateTransaction(transaction.id, newTransaction);
      } else {
        const newId = await addTransaction(user.uid, newTransaction);
        console.log("Saved new transaction ID:", newId);
      }

      navigation.navigate("MainTab", { screen: "Home" });
    } catch (error) {
      Alert.alert("Error", "Failed to save transaction");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (transaction) {
      await deleteTransaction(transaction.id);
      navigation.navigate("MainTab", { screen: "Home" });
    }
  };

  const displayAmount = (parseInt(amount, 10) / 100).toFixed(2);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
        </Text>

        <View style={styles.dropdownRow}>
          <Dropdown
            items={[
              { label: "Income", value: "income" },
              { label: "Expenses", value: "expense" },
            ]}
            value={type}
            onChangeValue={setType}
            style={styles.typeDropdown}
          />
          <Dropdown
            items={categoryOptions}
            value={category}
            onChangeValue={setCategory}
            style={styles.categoryDropdown}
          />
        </View>

        <View style={styles.calendarWrapper}>
          <Calendar label="Date" value={date} onChange={setDate} />
        </View>

        <Text style={styles.amountText}>฿ {displayAmount}</Text>

        <View style={styles.numpad}>
          {[
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["✕", "0", "→"],
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.numRow}>
              {row.map((key) => (
                <Pressable
                  key={key}
                  style={[
                    styles.numButton,
                    key === "✕" && styles.resetButton,
                    key === "→" && styles.saveButton,
                  ]}
                  onPress={() => {
                    if (key === "✕") handleResetAmount();
                    else if (key === "→") handleSave();
                    else handlePressNumber(key);
                  }}
                >
                  <Text
                    style={[styles.numText, key === "→" && styles.saveArrowText]}
                  >
                    {key}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>

        <TextInput
          style={styles.commentInput}
          placeholder="Add comment..."
          value={comment}
          onChangeText={setComment}
          multiline
        />

        {mode === "edit" && (
          <Pressable style={styles.deleteFullButton} onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f9f9f9" }, // กันชิดขอบบน/รอยบาก
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  dropdownRow: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  typeDropdown: { flex: 0.4, backgroundColor: "#e6f3ff", borderRadius: 10 },
  categoryDropdown: { flex: 0.6, backgroundColor: "#e0f7f3", borderRadius: 10 },
  calendarWrapper: {
    width: "100%",
    backgroundColor: "#f0e6ff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  amountText: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  numpad: { marginBottom: 16 },
  numRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  numButton: {
    width: 90,
    height: 90,
    marginHorizontal: 10,
    borderRadius: 45,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  numText: { fontSize: 26, fontWeight: "bold", color: "#333" },
  resetButton: { backgroundColor: "#f9c0c0" },
  saveButton: { backgroundColor: "#000" },
  saveArrowText: { color: "#fff", fontSize: 26, fontWeight: "bold" },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    minHeight: 60,
    marginBottom: 20,
  },
  dropdownContainer: { position: "relative" },
  dropdownButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropdownButtonText: { fontSize: 16, color: "#333" },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 1000,
  },
  dropdownItem: { padding: 12 },
  dropdownItemText: { fontSize: 16, color: "#333" },
  deleteFullButton: {
    backgroundColor: "#f5e0a6",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  deleteText: { fontSize: 18, fontWeight: "bold", color: "#000" },
});
