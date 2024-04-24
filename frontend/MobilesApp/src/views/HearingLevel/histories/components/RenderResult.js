import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../../../../infrastructure/theme";

export const RenderResult = ({ title, color, result, resultDoctor }) => {
  return (
    <View>
      <View>
        <Text style={[styles.textDescription, { color: color }]}>
          1) หูข้าง {title} มีระดับการได้ยิน
        </Text>
        <Text style={[styles.textDescription, { color: color }]}>
          {" "}
          {"   "} {result?.name}
        </Text>

        {resultDoctor > 25 && (
          <View>
            <Text style={[styles.textDescription, { color: color }]}>
              2) หูข้าง {title} มีความดังมากกว่า 25 dB
            </Text>
            <Text style={[styles.textDescription, { color: color }]}>
              {" "}
              {"   "} ท่านควรไปพบแพทย์
            </Text>
          </View>
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
