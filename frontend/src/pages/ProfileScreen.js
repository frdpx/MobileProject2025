import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { mockUser } from "../mock/mockUser";
import { balanceData } from "../mock/balanceData"; // import balanceData
import { useNavigation } from "@react-navigation/native";
import Header from "../components/common/Header";

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState(mockUser.firstName);
  const [lastName, setLastName] = useState(mockUser.lastName);
  const [email, setEmail] = useState(mockUser.email || "");

  const handleSignOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "WelcomeScreen" }],
    });
  };

  return (
    <View style={styles.container}>
      <Header balance={balanceData.total} />

      <View style={styles.profileHeader}>
        <FontAwesome name="user-circle" size={64} color="black" />
        <Text style={styles.fullName}>{mockUser.fullName}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          value={mockUser.username}
          editable={false}
        />

        <Text>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={mockUser.dateOfBirth}
          editable={false}
        />
      </View>

      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <MaterialIcons name="logout" size={24} color="black" />
        <Text style={{ marginLeft: 10 }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  profileHeader: { alignItems: "center", marginVertical: 20 },
  fullName: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  inputGroup: { marginVertical: 20, paddingHorizontal: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
});
