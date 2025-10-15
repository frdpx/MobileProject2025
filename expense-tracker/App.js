import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { useAuthStore } from "./src/store/useAuthStore";
import { useEffect } from "react";
import {
  registerTranslation,
  en,
  th,
} from "react-native-paper-dates";

registerTranslation("en", en);
registerTranslation("th", th);

export default function App() {
  const { init, loading } = useAuthStore();
  useEffect(() => {
    const unsub = init();
    return () => unsub && unsub();
  }, []);
 <StatusBar style="auto" />
  return <RootNavigator />;
}
