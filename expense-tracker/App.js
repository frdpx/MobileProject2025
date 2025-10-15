import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { useAuthStore } from "./src/store/useAuthStore";
import { useEffect } from "react";

export default function App() {
  const { init, loading } = useAuthStore();
  useEffect(() => {
    const unsub = init();
    return () => unsub && unsub();
  }, []);

  return <RootNavigator />;
}
