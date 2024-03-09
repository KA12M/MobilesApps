import React, { useState } from "react";
import { Button, ScrollView } from "native-base";
import { StyleSheet, Text, View } from "react-native";

import { SafeArea } from "./../../utils/SafeArea";
import { theme } from "../../infrastructure/theme";
import MyDialog from "../../components/MyDialog";

const { sizes, colors, fonts, space } = theme;

const HearingMenu = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const setDialog = () => setVisible(!visible);

  const handleTest = () => {
    setDialog();
    navigation.navigate("hearing-testing");
  };

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        <View style={styles.btnContainer}>
          <Btn
            label="ทดสอบ"
            onPress={setDialog}
            // onPress={() => navigation.navigate("test")}
          />
          <Btn label="ประวัติการทดสอบ" />
          <Btn label="เอกสารการประเมิน" />
        </View>
      </ScrollView>
      <MyDialog
        title="ทดสอบการได้ยิน"
        content="ทดสอบ"
        open={visible}
        setDialog={setDialog}
        onPress={handleTest}
        tips="ถ้ายืนยันจะไม่สามารถย้อนกลับได้จนกว่าจะจบ"
      />
    </SafeArea>
  );
};

export default HearingMenu;

const Btn = ({ label, onPress = () => {} }) => {
  return (
    <Button
      style={{ backgroundColor: colors.bg.primary }}
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
    color: colors.text.light,
    fontSize: sizes[4],
  },
});
