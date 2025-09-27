import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Calendar from "../components/calendar/calendar";

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
  const selectedLabel = items.find((item) => item.value === value)?.label || "Select";

  return (
    <View style={[styles.dropdownContainer, style]}>
      <Pressable style={styles.dropdownButton} onPress={() => setOpen((prev) => !prev)}>
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

  const { setTransactions, transactions, transaction } = route.params;

  const [type, setType] = useState(transaction?.type || "income");
  const [categoryOptions, setCategoryOptions] = useState(type === "income" ? incomeMenu : expensesMenu);
  const [category, setCategory] = useState(transaction?.category || incomeMenu[0].value);
  const [date, setDate] = useState(transaction?.date ? new Date(transaction.date) : new Date());
  const [amount, setAmount] = useState(transaction ? String(Math.round(transaction.amount * 100)) : "0");
  const [comment, setComment] = useState(transaction?.comment || "");

  useEffect(() => {
    setCategoryOptions(type === "income" ? incomeMenu : expensesMenu);
    setCategory((type === "income" ? incomeMenu : expensesMenu)[0].value);
  }, [type]);

  const handlePressNumber = (num) => {
    if (amount.length < 9) {
      const newAmount = amount + num;
      setAmount(newAmount.replace(/^0+/, "") || "0");
    }
  };

  const handleResetAmount = () => setAmount("0");

  const handleSave = () => {
    const value = parseFloat((parseInt(amount, 10) / 100).toFixed(2));
    const newTransaction = {
      id: transaction?.id || Date.now().toString(),
      type,
      category,
      date,
      amount: value,
      comment
    };

    if (transaction) {
      // Edit
      setTransactions(transactions.map((t) => (t.id === transaction.id ? newTransaction : t)));
    } else {
      // Add
      setTransactions([newTransaction, ...transactions]);
    }

    navigation.goBack();
  };

  const displayAmount = (parseInt(amount, 10) / 100).toFixed(2);

  const handleDelete = () => {
  if (transaction) {
    setTransactions(transactions.filter((t) => t.id !== transaction.id));
  }
  navigation.goBack();
};

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hi, Welcome Back</Text>

      <View style={styles.dropdownRow}>
        <Dropdown
          items={[{ label: "Income", value: "income" }, { label: "Expenses", value: "expenses" }]}
          value={type}
          onChangeValue={setType}
          style={styles.typeDropdown}
        />
        <Dropdown items={categoryOptions} value={category} onChangeValue={setCategory} style={styles.categoryDropdown} />
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
                style={[styles.numButton, key === "✕" && styles.resetButton, key === "→" && styles.saveButton]}
                onPress={() => {
                  if (key === "✕") handleResetAmount();
                  else if (key === "→") handleSave();
                  else handlePressNumber(key);
                }}
              >
                <Text style={[styles.numText, key === "→" && styles.saveArrowText]}>{key}</Text>
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
        {transaction && (
      <Pressable style={styles.deleteFullButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  headerText: { fontSize: 16, color: "#888", marginBottom: 20 },
  dropdownRow: { flexDirection: "row", marginBottom: 16, justifyContent: "space-between" },
  typeDropdown: { flex: 0.4, backgroundColor: "#e6f3ff", borderRadius: 10 },
  categoryDropdown: { flex: 0.6, backgroundColor: "#e0f7f3", borderRadius: 10 },
  calendarWrapper: { width: "100%", backgroundColor: "#f0e6ff", borderRadius: 10, borderWidth: 1, borderColor: "#ccc", paddingHorizontal: 12, paddingVertical: 8, marginBottom: 20 },
  amountText: { fontSize: 48, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  numpad: { marginBottom: 16 },
  numRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 12 },
  numButton: { width: 90, height: 90, marginHorizontal: 10, borderRadius: 45, backgroundColor: "#eee", justifyContent: "center", alignItems: "center" },
  numText: { fontSize: 26, fontWeight: "bold", color: "#333" },
  resetButton: { backgroundColor: "#f9c0c0" },
  saveButton: { backgroundColor: "#000" },
  saveArrowText: { color: "#fff", fontSize: 26, fontWeight: "bold" },
  commentInput: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, backgroundColor: "#fff", minHeight: 60, marginBottom: 20 },
  dropdownContainer: { position: "relative" },
  dropdownButton: { padding: 12, borderRadius: 10, backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc" },
  dropdownButtonText: { fontSize: 16, color: "#333" },
  dropdownMenu: { position: "absolute", top: "100%", left: 0, right: 0, backgroundColor: "#fff", borderRadius: 10, marginTop: 4, borderWidth: 1, borderColor: "#ccc", zIndex: 1000 },
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
