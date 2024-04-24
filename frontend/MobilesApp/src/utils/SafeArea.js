import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "../infrastructure/theme";

export const SafeArea = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        //  paddingTop: insets.top
      }}
    >
      <StatusBar style="light" />

      {children}
    </SafeAreaProvider>
  );
};
