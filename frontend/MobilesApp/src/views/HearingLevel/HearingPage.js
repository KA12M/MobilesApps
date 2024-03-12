import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { AlertDialog, ScrollView, Button } from "native-base";
import { observer } from "mobx-react-lite";

import { useStore } from "../../store/store";
import { SafeArea } from "../../utils/SafeArea";
import { theme } from "../../infrastructure/theme";
import SoundDisplayPage from "./SoundDisplayPage";
import TestPage from "../../test/Test.page";
import MyDialog from "../../components/MyDialog";
import { SafeAreaView } from "react-native-safe-area-context";

function HearingPage({ navigation }) {
  const {
    hearingStore: {
      ear,
      setEar,
      data,
      current,
      isTesting,
      newHearing,
      processResult,
      handleIsTesting,
      clearResults,
      goBack,
      setGoBack,
    },
    commonStore: { user },
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);

  const [visible, setVisible] = useState(false);

  const [note, setNote] = useState("");

  const setDialog = () => setVisible(!visible);

  useEffect(() => clearResults(), []);

  const volumeCurrent = () =>
    current > data[ear].length ? data[ear].length : current;

  const checkIsHeardNull = (ear) =>
    data[ear].some((item) => item.isHeard != null);

  const handleTest = (ear) => {
    setGoBack(false);
    setEar(ear);
    if (checkIsHeardNull(ear)) return setIsOpen(true);
    else handleIsTesting();
  };

  const handleProcess = () => {
    processResult(user.id, navigation, note);
    newHearing(user.id);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {!isTesting && (
          <>
            <Text style={styles.title}>เลือกข้างที่จะทดสอบ</Text>
            <View style={styles.btnLeftRight}>
              <Button
                padding="10"
                colorScheme={data.left[6].isHeard !== null ? "green" : "blue"}
                onPress={() => handleTest("left")}
              >
                <Text style={[styles.textBtn, { color: "white" }]}>หูซ้าย</Text>
              </Button>
              <Button
                padding="10"
                colorScheme={data.right[6].isHeard !== null ? "green" : "blue"}
                onPress={() => handleTest("right")}
              >
                <Text style={[styles.textBtn, { color: "white" }]}>หูขวา</Text>
              </Button>
            </View>
          </>
        )}

        {isTesting && (
          <View>
            {/* <Text>{volumeCurrent()}</Text> */}

            <SoundDisplayPage data={data[ear][volumeCurrent() - 1]} />
            {/* <TestPage data={data[ear][volumeCurrent() - 1]} /> */}
          </View>
        )}

        {!isTesting &&
          (data.left[6].isHeard !== null || data.right[6].isHeard !== null) && (
            <>
              <View style={{ margin: 15 }}>
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={setNote}
                    value={note}
                  />
                </View>

                <View style={{ marginTop: 30 }}>
                  <Button colorScheme="lightBlue" onPress={setDialog}>
                    <Text style={{ color: "white", fontSize: 20 }}>บันทึก</Text>
                  </Button>
                </View>
              </View>
            </>
          )}

        <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>ทดสอบอีกครั้ง</AlertDialog.Header>
            <AlertDialog.Body>
              คุณได้ทดสอบหูข้างนี้ไปแล้ว ต้องการทดสอบใหม่อีกครั้งหรือไม่
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => {
                    setIsOpen(false);
                    setEar("");
                  }}
                >
                  ไม่
                </Button>
                <Button
                  colorScheme="blue"
                  onPress={() => {
                    handleIsTesting();
                    setIsOpen(false);
                  }}
                >
                  ใช่
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </ScrollView>
      <MyDialog
        title="บันทึก"
        content="บันทึก"
        open={visible}
        setDialog={setDialog}
        onPress={handleProcess}
        tips={
          data.left[6].isHeard === null
            ? "ข้างซ้ายยังไม่ได้ทดสอบ จะบันทึกเลยไหม"
            : data.right[6].isHeard === null
            ? "ข้างขวายังไม่ได้ทดสอบ จะบันทึกเลยไหม"
            : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    marginHorizontal: theme.sizes[1],
    backgroundColor: theme.colors.bg.light,
  },
  title: {
    textAlign: "center",
    fontSize: theme.fontSizes.h4,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.black,
    marginTop: 20,
  },
  btnLeftRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: theme.sizes[1],
    marginVertical: theme.sizes[2],
  },
  textBtn: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes.h4,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
  },
});

export default observer(HearingPage);
