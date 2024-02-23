import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AlertDialog, ScrollView, Button } from "native-base";
import { observer } from "mobx-react-lite";

import { useStore } from "../../store/store";
import { SafeArea } from "../../utils/SafeArea";
import { theme } from "../../infrastructure/theme";
import SoundDisplayPage from "./SoundDisplayPage";

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
    },
    commonStore: { user },
  } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => clearResults(), []);

  const volumeCurrent = () =>
    current > data[ear].length ? data[ear].length : current;

  const checkIsHeardNull = (ear) =>
    data[ear].some((item) => item.isHeard != null);

  const handleTest = (ear) => {
    setEar(ear);
    if (checkIsHeardNull(ear)) return setIsOpen(true);
    else handleIsTesting();
  };

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        {!isTesting && (
          <View style={styles.btnLeftRight}>
            <Button
              padding="10"
              colorScheme="blue"
              onPress={() => handleTest("left")}
            >
              <Text style={styles.textBtn}>หูซ้าย</Text>
            </Button>
            <Button
              padding="10"
              colorScheme="blue"
              onPress={() => handleTest("right")}
            >
              <Text style={styles.textBtn}>หูขวา</Text>
            </Button>
          </View>
        )}

        {isTesting && (
          <View>
            <Text>{volumeCurrent()}</Text>

            <SoundDisplayPage data={data[ear][volumeCurrent() - 1]} />
          </View>
        )}

        <Button
          colorScheme="blue"
          onPress={() => {
            processResult();
            newHearing(user.id);
          }}
        >
          <Text>บันทึก test</Text>
        </Button>

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
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    marginHorizontal: theme.sizes[1],
    backgroundColor: theme.colors.bg.light,
  },
  btnLeftRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: theme.sizes[1],
    marginVertical: theme.sizes[5], 
  },
  textBtn: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes.h4,
  },
});

export default observer(HearingPage);
