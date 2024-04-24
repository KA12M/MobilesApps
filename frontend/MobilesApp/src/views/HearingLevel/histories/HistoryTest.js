import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { theme } from "../../../infrastructure/theme";
import moment from "moment";
import { Button, Center, ScrollView } from "native-base";
import { SafeArea } from "../../../utils/SafeArea";
import { LineChart } from "react-native-chart-kit";
import MyLoading from "../../../components/MyLoading";
import { RenderItem } from "./components/RenderItem";

const HistoryTest = () => {
  const {
    commonStore: { user },
    hearingStore: { loading, hearingByUser, getHearingByUserId },
  } = useStore();

  useEffect(() => {
    getHearingByUserId(user?.id);
  }, []);

  return (
    <SafeArea>
      {hearingByUser.length ? (
        <ScrollView style={styles.container}>
          {/* <View> */}
          {/* <Text style={styles.titleVolume}>ระดับความผิดปกติของการได้ยิน</Text> */}

          <View>
            {hearingByUser.map((item, i) => (
              <RenderItem key={i} item={item} />
            ))}
          </View>
          {/* </View> */}
        </ScrollView>
      ) : (
        <MyLoading loading={loading} />
      )}
    </SafeArea>
  );
};

export default observer(HistoryTest);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8 },
  titleVolume: {
    textAlign: "center",
    fontSize: theme.fontSizes.h5,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.black,
    marginTop: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.black,
    marginBottom: 20,
  },
  progressStyle: { marginVertical: 20, alignItems: "center" },
  btnProcess: { gap: 10, marginVertical: 20 },
  btnNext: {
    flex: 1,
    gap: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    color: theme.colors.text.light,
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes.h4,
  },
  textName: {
    fontSize: 20,
    marginBottom: 10,
  },
  textDescription: {
    fontSize: 18,
  },
});

{
  /* {prefix.map((item, i) => (
  <Center
    w="100%"
    maxW="400"
    key={i}
    style={{
      flexDirection: "row",
      justifyContent: title === "หูซ้าย" ? "" : "flex-end",
    }}
    marginTop={2}
  >
    <Text>
      {item} : {data[itemKey[i]]}
    </Text>
  </Center>
))} */
}
