import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import { theme } from "../../../../infrastructure/theme";
import moment from "moment";
import { ShowScores } from "./ShowScores";

const RenderItemDoc = ({ item }) => {
  const result = JSON.parse(item?.result)
    .map((item) => item.value)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  console.log("result", result);

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
          ประเมินเมื่อ {moment(item.createdAt).add(543, "year").format("LL")}
        </Text>
      </View>

      <View
        style={{
          padding: 15,
        }}
      >
        <ShowScores value={result} showTitle={true} />
        {/* <Text style={styles.textName}>มีผลการประเมินอยู่ที่ {result}</Text> */}
      </View>
    </View>
  );
};

export default observer(RenderItemDoc);

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
