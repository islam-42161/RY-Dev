import 'react-native-gesture-handler'
import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppRoot from "./src/AppRoot";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const customColors = {
  //primary
  primary: "#006d39",
  onPrimary: "#ffffff",
  primaryContainer: "#9af6b4",
  onPrimaryContainer: "#9af6b4",

  // secondary
  secondary: "#006d42",
  onSecondary: "#ffffff",
  secondaryContainer: "#93f7bb",
  onSecondaryContainer: "#002111",

  //tertiary
  tertiary: "#3a646f",
  onTertiary: "#ffffff",
  tertiaryContainer: "#beeaf6",
  onTertiaryContainer: "#001f26",

  //error
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#410002",

  //background
  background: "#fbfdf7",
  onBackground: "#191c19",
  surface: "#fbfdf7",
  onSurface: "#191c19",

  outline: "#717971",
  surfaceVariant: "#dde5db",
  onSurfaceVariant: "#414941",
};

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // primary: customColors.primary,
      // accent: customColors.secondary,
      // background: customColors.background,
      // text: customColors.textPrimary,
      // error: customColors.error,
      // success: customColors.success,
      // warning: customColors.warning,
      // info: customColors.info,
      ...customColors,
    },
  };
  return (
    <PaperProvider theme={theme}>
      <AppRoot />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
