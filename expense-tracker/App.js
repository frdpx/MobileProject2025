import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RootNavigator } from "./src/navigation/RootNavigator";
import {
  registerTranslation,
  en,
  th,
} from "react-native-paper-dates";

registerTranslation("en", en);
registerTranslation("th", th);

export default function App() {
  <StatusBar style="auto" />
  return <RootNavigator />;
}
