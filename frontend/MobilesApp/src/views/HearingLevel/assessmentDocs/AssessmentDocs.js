import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { SafeArea } from "../../../utils/SafeArea";
import { RadioButton } from "react-native-paper";
import { questions, radio } from "../../../mocks/hearingSoundList";
import MyDialog from "../../../components/MyDialog";
import { theme } from "../../../infrastructure/theme";
import { useStore } from "../../../store/store";
import { HttpStatusCode } from "axios";
import { ShowScores } from "./components/ShowScores";

const AssessmentDocs = ({ navigation }) => {
  const {
    hearingStore: { createFMHTByUserId },
    commonStore: { user },
  } = useStore();
  const [scores, setScores] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [disableSave, setDisableSave] = useState(false);

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
      id: 0,
      result: JSON.stringify(
        scores
          .sort((a, b) => a.id - b.id) // เรียงตาม id
          .map((score) => score)
      ),
      userId: user?.id,
    };

    var res = await createFMHTByUserId(data);

    if (res.statusCode === HttpStatusCode.Ok) {
      // setDialog();
      // navigation.navigate("hearing-level");
      setShowResult(true);
      setDisableSave(true);
    }
  };

  const value = scores
    .sort((a, b) => a.id - b.id) // เรียงตาม id
    .map((item) => item.value)
    .reduce((total, currentValue) => total + currentValue, 0);

  // console.log(
  //   "scores",
  //   scores
  //     .sort((a, b) => a.id - b.id) // เรียงตาม id
  //     .map((score) => score)
  // );

  return (
    <SafeArea>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>
              แบบสอบถามการได้ยินห้านาทีฉบับภาษาไทย
            </Text>

            <Text style={styles.name}>
              (Thai-Version Five Minute Hearing Test: FMHT)
            </Text>

            <Text style={styles.name}>
              อธิบายตัวเลือกและความหมาย 4 ตัวเลือก
            </Text>
          </View>

          <View>
            <Text style={styles.name}>
              "ไม่เคย" {"\t\t\t\t\t\t"} มีค่าคะแนน 0 = ไม่เคยประสบปัญหา
            </Text>

            <Text style={styles.name}>
              "เป็นครั้งคราว" {"\t"} มีค่าคะแนน 1 = นาน ๆ ครั้ง
            </Text>

            <Text style={styles.name}>
              "ครั้งหนึ่ง" {"\t\t\t\t\t"} มีค่าคะแนน 2 = เป็นบ่อย
            </Text>

            <Text style={styles.name}>
              "เกือบตลอด" {"\t\t\t"} มีค่าคะแนน 3 = เป็นประจำ
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
            }}
          >
            {questions.map((question) => (
              <View key={question.id}>
                <Text style={styles.questionText}>
                  {question.id}. {question.text}
                </Text>
                <RadioButton.Group
                  onValueChange={(value) => {
                    console.log(value);
                    handleAnswer(question.id, parseInt(value));
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
                      width: "50%",
                    }}
                  >
                    {radio.map((item) => (
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <RadioButton.Item value={item.value} />
                        <Text
                          style={{
                            fontSize: 16,
                            marginTop: 12,
                            marginLeft: -10,
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    ))}
                  </View>
                </RadioButton.Group>
              </View>
            ))}

            {/* <Text style={styles.scoresText}>Scores:</Text>
            {Object.entries(scores).map(([question, score]) => (
              <Text key={question} style={styles.scoreItem}>{`${question}: ${
                score - 1
              }`}</Text>
            ))} */}
          </View>

          <View
            style={{
              marginVertical: 20,
            }}
          >
            <Button
              title="ประเมินการได้ยิน"
              onPress={handleSave}
              disabled={scores.length !== questions.length || disableSave}
            />
          </View>

          {showResult && <ShowScores value={value} />}
        </View>
      </ScrollView>

      <MyDialog
        title="เอกสารประเมินการได้ยิน"
        content="ส่งเอกสารประเมิน"
        open={visible}
        setDialog={setDialog}
        onPress={handleSave}
      />
    </SafeArea>
  );
};

export default observer(AssessmentDocs);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: theme.fonts.primary,
    color: theme.colors.text.black,
    marginBottom: 20,
  },
  name: {
    fontSize: 15,
  },
  questionText: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
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

// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Button,
//   Image,
// } from "react-native";
// import React, { useState } from "react";
// import { observer } from "mobx-react-lite";
// import { SafeArea } from "../../../utils/SafeArea";
// import { RadioButton } from "react-native-paper";
// import { questions } from "../../../mocks/hearingSoundList";
// import { theme } from "../../../infrastructure/theme";
// import { useStore } from "./../../../store/store";
// import { HttpStatusCode } from "axios";
// import MyDialog from "../../../components/MyDialog";

// const AssessmentDocs = observer(({ route, navigation }) => {
//   const { state } = route.params;

//   const {
//     hearingStore: { createFMHTByUserId },
//     commonStore: { user },
//   } = useStore();

//   // const result = state ? JSON.parse(state.result) : [];

//   const [scores, setScores] = useState();
//   const [visible, setVisible] = useState(false);
//   const [disable, setDisable] = useState(state ? true : false);
//   const [disableB, setDisableB] = useState(state ? false : true);

//   const setDialog = () => setVisible(!visible);

//   const handleAnswer = (questionId, score) => {
//     setScores((prevScores) => {
//       // const existingIndex = prevScores.findIndex(
//       //   (item) => item.id === questionId
//       // );
//       // if (existingIndex !== -1) {
//       //   const newScores = [...prevScores];
//       //   newScores[existingIndex].value = score;
//       //   return newScores;
//       // } else {
//       //   return [...prevScores, { id: questionId, value: score }];
//       // }
//       [...prevScores, { id: questionId, value: score }];
//     });
//   };

//   const handleSave = async () => {
//     const data = {
//       result: JSON.stringify(
//         scores
//           .sort((a, b) => a.id - b.id) // เรียงตาม id
//           .map((score) => score)
//       ),
//       userId: user?.id,
//     };

//     var res = await createFMHTByUserId(data);

//     if (res.statusCode === HttpStatusCode.Ok) {
//       setDialog();
//       navigation.navigate("hearing-level");
//     }
//   };

//   const ShowScores = () => {
//     const value = scores
//       .sort((a, b) => a.id - b.id) // เรียงตาม id
//       .map((item) => item.value)
//       .reduce((total, currentValue) => total + currentValue, 0);

//     return (
//       <View>
//         <Text style={styles.title}>ผลการประเมิน</Text>
//         <Text
//           style={[
//             styles.title,
//             { backgroundColor: "yellow", padding: 10, borderRadius: 20 },
//           ]}
//         >
//           การประเมินผลการคัดกรองท่านได้คะแนน {value} คะแนน
//           {value < 10
//             ? "ท่านมีการได้ยินปกติ"
//             : "ท่านควรไปพบแพทย์เพื่อตรวจการการได้ยิน"}
//         </Text>
//       </View>
//     );
//   };

//   const dataRadio = [
//     {
//       label: "ไม่เคย",
//       value: 0,
//     },
//     {
//       label: "เป็นครั้งคราว",
//       value: 1,
//     },
//     {
//       label: "ครั้งหนึ่ง",
//       value: 2,
//     },
//     {
//       label: "เกือบตลอด",
//       value: 3,
//     },
//   ];

//   return (
//     <SafeArea>
//       <ScrollView>
//         <View style={styles.container}>
//           <View
//             style={{
//               alignItems: "center",
//             }}
//           >
//             <Text style={styles.title}>
//               แบบสอบถามการได้ยินห้านาทีฉบับภาษาไทย
//             </Text>

//             <Text>(Thai-Version Five Minute Hearing Test: FMHT)</Text>

//             <Text>อธิบายตัวเลือกและความหมาย 4 ตัวเลือก</Text>
//           </View>

//           <View>
//             <Text>
//               "ไม่เคย" {"\t\t\t\t\t\t"} มีค่าคะแนน 0 = ไม่เคยประสบปัญหา
//             </Text>

//             <Text>"เป็นครั้งคราว" {"\t"} มีค่าคะแนน 1 = นาน ๆ ครั้ง</Text>

//             <Text>"ครั้งหนึ่ง" {"\t\t\t\t\t"} มีค่าคะแนน 2 = เป็นบ่อย</Text>

//             <Text>"เกือบตลอด" {"\t\t\t"} มีค่าคะแนน 3 = เป็นประจำ</Text>
//           </View>

//           {/* <View>
//             <Image
//               source={require("../../../../assets/images/fmht.png")}
//               style={{
//                 width: "100%",
//                 height: 120,
//               }}
//             />
//           </View> */}

//           <View style={styles.container}>
//             {questions.map((question) => (
//               <View key={question.id}>
//                 <View>
//                   <Text style={styles.questionText}>
//                     {question.id}. {question.text}
//                   </Text>
//                   <RadioButton.Group
//                     onValueChange={(value) => {
//                       // if (state) {
//                       //   const find = result.find((x) => x.id === question.id);

//                       //   handleAnswer(question.id, parseInt(value));

//                       //   if (find.value === parseInt(value)) {
//                       //     console.log("true");
//                       //   } else {
//                       //     console.log("false");
//                       //     setDisableB(false);
//                       //   }
//                       // } else {
//                       handleAnswer(question.id, parseInt(value));
//                       // }
//                     }}
//                     // value={
//                     //   scores.find((item) => item.id === question.id)
//                     //     ? scores
//                     //         .find((item) => item.id === question.id)
//                     //         .value.toString()
//                     //     : null
//                     // }
//                   >
//                     <View
//                       style={{
//                         width: "50%",
//                       }}
//                     >
//                       {dataRadio.map((item) => (
//                         <View
//                           style={{
//                             flexDirection: "row",
//                           }}
//                         >
//                           <RadioButton.Item value={item.value} />
//                           <Text
//                             style={{
//                               fontSize: 17,
//                               marginTop: 12,
//                             }}
//                           >
//                             {item.label}
//                           </Text>
//                         </View>
//                       ))}
//                     </View>
//                   </RadioButton.Group>
//                 </View>
//               </View>
//             ))}
//           </View>

//           {/* {scores.length === questions.length && <ShowScores />} */}

//           <Button
//             title={!disable ? "ประเมินการได้ยิน" : "แก้ไข"}
//             onPress={() => {
//               if (!disable) {
//                 setDialog();
//               } else {
//                 setDisableB(true);
//                 setDisable(false);
//               }
//             }}
//             disabled={state ? disableB : scores.length !== questions.length}
//           />
//         </View>
//       </ScrollView>

//       <MyDialog
//         title="แบบสอบถามการได้ยิน"
//         content="ส่งแบบสอบถาม"
//         open={visible}
//         setDialog={setDialog}
//         onPress={handleSave}
//       />
//     </SafeArea>
//   );
// });

// {
//   /* <Text style={styles.scoresText}>Scores:</Text>
// {scores.map((score) => (
//   <Text
//     key={score.id}
//     style={styles.scoreItem}
//   >{`Question ${score.id}: ${score.value}`}</Text>
// ))} */
// }

// {
//   /* <Text style={styles.name}>
//   3 คือ ประสบประหาเหล่านี้หรือมีประสบการณ์ดังกล่าวเป็นประจำ
// </Text>
// <Text style={styles.name}>
//   2 คือ ประสบประหาเหล่านี้หรือมีประสบการณ์ดังกล่าวบ่อยพอ ๆ
//   กันกับช่วงเวลาที่ไม่เป็น
// </Text>
// <Text style={styles.name}>
//   1 คือ เคยประสบปัญหาเหล่านี้หรือมีประสบการณ์ดังกล่าวบ้างแต่นาน ๆ
//   ครั้ง
// </Text>
// <Text style={styles.name}>
//   0 คือ ไม่เคยประสบปัญหาเหล่านี้
//   หรือไม่มีประสบการณ์ดังกล่าวเกิดขึ้นเลย
// </Text> */
// }

// export default AssessmentDocs;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 20,
//     fontFamily: theme.fonts.primary,
//     color: theme.colors.text.black,
//     marginBottom: 20,
//   },
//   name: {
//     fontSize: 17,
//   },
//   questionContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   questionText: {
//     flex: 1,
//     marginRight: 10,
//     fontSize: 17,
//   },
//   radioGroup: {
//     flexDirection: "row",
//   },
//   radioOption: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 20,
//   },
//   answerText: {
//     fontSize: 16,
//     marginLeft: 5,
//   },
//   scoresText: {
//     marginTop: 20,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   scoreItem: {
//     fontSize: 16,
//     marginVertical: 5,
//   },
// });
