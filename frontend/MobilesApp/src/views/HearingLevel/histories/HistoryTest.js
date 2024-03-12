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
          <Text style={styles.titleVolume}>ระดับความผิดปกติของการได้ยิน</Text>

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

const RenderItem = ({ item }) => {
  const {
    hearingResult,
    processHearingLevels,
    resultDoctor,
    processResultDoctor,
  } = useStore().hearingStore;

  const [showMode, setShowMode] = useState(false);

  const { items } = item;

  const setMode = () => {
    processHearingLevels(items);
    setShowMode(!showMode);
    processResultDoctor(items);
  };

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
        <Text style={{ fontSize: 15 }}>หมายเหตุ : {item?.note}</Text>
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

          {item?.items[0].v250 === 0 ? (
            <Text style={styles.textName}>ไม่ได้ทำการทดสอบ</Text>
          ) : (
            <Text style={styles.textName}>{item?.items[0].result}</Text>
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
          {item?.items[1].v250 === 0 ? (
            <Text style={styles.textName}>ไม่ได้ทำการทดสอบ</Text>
          ) : (
            <Text style={styles.textName}>{item?.items[1].result}</Text>
          )}
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Button width="90%" bgColor={theme.colors.bg.primary} onPress={setMode}>
          {showMode ? "กลับ" : "ดูผล"}
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
            <RenderData
              data={item?.items[0]}
              title={"หูซ้าย"}
              result={hearingResult[0]}
              resultDoctor={resultDoctor[0]}
            />
          </View>

          <View
            style={{
              marginTop: 15,
              borderTopWidth: 1,
              borderTopColor: "gray",
            }}
          />
          <View>
            <RenderData
              data={item?.items[1]}
              title={"หูขวา"}
              result={hearingResult[1]}
              resultDoctor={resultDoctor[1]}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const RenderData = ({ data, title, result, resultDoctor }) => {
  console.log("data", data);

  const dataChart = Object.entries(data)
    .map(([key, value]) => {
      if (key.startsWith("v")) {
        return value;
      } else {
        return undefined; // ให้ return undefined เมื่อไม่ใช่ key ที่เริ่มต้นด้วย "v"
      }
    })
    .filter((value) => value !== undefined); // กรองค่าที่เป็น undefined ออกจาก array

  return (
    <View paddingTop={4}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: title === "หูซ้าย" ? "" : "flex-end",
        }}
      >
        <Text style={styles.textName}>{title} หน่วยเป็น Decibel (dB)</Text>
      </View>
      <View
        style={title === "หูซ้าย" ? { marginLeft: 30 } : { marginRight: 30 }}
      >
        {Object.entries(data).map(([key, value]) => {
          if (key.startsWith("v")) {
            const prefix = key.replace("v", "") + "Hz";
            return (
              <Center
                w="100%"
                maxW="400"
                key={key}
                style={{
                  flexDirection: "row",
                  justifyContent: title === "หูซ้าย" ? "" : "flex-end",
                }}
                marginTop={2}
              >
                <Text>
                  {prefix} : {value}
                </Text>
              </Center>
            );
          }
          return null;
        })}
      </View>

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
          <LineChart
            data={{
              labels: ["250", "500", "1000", "2000", "4000", "6000", "8000"],
              datasets: [
                {
                  data: dataChart,
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            // yAxisLabel="10"
            // yAxisSuffix="k"
            yAxisInterval={5} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#FFFFFF", // White background color
              backgroundGradientFrom: "#FFFFFF", // White background gradient from
              backgroundGradientTo: "#FFFFFF", // White background gradient to
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for lines
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for labels
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#000000", // Black color for dots
              },
            }}
            bezier={false}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text style={styles.textName}>ผลสรุป</Text>
        <Text>
          หูข้าง {title.replace("หู", "")} ของท่านมีระดับการได้ยิน {result}
        </Text>
      </View>

      {resultDoctor > 25 && (
        <View>
          <Text>
            หูข้าง {title.replace("หู", "")} มีความดังมากกว่า 25 dB
            ท่านควรไปพบแพทย์
          </Text>
        </View>
      )}
    </View>
  );
};

export default observer(HistoryTest);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 8, marginBottom: 20 },
  titleVolume: {
    textAlign: "center",
    fontSize: theme.fontSizes.h5,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.black,
    marginTop: 30,
  },
  titleCard: {},
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
