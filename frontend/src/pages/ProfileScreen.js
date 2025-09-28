import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import Header from "../components/common/Header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { mockUser } from "../mock/mockUser";
import { balanceData } from "../mock/balanceData";
import { useAuthStore } from "../store/useAuthStore";

export const ProfileScreen = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);

  // const [firstName, setFirstName] = useState(user?.firstName || "");
  // const [lastName, setLastName] = useState(user?.lastName || "");
  // const [userName, setUserName] = useState(user?.userName || "");
  // const [email, setEmail] = useState(user?.email || "");
  // const [dateOfBirth, setDateofBirth] = useState(user?.dateOfBirth || "");

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState("");
  const [tempValue, setTempValue] = useState("");

  const openEditModal = (field, value) => {
    setEditingField(field);
    setTempValue(value);
    setModalVisible(true);
  };

  const saveEdit = () => {
    // if (editingField === "firstName") setFirstName(tempValue);
    // if (editingField === "lastName") setLastName(tempValue);
    // if (editingField === "email") setEmail(tempValue);
    updateUser({ [editingField]: tempValue });
    setModalVisible(false);
  };

  const handleSignOut = () => {
    // setIsLoggedIn(false);
    logout();
  };

  return (
    <View style={styles.container}>
      <Header balance={balanceData.total} />

      <View style={styles.profileHeader}>
        <FontAwesome name="user-circle" size={64} color="black" />
        <Text style={styles.fullName}>
          {user?.firstName} {user?.lastName}
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={user?.userName}
          editable={false}
        />

        <Text style={styles.label}>First Name</Text>
        <Pressable onPress={() => openEditModal("firstName", user?.firstName)}>
          <Text style={styles.input}>{user?.firstName}</Text>
        </Pressable>

        <Text style={styles.label}>Last Name</Text>
        <Pressable onPress={() => openEditModal("lastName", user?.lastName)}>
          <Text style={styles.input}>{user?.lastName}</Text>
        </Pressable>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={user?.email}
          editable={false}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={user?.dateOfBirth}
          editable={false}
        />
      </View>

      <Pressable style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>

      {/* Modal Popup */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit {editingField}</Text>
            <TextInput
              style={styles.modalInput}
              value={tempValue}
              onChangeText={setTempValue}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, styles.modalSaveBtn]}
                onPress={saveEdit}
              >
                <Text style={{ color: "#fff" }}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  profileHeader: { alignItems: "center", marginVertical: 20 },
  fullName: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  inputGroup: { marginVertical: 20, paddingHorizontal: 20 },
  label: { marginBottom: 5, fontWeight: "600" },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  disabledInput: {
    color: "#555",
    backgroundColor: "#f2f2f2",
  },
  signOutBtn: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signOutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end" },
  modalBtn: { marginLeft: 15, paddingVertical: 8, paddingHorizontal: 15 },
  modalSaveBtn: { backgroundColor: "#000", borderRadius: 10 },
});
