import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Center, ScrollView } from "native-base";
import { RenderData } from "./RenderData";
import { useStore } from "../../../../store/store";
import { theme } from "../../../../infrastructure/theme";

export const RenderItem = ({ item }) => {
  const { processHearingLevels, resultDoctor, processResultDoctor } =
    useStore().hearingStore;

  const [showMode, setShowMode] = useState(false);

  const { items } = item;

  const setMode = () => {
    processHearingLevels(items);
    setShowMode(!showMode);
    processResultDoctor(items);
  };

  console.log("item", item);

  const data0 = items.find((x) => x.ear === 0);
  const data1 = items.find((x) => x.ear === 1);

  const data = [
    data0 === undefined ? {} : data0,
    data1 === undefined ? {} : data1,
  ];

  return (
    <View
      style={{
        borderRadius: 15,
        marginBottom: 5,
        backgroundColor: theme.colors.bg.light,
        paddingBottom: 20,
        marginTop: 20,
      }}
    >
      <View
        style={{
          padding: 15,
        }}
      >
        <Text style={styles.textName}>
          ทดสอบเมื่อ {moment(item.createdAt).add(543, "year").format("LL")}
        </Text>
        {/* <Text style={{ fontSize: 15 }}>หมายเหตุ : {item?.note}</Text> */}
      </View>

      <View
        style={{
          // flexDirection: "row",
          // justifyContent: "space-around",
          alignItems: "center",
          // textAlign: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              {
                marginBottom: 10,
                fontSize: 20,
              },
              styles.textName,
            ]}
          >
            หูซ้าย
          </Text>

          {data[0].result === undefined ? (
            <Text style={styles.textName}>ไม่ได้ทำการทดสอบ</Text>
          ) : (
            <Text style={styles.textName}>{data[0].result}</Text>
          )}
        </View>

        <View
          style={{
            width: "80%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              {
                marginBottom: 10,
                fontSize: 20,
              },
              styles.textName,
            ]}
          >
            หูขวา
          </Text>
          {data[1].result === undefined ? (
            <Text style={styles.textName}>ไม่ได้ทำการทดสอบ</Text>
          ) : (
            <Text style={styles.textName}>{data[1].result}</Text>
          )}
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Button width="90%" bgColor={theme.colors.bg.primary} onPress={setMode}>
          {showMode ? "กลับ" : "ดูเพิ่มเติม"}
        </Button>
      </View>

      {/* //------------------------------------------------------------------------------// */}

      {showMode && (
        <View
          style={{
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              marginTop: 15,
              borderTopWidth: 1,
              borderTopColor: "gray",
            }}
          />
          <View>
            <RenderData data={data} resultDoctor={resultDoctor} />
          </View>
        </View>
      )}
    </View>
  );
};

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
