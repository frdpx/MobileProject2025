import { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  InputAccessoryView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons"; 
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
  const selectedLabel = items.find((i) => i.value === value)?.label || "Select";
  return (
    <View style={[styles.dropdownContainer, style]}>
      <Pressable style={styles.dropdownButton} onPress={() => setOpen((p) => !p)}>
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
  const { width, height } = useWindowDimensions();

  const transaction = route.params?.transaction ?? null;
  const mode = route.params?.mode ?? "add";

  const { addTransaction, updateTransaction, deleteTransaction } =
    useTransactionStore();
  const user = useAuthStore((s) => s.user);

  const [type, setType] = useState(transaction?.type || "income");
  const [categoryOptions, setCategoryOptions] = useState(
    (transaction?.type || "income") === "income" ? incomeMenu : expensesMenu
  );
  const [category, setCategory] = useState(transaction?.category || incomeMenu[0].value);
  const [date, setDate] = useState(transaction?.date ? new Date(transaction.date) : new Date());
  const [amount, setAmount] = useState(transaction ? String(Math.round(transaction.amount * 100)) : "0");
  const [comment, setComment] = useState(transaction?.comment || "");

  const amountFont = Math.round(Math.min(width * 0.12, height * 0.06));

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const sh = Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
    const hi = Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));
    return () => {
      sh.remove();
      hi.remove();
    };
  }, []);

  useEffect(() => {
    const opts = type === "income" ? incomeMenu : expensesMenu;
    setCategoryOptions(opts);
    if (!transaction) setCategory(opts[0].value);
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
    const newTransaction = { type, category, date: date.toISOString(), amount: value, comment };

    try {
      if (mode === "edit" && transaction) {
        await updateTransaction(transaction.id, newTransaction);
      } else {
        await addTransaction(user.uid, newTransaction);
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
  const commentAccessoryId = "commentDoneAccessory";

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <Pressable style={styles.flex1} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
 
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={styles.backBtn}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <Ionicons name="chevron-back" size={26} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerText}>
                {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
              </Text>
              {/* spacer ให้ title อยู่กลางจริง ๆ */}
              <View style={{ width: 26 }} />
            </View>

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

            <Text
              style={[styles.amountText, { fontSize: amountFont }]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              ฿ {displayAmount}
            </Text>

            {!keyboardOpen && (
              <View style={styles.numpad}>
                {[
                  ["1", "2", "3"],
                  ["4", "5", "6"],
                  ["7", "8", "9"],
                  ["✕", "0", "→"],
                ].map((row, idx) => (
                  <View key={idx} style={styles.numRow}>
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
                        <Text style={[styles.numText, key === "→" && styles.saveArrowText]}>
                          {key}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                ))}
              </View>
            )}

            <TextInput
              style={styles.commentInput}
              placeholder="Add comment..."
              value={comment}
              onChangeText={setComment}
              multiline
              returnKeyType="done"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
              inputAccessoryViewID={Platform.OS === "ios" ? commentAccessoryId : undefined}
            />

            {Platform.OS === "ios" && (
              <InputAccessoryView nativeID={commentAccessoryId}>
                <View style={styles.accessoryBar}>
                  <Pressable onPress={Keyboard.dismiss} style={styles.doneBtn}>
                    <Text style={styles.doneText}>Done</Text>
                  </Pressable>
                </View>
              </InputAccessoryView>
            )}

            {Platform.OS === "android" && keyboardOpen && (
              <View style={styles.androidBar}>
                <TouchableOpacity onPress={Keyboard.dismiss} style={styles.androidCloseBtn}>
                  <Text style={styles.androidCloseText}>Close keyboard</Text>
                </TouchableOpacity>
              </View>
            )}
{/* 
            {mode === "edit" && (
              <Pressable style={styles.deleteFullButton} onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            )} */}
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const CIRCLE = 76;

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  safe: { flex: 1, backgroundColor: "#f9f9f9" },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#f9f9f9",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backBtn: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    flexShrink: 1,
  },

  dropdownRow: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    zIndex: 20,
    position: "relative",
    elevation: 20,
  },
  typeDropdown: { flex: 0.4, backgroundColor: "#e6f3ff", borderRadius: 10 },
  categoryDropdown: { flex: 0.6, backgroundColor: "#e0f7f3", borderRadius: 10 },

  calendarWrapper: {
    width: "100%",
    paddingVertical: 10,
    marginBottom: 35,
    zIndex: 10,
    elevation: 10,
  },

  amountText: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  numpad: {
    flexShrink: 0,
    marginBottom: 20,
    gap: 10,
  },
  numRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  numButton: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  numText: { fontSize: 22, fontWeight: "bold", color: "#333" },
  resetButton: { backgroundColor: "#f9c0c0" },
  saveButton: { backgroundColor: "#000" },
  saveArrowText: { color: "#fff", fontSize: 22, fontWeight: "bold" },

  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    minHeight: 50,
    marginTop: 4,
  },

  accessoryBar: {
    backgroundColor: "#f2f2f2",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    alignItems: "flex-end",
    paddingRight: 8,
  },
  doneBtn: { paddingVertical: 10, paddingHorizontal: 16 },
  doneText: { color: "#007aff", fontWeight: "600", fontSize: 16 },

  androidBar: {
    alignItems: "flex-end",
    paddingTop: 6,
  },
  androidCloseBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  androidCloseText: { color: "#fff", fontWeight: "600" },

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
    height: 46,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  deleteText: { fontSize: 18, fontWeight: "bold", color: "#000" },
});
