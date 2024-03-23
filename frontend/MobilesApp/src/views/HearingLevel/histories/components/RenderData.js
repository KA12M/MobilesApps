import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { RenderEachData } from "./RenderEachData";
import { useStore } from "../../../../store/store";
import { theme } from "../../../../infrastructure/theme";
import { ShowLineChart } from "./ShowLineChart";
import { RenderResult } from "./RenderResult";

export const RenderData = ({ data, resultDoctor }) => {
  const { hearingResult } = useStore().hearingStore;

  const dataHearing0 = hearingResult.find((x) => x?.id === 0);
  const dataHearing1 = hearingResult.find((x) => x?.id === 1);

  const datahearingResult = [
    dataHearing0 === undefined ? {} : dataHearing0,
    dataHearing1 === undefined ? {} : dataHearing1,
  ];

  const dataFilter = data.filter((item) => item.ear !== undefined && item);

  // console.log("dataChart1", dataChart1);
  // console.log("dataChart2", dataChart2);
  console.log("data", data);
  // console.log(
  //   "dataMap",
  //   data.filter((item) => item.ear !== undefined && item)
  // );

  const red = theme.colors.text.redLight;
  const blue = theme.colors.text.primary;

  return (
    <View paddingTop={4}>
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            left: -85,
            zIndex: 1,
            top: 100,
          }}
        >
          <Text
            style={{
              transform: [{ rotate: "-90deg" }],
            }}
          >
            Hearing Level in Decibel (dB)
          </Text>
        </View>

        <View>
          <Text>Frequency in Hertz (Hz)</Text>
        </View>

        <View style={{ marginLeft: 40 }}>
          <ShowLineChart data={dataFilter} />
        </View>
      </View>

      {/* รายระเอียด */}
      <View>
        {/* {data.map((item, i) => { */}
        {/* const leftORright = item.ear === 0 ? true : false; */}

        {/* return ( */}

        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text style={[styles.title, { color: red }]}>{"หูซ้าย"}</Text>
        </View>

        {data[0].ear !== undefined ? (
          <>
            <RenderEachData data={data[0]} color={red} />
          </>
        ) : (
          <Text style={[styles.title, { color: red }]}>ไม่ได้ทำการทดสอบ</Text>
        )}

        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text style={[styles.title, { color: blue }]}>{"หูขวา"}</Text>
        </View>

        {data[1].ear !== undefined ? (
          <>
            <RenderEachData data={data[1]} color={blue} />
          </>
        ) : (
          <Text style={[styles.title, { color: blue }]}>ไม่ได้ทำการทดสอบ</Text>
        )}

        {/* ); */}
        {/* })} */}
      </View>

      <View
        style={{
          marginTop: 10,
          padding: 10,
        }}
      >
        <Text style={styles.textName}>ผลสรุป</Text>

        {data[0].ear !== undefined ? (
          <RenderResult
            title={"ซ้าย"}
            color={red}
            result={datahearingResult[0]}
            resultDoctor={resultDoctor[0]}
          />
        ) : (
          <Text style={[styles.title, { color: red }]}>
            หูซ้าย ไม่ได้ทำการทดสอบ
          </Text>
        )}

        {data[1].ear !== undefined ? (
          <RenderResult
            title={"ขวา"}
            color={blue}
            result={datahearingResult[1]}
            resultDoctor={resultDoctor[1]}
          />
        ) : (
          <Text style={[styles.title, { color: blue }]}>
            หูขวา ไม่ได้ทำการทดสอบ
          </Text>
        )}
      </View>
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
