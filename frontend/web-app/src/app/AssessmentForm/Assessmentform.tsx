import React, { useState, useEffect } from "react";
import { Button, Radio } from "antd";
import axios from "axios";
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../utils/RoutePath";

function Assessmentform() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<any>([]);
  const [useScore, setUseScore] = useState<any>();
  const [getFMHT, setGetFMHT] = useState([]);
  const [isAllAnswered, setIsAllAnswered] = useState(false);

  const handleAnswer = (questionIndex, answer) => {
    const newAnswers: any = [...answers];
    newAnswers[questionIndex] = { id: questionIndex + 1, value: answer };
    setAnswers(newAnswers);
  };

  useEffect(() => {
    const hasAllAnswered = answers.length === 15 && !answers.some(answer => answer === undefined);
    setIsAllAnswered(hasAllAnswered);
  }, [answers]);

  useEffect(() => {
    const total = calculateTotalScore();
    setUseScore(total);
  }, [answers]);

  console.log("answers");

  const calculateTotalScore = () => {
    let score = 0;
    if (answers && answers.length > 0) {
      answers.forEach((answer) => {
        if (answer.value === "3") {
          score += 3;
        } else if (answer.value === "2") {
          score += 2;
        } else if (answer.value === "1") {
          score += 1;
        }
      });
    }
    return score;
  };
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    const userId = localStorage.getItem("UserId");
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:5255/api/FMHT/GetFMHTByUserId?userId=${userId}`
        );

        const data = response.data.result;
        const Convert = JSON.parse(data);
        setGetFMHT(Convert);
        // Set answers with the loaded data if it exists
        if (Convert && Convert.length > 0) {
          const loadedAnswers = Convert.map((item) => ({
            id: item.id,
            value: String(item.value),
          }));
          setAnswers(loadedAnswers);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลบ:", error);
      }
    })();
  }, []);

  console.log("useScore", useScore);

  const handleSubmit = async () => {
    if (isAllAnswered) {
      const total = calculateTotalScore();
      setUseScore(total);
  
      const answersJSON = JSON.stringify(answers);
  
      try {
        const userId = localStorage.getItem("UserId");
  
        const bodyData = {
          userId: userId,
          result: answersJSON,
        };
  
        const response = await fetch(
          "http://localhost:5255/api/FMHT/CreateFMHT",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          console.log("Upload success:", data);
          notification.success({
            message: 'สำเร็จ',
            description: 'บันทึกการประเมินการได้ยินเสร็จสิ้น',
          });
          setTimeout(() => {
            navigate(RoutePath.userDetail(userId));
          }, 3000);

        } else {
          console.error("Upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading:", error);
      }
    }
  };

  const renderQuestions = () => {
    const questions = [
      "ฉันมีปัญหาในการฟังเสียงโทรศัพท์",
      "ฉันมีความลำบากที่จะปะติดปะต่อเรื่องที่สนทนาเวลามีคนตั้งแต่ 2 คนขึ้นไปพูดพร้อมกัน",
      "คนทั่วไปบ่นว่าฉันเปิดทีวีเสียงดัง",
      "ฉันต้องพยายามอย่างหนักที่จะเข้าใจการสนทนา",
      "ฉันไม่ได้ยินเสียงทั่วๆ ไป เช่น โทรศัพท์หรือกริ่งประตู",
      "ฉันมีความลำบากในการฟังการสนทนาในที่ที่มีเสียงรบกวน เช่น งานเลี้ยง",
      "ฉันรู้สึกสับสนว่าเสียงมาจากทางไหน",
      "ฉันไม่เข้าใจคําบางคําในประโยคและจําเป็นต้องขอให้คนพูดซ้ำ",
      "ฉันมีปัญหาโดยเฉพาะอย่างยิ่งในการทําความเข้าใจคําพูดของผู้หญิงและเด็ก",
      "ฉันทํางานในที่ๆมีเสียงดัง เช่น โรงงานขุดเจาะถนน เครื่องจักรไอพ่น เป็นต้น",
      "คนหลายคนที่ฉันคุยด้วยดูเหมือนจะพูดพึมพัมหรือพูดไม่ชัด",
      "คนทั่วไปรู้สึกรําคาญ เพราะฉันไม่เข้าใจว่าเขาพูดอะไร",
      "ฉันไม่เข้าใจในสิ่งที่คนอื่นกําลังพูดทําให้ตอบสนองไม่เหมาะสม",
      "ฉันเลี่ยงงานสังคม เพราะว่าฉันได้ยินไม่ดีและกลัวว่าจะตอบไม่ตรงคําถาม",
      "ข้อนี้ให้คนในครอบครัวหรือเพื่อนตอบคำถามแทน  คุณคิดว่าบุคคลนี้มีปัญหาการได้ยินหรือไม่",
    ];

    return questions.map((question, index) => (
      <React.Fragment key={index}>
        <div
          style={{
            width: 500,
            border: "1px solid #000",
            paddingLeft: 5,
            paddingTop: 4,
            paddingBottom: 5,
          }}
        >
          <span>
            {index + 1}.{question}
          </span>
        </div>
        {[3, 2, 1, 0].map((value) => (
          <div
            key={value}
            style={{
              border: "1px solid #000",
              width: 161,
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Radio.Group
              onChange={(e) => handleAnswer(index, e.target.value)}
              value={
                (answers[index] && answers[index].value) ??
                (getFMHT[index] && getFMHT[index].value)
              }
            >
              <Radio
                value={String(value)}
                checked={
                  getFMHT &&
                  getFMHT[index]?.id === index &&
                  parseInt(getFMHT[index]?.value) === value
                }
              />
            </Radio.Group>
          </div>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div>
        <div
          style={{
            padding: 30,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 18, fontWeight: 500, paddingTop: 50 }}>
            แบบสอบถามการได้ยินห้านาทีฉบับภาษาไทย
          </p>
          <p style={{ fontSize: 18, fontWeight: 300 }}>
            (Thai-Version Five Minute Hearing Test: FMHT)
          </p>
          <p style={{ fontSize: 17, marginLeft: -300, fontWeight: 200 }}>
           อธิบายตัวเลือกและความหมาย 4 ตัวเลือก ดังนี้
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: 20,
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              paddingTop: 5,
              paddingBottom: 5,
              marginTop: -30,
            }}
          >
            <span style={{ width: 150 }}>ตัวเลือก</span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span style={{ marginLeft: 150, width: "30%" }}>ความหมาย</span>
              <span style={{ marginLeft: 150, width: "15%" }}>
                มีค่าคะแนนเท่ากับ
              </span>
            </div>
          </div>

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              paddingLeft: 23,
              width: "100%",
              marginBottom: 5,
            }}
          >
            <span style={{ width: "24%", fontSize: 15 }}>ไม่เคย</span>
            <span style={{ width: "40%", fontSize: 15 }}>
              ไม่เคยประสบปัญหาเหล่านี้ หรือไม่มีประสบการณ์ดังกล่าวเกิดขึ้นเลย
            </span>
            <span style={{ width: "7%", marginLeft: 317, fontSize: 15 }}>
              0
            </span>
          </div>

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              paddingLeft: 23,
              width: "100%",
              marginBottom: 5,
            }}
          >
            <span style={{ width: "24%", fontSize: 15 }}>เป็นครั้งคราว</span>
            <span style={{ width: "40%", fontSize: 15 }}>
              เคยประสบปัญหาเหล่านี้หรือมีประสบการณ์ดังกล่าวบ้างแต่นาน ๆ ครั้ง
            </span>
            <span style={{ width: "7%", marginLeft: 317, fontSize: 15 }}>
              1
            </span>
          </div>

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              paddingLeft: 23,
              width: "100%",
              marginBottom: 5,
            }}
          >
            <span style={{ width: "16%", marginRight: 98, fontSize: 15 }}>
              ครั้งหนึ่ง
            </span>
            <span style={{ width: "45%", fontSize: 15 }}>
            ประสบปัญหาเหล่านี้หรือมีประสบการณ์ดังกล่าวบ่อยพอ ๆ
              กันกับช่วงเวลาที่ไม่เป็น
            </span>
            <span style={{ width: "7%", marginLeft: 256, fontSize: 15 }}>
              2
            </span>
          </div>

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              paddingLeft: 23,
              width: "100%",
              marginBottom: 5,
            }}
          >
            <span style={{ width: "24%", fontSize: 15 }}>เกือบตลอด</span>
            <span style={{ width: "40%", fontSize: 15 }}>
            ประสบปัญหาเหล่านี้หรือมีประสบการณ์ดังกล่าวเป็นประจำ
            </span>
            <span style={{ width: "7%", marginLeft: 317, fontSize: 15 }}>
              3
            </span>
          </div>
        </div>

        <div
          style={{
            padding: 30,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 17, marginLeft: -300, marginTop: -20 }}>
            ผู้ทดสอบการได้ยินจะต้องตอบทุกข้อ โดยเลือกให้ตรงกับท่านมากที่สุด
          </p>
          <p style={{ marginTop: 10, fontSize: 18, fontWeight: 500 }}>
            แบบสอบถามการได้ยินห้านาทีฉบับภาษาไทย
          </p>
        </div>

        {/* แบบทดสอบ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr repeat(4, minmax(0, 1fr))",
            // gap: "10px",
            paddingLeft: 60,
            paddingRight: 60,
          }}
        >
          {/* หัวเรื่อง */}
          <div
            style={{
              width: 500,
              border: "1px solid #000",
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
            }}
          >
            <span>คำถาม</span>
          </div>
          <div
            style={{
              border: "1px solid #000",
              width: 161,
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span>เกือบตลอด</span>
          </div>
          <div
            style={{
              border: "1px solid #000",
              width: 161,
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span>ครึ่งหนึ่ง</span>
          </div>
          <div
            style={{
              border: "1px solid #000",
              width: 161,
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span>เป็นครั้งคราว</span>
          </div>
          <div
            style={{
              border: "1px solid #000",
              width: 161,
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span>ไม่เคย</span>
          </div>

          {renderQuestions()}

          {/* รวม */}
          <div
            style={{
              width: 500,
              border: "1px solid #000",
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
            }}
          >
            <span>
              คะแนนรวม : <span style={{ fontWeight: 700 }}>{useScore}</span>
            </span>
          </div>
          <div
            style={{
              border: "1px solid #000",
              width: 161,
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span></span>
          </div>
          <div
            style={{
              border: "1px solid #000",
              width: 161,
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span></span>
          </div>
          <div
            style={{
              border: "1px solid #000",
              width: 161,
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span></span>
          </div>
          <div
            style={{
              border: "1px solid #000",
              width: 161,
              paddingLeft: 5,
              paddingTop: 4,
              paddingBottom: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span></span>
          </div>

          <Button onClick={handleSubmit} disabled={!isAllAnswered}>ประเมินการได้ยิน</Button>
        </div>

        <div style={{ padding: "25px", border: "1px solid #ccc", borderRadius: "5px", marginTop: "20px",marginLeft:50,marginRight:50}}>
  <p style={{fontSize:20,fontWeight:600}}>ผลลัพทธ์</p>
  {useScore > 10 ? (
    <div>
      <p>การประเมินผลการคัดกรองของท่านได้คะแนน {useScore} คะแนน ท่านควรไปพบแพทย์เพื่อตรวจการการได้ยิน</p>
    </div>
  ) : (
    <div>
      <p>การประเมินผลการคัดกรองของท่านได้คะแนน {useScore} คะแนน ท่านมีการได้ยินปกติ</p>
    </div>
  )}
</div>


            
        <div style={{ height: 50 }}></div>
      </div>
    </div>
  );
}

export default Assessmentform;
