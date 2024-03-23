import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../../infrastructure/theme";

export const ShowScores = ({ value, showTitle = false }) => {
  return (
    <View>
      {!showTitle && <Text style={styles.title}>ผลการประเมิน</Text>}

      <Text
        style={[
          styles.title,
          { padding: 10, borderRadius: 20, fontSize: 20, fontFamily: "none" },
        ]}
      >
        ท่านได้คะแนนรวม {value}/45
      </Text>
      <Text style={[styles.title, { fontFamily: "none" }]}>
        คิดเป็นร้อยละ {parseFloat(((value * 100) / 45).toFixed(3))}
      </Text>
      <Text
        style={[
          styles.title,
          {
            marginTop: 10,
            color:
              value < 10
                ? theme.colors.text.primary
                : theme.colors.text.redLight,
          },
        ]}
      >
        {value < 10 ? "มีผลการได้ยินปกติ" : "ควรไปพบแพทย์เพื่อตรวจการได้ยิน"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.black,
    marginBottom: 20,
  },
});
