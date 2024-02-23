import React from "react";
import { Button, ScrollView } from "native-base";
import { StyleSheet, Text, View } from "react-native";

import { SafeArea } from "./../../utils/SafeArea";
import { theme } from "../../infrastructure/theme";

const { sizes, colors, fonts, space } = theme;

const HearingMenu = ({ navigation }) => {
  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        <View style={styles.btnContainer}>
          <Btn
            label="ทดสอบ"
            onPress={() => navigation.navigate("hearing-testing")}
          />
          <Btn label="ประวัติการทดสอบ" />
          <Btn label="เอกสารการประเมิน" />
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default HearingMenu;

const Btn = ({ label, onPress = () => {} }) => {
  return (
    <Button
      style={{backgroundColor: colors.bg.primary}}
      borderColor="blue"
      borderWidth={space[0]}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{label}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    marginHorizontal: sizes[1],
    backgroundColor: colors.bg.light,
  },
  btnContainer: {
    paddingVertical: sizes[3],
    paddingHorizontal: sizes[1],
    gap: sizes[2],
  },
  btnText: {
    fontFamily: fonts.primary,
    color: colors.text.black,
    fontSize: sizes[4],
  },
});
