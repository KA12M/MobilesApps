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
import { AntDesign, Entypo } from "@expo/vector-icons";

function HearingPage({ navigation }) {
  const {
    hearingStore: {
      ear,
      setEar,
      data,
      current,
      isTesting,
      newHearing,
      handleIsTesting,
      clearResults,
      goBack,
      setGoBack,
    },
    commonStore: { user },
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);

  const [visible, setVisible] = useState(false);

  // const [note, setNote] = useState("");

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

  // const handleProcess = () => {
  //   processResult(user.id);
  //   newHearing(user.id);
  // };

  // const left =
  //   data[ear] !== undefined && checkIsHeardNull("left") ? true : false;
  // const right =
  //   data[ear] !== undefined && checkIsHeardNull("right") ? true : false;

  const left = data.left[6].isHeard !== null;
  const right = data.right[6].isHeard !== null;

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {!isTesting && (
          <>
            <Text style={styles.title}>เลือกข้างที่จะทดสอบ</Text>

            <View
              style={[styles.btnLeftRight, { justifyContent: "space-between" }]}
            >
              <View
                style={{
                  width: "48%",
                }}
              >
                <Button
                  padding="10"
                  colorScheme={left ? "green" : "blue"}
                  disabled={left ? true : false}
                  onPress={() => handleTest("left")}
                >
                  {left ? (
                    <AntDesign name="checkcircle" size={50} color="white" />
                  ) : (
                    <Text style={[styles.textBtn, { color: "white" }]}>
                      หูซ้าย
                    </Text>
                  )}
                </Button>
              </View>

              <View
                style={{
                  width: "48%",
                }}
              >
                <Button
                  padding="10"
                  colorScheme={right ? "green" : "blue"}
                  disabled={right ? true : false}
                  onPress={() => handleTest("right")}
                >
                  {right ? (
                    <AntDesign name="checkcircle" size={50} color="white" />
                  ) : (
                    <Text style={[styles.textBtn, { color: "white" }]}>
                      หูขวา
                    </Text>
                  )}
                </Button>
              </View>
            </View>

            <View style={{ marginLeft: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                {left ? (
                  <AntDesign name="checkcircle" size={40} color="green" />
                ) : (
                  <Entypo name="circle" size={40} color="black" />
                )}
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                  }}
                >
                  หูข้าง ซ้าย{" "}
                  {left ? "ได้ทำการทดสอบแล้ว" : "ยังไม่ได้ทำการทดสอบ"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {right ? (
                  <AntDesign name="checkcircle" size={40} color="green" />
                ) : (
                  <Entypo name="circle" size={40} color="black" />
                )}
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                  }}
                >
                  หูข้าง ขวา{" "}
                  {right ? "ได้ทำการทดสอบแล้ว" : "ยังไม่ได้ทำการทดสอบ"}
                </Text>
              </View>
            </View>

            {(data.left[6].isHeard || data.right[6].isHeard) !== null && (
              <View style={styles.btnNext}>
                <Button
                  onPress={
                    data.left[6].isHeard && data.right[6].isHeard
                      ? () => navigation.goBack()
                      : setDialog
                  }
                  bgColor={theme.colors.bg.primary}
                >
                  <Text style={styles.textBtn}>กลับ</Text>
                </Button>
              </View>
            )}
          </>
        )}

        {isTesting && (
          <View>
            {/* <Text>{volumeCurrent()}</Text> */}

            <SoundDisplayPage data={data[ear][volumeCurrent() - 1]} />
            {/* <TestPage data={data[ear][volumeCurrent() - 1]} /> */}
          </View>
        )}

        {/* {!isTesting &&
          (data.left[6].isHeard !== null || data.right[6].isHeard !== null) && (
            <>
              <View style={{ margin: 15 }}>
                // อยู่นี่จ้าา ไม่ใช้ ลบด้วย
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
          )} */}

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
        onPress={() => navigation.goBack()}
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
  btnNext: {
    flex: 1,
    gap: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
  },
});

export default observer(HearingPage);
