import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Route from "./src/routes/route.js";
import { observer } from "mobx-react-lite";
import { theme } from "./src/infrastructure/theme/index.js";

import { PaperProvider } from "react-native-paper";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App() {
  const [fontsLoaded] = useFonts({
    "Kanit-Medium": require("./assets/fonts/Kanit-Medium.ttf"),
  });

  const colorModeManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        console.log(e);
        return "light";
      }
    },
    set: async (value) => {
      try {
        await AsyncStorage.setItem("@color-mode", value);
      } catch (e) {
        console.log(e);
      }
    },
  };

  const themeBase = extendTheme({
    colors: { primary: theme.colors.bg.primary },
  });

  if (!fontsLoaded) return null;

  return (
    <NativeBaseProvider colorModeManager={colorModeManager}>
      <PaperProvider>
        <Route />
      </PaperProvider>
    </NativeBaseProvider>
  );
}

export default observer(App);
