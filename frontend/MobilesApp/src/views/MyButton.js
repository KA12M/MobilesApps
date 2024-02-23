import { StyleSheet } from "react-native";
import React from "react";
import { Button, Icon } from "native-base";
import MyText from "../components/MyText";
import { theme } from "../infrastructure/theme";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function MyButton({
  label,
  onPress,
  iconName,
  iconTemp = "Entypo",
}) {
  iconTemplate = iconTemp.includes("Entypo") ? Entypo : MaterialIcons;

  return (
    <Button
      style={styles.btn}
      onPress={onPress}
      leftIcon={
        <Icon
          as={iconTemplate}
          name={iconName}
          size="xl"
          color={theme.colors.text.black}
        />
      }
    >
      <MyText
        label={label}
        fontSize={theme.sizes[2]}
        color={theme.colors.text.black}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "90%",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderRadius: theme.space[4],
    borderColor: theme.colors.bg.black,
    padding: theme.space[2],
    borderWidth: theme.space[0],
  },
});
