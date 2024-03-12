import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { SafeArea } from "../../../utils/SafeArea";
import { RadioButton } from "react-native-paper";
import { questions } from "../../../mocks/hearingSoundList";
import { theme } from "../../../infrastructure/theme";
import { useStore } from "./../../../store/store";
import { HttpStatusCode } from "axios";
import MyDialog from "../../../components/MyDialog";

const AssessmentDocs = observer(({ route, navigation }) => {
  const { state } = route.params;

  const {
    hearingStore: { createFMHTByUserId },
    commonStore: { user },
  } = useStore();

  const result = state ? JSON.parse(state.result) : [];

  const [scores, setScores] = useState(result);
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(state ? true : false);
  const [disableB, setDisableB] = useState(state ? false : true);

  const setDialog = () => setVisible(!visible);

  const handleAnswer = (questionId, score) => {
    setScores((prevScores) => {
      const existingIndex = prevScores.findIndex(
        (item) => item.id === questionId
      );
      if (existingIndex !== -1) {
        const newScores = [...prevScores];
        newScores[existingIndex].value = score;
        return newScores;
      } else {
        return [...prevScores, { id: questionId, value: score }];
      }
    });
  };

  const handleSave = async () => {
    const data = {
      result: JSON.stringify(
        scores
          .sort((a, b) => a.id - b.id) // เรียงตาม id
          .map((score) => score)
      ),
      userId: user?.id,
    };

    var res = await createFMHTByUserId(data);

    if (res.statusCode === HttpStatusCode.Ok) {
      setDialog();
      navigation.navigate("hearing-level");
    }
  };

  console.log("scores", scores);

  const ShowScores = () => {
    const value = scores
      .sort((a, b) => a.id - b.id) // เรียงตาม id
      .map((item) => item.value)
      .reduce((total, currentValue) => total + currentValue, 0);

    return (
      <View>
        <Text style={styles.title}>ผลการประเมิน</Text>
        <Text
          style={[
            styles.title,
            { backgroundColor: "yellow", padding: 10, borderRadius: 20 },
          ]}
        >
          การประเมินผลการคัดกรองท่านได้คะแนน {value} คะแนน
          {value < 10
            ? "ท่านมีการได้ยินปกติ"
            : "ท่านควรไปพบแพทย์เพื่อตรวจการการได้ยิน"}
        </Text>
      </View>
    );
  };

  return (
    <SafeArea>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>
              แบบสอบถามการได้ยินห้านาทีฉบับภาษาไทย
            </Text>

            <Text style={styles.name}>
              3 คือ ประสบประหาเหล่านี้หรือมีประสบการณ์ดังกล่าวเป็นประจำ
            </Text>
            <Text style={styles.name}>
              2 คือ ประสบประหาเหล่านี้หรือมีประสบการณ์ดังกล่าวบ่อยพอ ๆ
              กันกับช่วงเวลาที่ไม่เป็น
            </Text>
            <Text style={styles.name}>
              1 คือ เคยประสบปัญหาเหล่านี้หรือมีประสบการณ์ดังกล่าวบ้างแต่นาน ๆ
              ครั้ง
            </Text>
            <Text style={styles.name}>
              0 คือ ไม่เคยประสบปัญหาเหล่านี้
              หรือไม่มีประสบการณ์ดังกล่าวเกิดขึ้นเลย
            </Text>
          </View>

          <View style={styles.container}>
            {questions.map((question) => (
              <View key={question.id} style={styles.questionContainer}>
                <View>
                  <Text style={styles.questionText}>
                    {question.id}. {question.text}
                  </Text>
                  <RadioButton.Group
                    onValueChange={(value) => {
                      if (state) {
                        const find = result.find((x) => x.id === question.id);

                        console.log("value", value);
                        console.log("find", find.value);

                        handleAnswer(question.id, parseInt(value));

                        if (find.value === parseInt(value)) {
                          console.log("true");
                        } else {
                          console.log("false");
                          setDisableB(false);
                        }
                      } else {
                        handleAnswer(question.id, parseInt(value));
                      }
                    }}
                    value={
                      scores.find((item) => item.id === question.id)
                        ? scores
                            .find((item) => item.id === question.id)
                            .value.toString()
                        : null
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <RadioButton.Item
                        disabled={disable}
                        label="3"
                        value="3"
                      />
                      <RadioButton.Item
                        disabled={disable}
                        label="2"
                        value="2"
                      />
                      <RadioButton.Item
                        disabled={disable}
                        label="1"
                        value="1"
                      />
                      <RadioButton.Item
                        disabled={disable}
                        label="0"
                        value="0"
                      />
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
            ))}
          </View>

          {scores.length === questions.length && <ShowScores />}

          <Button
            title={!disable ? "บันทึก" : "แก้ไข"}
            onPress={() => {
              if (!disable) {
                setDialog();
              } else {
                setDisableB(true);
                setDisable(false);
              }
            }}
            disabled={state ? disableB : scores.length !== questions.length}
          />
        </View>
      </ScrollView>
      <MyDialog
        title="แบบสอบถามการได้ยิน"
        content="ส่งแบบสอบถาม"
        open={visible}
        setDialog={setDialog}
        onPress={handleSave}
      />
    </SafeArea>
  );
});

{
  /* <Text style={styles.scoresText}>Scores:</Text>
{scores.map((score) => (
  <Text
    key={score.id}
    style={styles.scoreItem}
  >{`Question ${score.id}: ${score.value}`}</Text>
))} */
}

export default AssessmentDocs;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.black,
    marginBottom: 20,
  },
  name: {
    fontSize: 17,
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  questionText: {
    flex: 1,
    marginRight: 10,
    fontSize: 17,
  },
  radioGroup: {
    flexDirection: "row",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  answerText: {
    fontSize: 16,
    marginLeft: 5,
  },
  scoresText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  scoreItem: {
    fontSize: 16,
    marginVertical: 5,
  },
});
