import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Dropdown = ({
  options,
  selectedValue,
  onChange,
  placeHolder,
  width,
  maxHeight,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.value === selectedValue);
  return (
    <View style={[styles.root, { width }]}>
      <Pressable
        disabled={false}
        onPress={() => {
          setOpen((open) => !open);
        }}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>
          {selected ? selected.label : placeHolder}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#a9799dff"
        />
      </Pressable>

      {open && (
        <View style={[styles.menu, { maxHeight }]}>
          <ScrollView bounces={false}>
            {options.map((opt, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                ]}
              >
                <Text style={styles.itemText}>{opt.label}</Text>
                {selectedValue === opt.value && (
                  <Ionicons name="checkmark" size={16} color="#a9799dff" />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export default Dropdown;

const styles = StyleSheet.create({
  root: {
    position: "relative",
    zIndex: 100,
  },
  button: {
    backgroundColor: "#e8e8e8ff",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    fontSize: 16,
    color: "#494949ff",
    flexShrink: 1,
  },
  menu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 200,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemPressed: {
    backgroundColor: "#F4F3F9",
  },
  itemText: {
    fontSize: 16,
    color: "#2b2b2bff",
  },
});
