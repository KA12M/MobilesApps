import React, { useEffect, useState } from "react";
import { Button, ScrollView } from "native-base";
import { StyleSheet, Text, View } from "react-native";

import { SafeArea } from "./../../utils/SafeArea";
import { theme } from "../../infrastructure/theme";
import MyDialog from "../../components/MyDialog";
import { useStore } from "../../store/store";

const { sizes, colors, fonts, space } = theme;

const HearingMenu = ({ navigation }) => {
  const {
    hearingStore: { getFMHTByUserId },
    commonStore: { user },
  } = useStore();
  const [visible, setVisible] = useState(false);
  const [visibleDocs, setVisibleDocs] = useState(false);

  const setDialog = () => setVisible(!visible);
  const setDialogDocs = () => setVisibleDocs(!visibleDocs);

  const handleTest = () => {
    setDialog();
    navigation.navigate("hearing-testing");
  };

  const goToDocs = () => {
    setDialogDocs();
    navigation.navigate("assessment-docs");
  };

  //user?.id
  const handleDocs = async () => {
    const res = await getFMHTByUserId(user?.id);

    navigation.navigate("assessment-docs", { state: res ? res : null });
  };

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        <View style={styles.btnContainer}>
          <Btn label="ทดสอบ" onPress={setDialog} />
          <Btn
            label="ประวัติการทดสอบ"
            onPress={() => navigation.navigate("histories-testing")}
          />
          <Btn label="เอกสารการประเมิน" onPress={handleDocs} />
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
      <MyDialog
        title="แบบสอบถามการได้ยิน"
        content="คุณได้ทำการตอบแบบสอบถามนี้ไปแล้ว ต้องการส่งใหม่ไหม"
        open={visibleDocs}
        setDialog={setDialogDocs}
        onPress={goToDocs}
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
