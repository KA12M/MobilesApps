import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import Home from "../views/Home";
import DiabetesCalculate from "../views/diabetes/DiabetesCalculate";
import { theme } from "../infrastructure/theme";
import IconButtons from "../components/IconButtons";
import ResultDisplay from "../views/HearingLevel/ResultDisplay";
import LoginPage from "../views/login/LoginPage";
import HearingPage from "../views/HearingLevel/HearingPage";
import HearingMenu from "../views/HearingLevel/HearingMenu";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" screenOptions={{}}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="diabetes"
          component={DiabetesCalculate}
          options={({ navigation }) => ({
            title: "ประเมินระดับโรคเบาหวาน",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: theme.colors.bg.primary,
            },
            headerTitleStyle: {
              fontFamily: theme.fonts.primary,
              color: theme.colors.text.black,
            },
            headerLeft: (props) => (
              <IconButtons onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={theme.sizes[4]}
                  color={theme.colors.text.black}
                />
              </IconButtons>
            ),
            // headerRight: () => (
            //   <IconButtons onPress={() => navigation.goBack()}>
            //     <Feather
            //       name="more-vertical"
            //       size={24}
            //       color={theme.colors.text.light}
            //     />
            //   </IconButtons>
            // ),
            headerTintColor: theme.colors.text.light,
          })}
        />
        <Stack.Screen
          name="login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="hearing-level"
          component={HearingMenu}
          options={({ navigation }) => ({
            title: "ประเมินระดับการได้ยิน",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: theme.colors.bg.primary,
            },
            headerTitleStyle: {
              fontFamily: theme.fonts.primary,
            },
            headerLeft: (props) => (
              <IconButtons onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={theme.sizes[4]}
                  color={theme.colors.text.black}
                />
              </IconButtons>
            ),
            headerTintColor: theme.colors.text.black,
          })}
        />
        <Stack.Screen
          name="hearing-testing"
          component={HearingPage}
          options={({ navigation }) => ({
            title: "ทดสอบ",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: theme.colors.bg.primary,
            },
            headerTitleStyle: {
              fontFamily: theme.fonts.primary,
            },
            headerTintColor: theme.colors.text.black,
            headerLeft: () => <View></View>,
          })}
        />
        <Stack.Screen
          name="hearing-result"
          component={ResultDisplay}
          options={({ navigation }) => ({
            title: "ผลลัพธ์",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: theme.colors.bg.primary,
            },
            headerTitleStyle: {
              fontFamily: theme.fonts.primary,
            },
            headerLeft: (props) => (
              <IconButtons onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={theme.sizes[4]}
                  color={theme.colors.text.light}
                />
              </IconButtons>
            ),
            headerTintColor: theme.colors.text.black,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
