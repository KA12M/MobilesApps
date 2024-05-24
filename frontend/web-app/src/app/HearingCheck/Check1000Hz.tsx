import React, { useState, useEffect } from "react";
import { Steps, Button, message, Card, notification } from "antd";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
// import soundFile from "../../sound/1000Hz.mp4";
// import soundFile from "../../sound/B_1000Hz_Used.mp4";
import useSound from "use-sound";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../utils/RoutePath";
import { pathImageServer, pathassets } from "../../hooks/api/agent";

// import soundFile from "../../sound/1000HzNew.mp4";


function Check1000Hz() {
  const navigate = useNavigate();

  // Old Version

  // const soundFile = pathImageServer + "1000Hz-dd42a4c4.mp4";

  // const [changesound, setChangesound] = useState(0.3);

  // const [changesoundDB, setChangesoundDB] = useState<any>();

  // const [dbcolor, setDbColor] = useState<any>();

  // const [score, setScore] = useState<any>();

  // const [play, { stop }] = useSound(soundFile, {
  //   interrupt: true,
  //   volume: changesound,
  // });
  // const [isSoundOn, setIsSoundOn] = useState(true);

  // useEffect(() => {
  //   if (isSoundOn) {
  //     handleSoundSequence();
  //   } else {
  //     return;
  //   }
  // }, [isSoundOn, play]);

  // useEffect(() => {
  //   setDbColor(!dbcolor);
  // }, [changesoundDB]);

  // const soundSequence = [
  //   { volume: 0.3, db: 30 },
  //   { volume: 0.2, db: 20 },
  //   { volume: 0.25, db: 25 },
  //   { volume: 0.35, db: 35 },
  //   { volume: 0.4, db: 40 },
  //   { volume: 0.45, db: 45 },
  //   { volume: 0.5, db: 50 },
  //   { volume: 0.55, db: 55 },
  //   { volume: 0.6, db: 60 },
  //   { volume: 0.65, db: 65 },
  //   { volume: 0.7, db: 70 },
  //   { volume: 0.75, db: 75 },
  //   { volume: 0.8, db: 80 },
  //   { volume: 0.85, db: 85 },
  //   { volume: 0.9, db: 90 },
  //   { volume: 0.91, db: 91 },
  // ];

  // const handleSoundSequence = async () => {
  //   for (const { volume, db } of soundSequence) {
  //     const delay = 3000;
  //     for (let i = 0; i < 2; i++) {
  //       setChangesound(volume);
  //       await play();
  //       setChangesoundDB(db);
  //       console.log(db);
  //       await new Promise((resolve) => setTimeout(resolve, delay));
  //       // if (!isSoundOn || score !== undefined) {
  //       if (!isSoundOn) {
  //         stop();
  //         return;
  //       }
  //       stop();
  //       await new Promise((resolve) => setTimeout(resolve, delay));
  //     }
  //     if (db === 91) {
  //       const keyLeft = localStorage.getItem("keyEarleft");
  //       if (keyLeft) {
  //         localStorage.setItem("scoreLeft1", "91");
  //         notification.success({
  //           message: "สำเร็จ",
  //           description: "กำลังจะพาท่านไปยังความถี่ถัดไป",
  //         });
  //         setTimeout(() => {
  //           navigate(RoutePath.check2000Hz);
  //         }, 5000);
  //         return;
  //       } else {
  //         localStorage.setItem("scoreRight1", "91");
  //         notification.success({
  //           message: "สำเร็จ",
  //           description: "กำลังจะพาท่านไปยังความถี่ถัดไป",
  //         });
  //         setTimeout(() => {
  //           navigate(RoutePath.check2000Hz);
  //         }, 5000);
  //       }
  //       return;
  //     }
  //   }
  // };

  // const saveDb = () => {
  //   stop();
  //   setIsSoundOn(false);
  //   setScore(changesoundDB);

  //   const keyLeft = localStorage.getItem("keyEarleft");

  //   const keyEarRight = localStorage.getItem("keyEarRight");

  //   console.log("keyLeft", keyLeft);
  //   if (keyLeft != null) {
  //     localStorage.setItem("scoreLeft1", changesoundDB);
  //   }
  //   if (keyEarRight != null) {
  //     localStorage.setItem("scoreRight1", changesoundDB);
  //   }
  //   navigate(RoutePath.check2000Hz);
  //   console.log("Score:", score);
  // };

  // New Version
  const soundFile = pathassets + "1000HzNew-0af3c364.mp4";

  const [play, { stop }] = useSound(soundFile);
  const [valueIndex, setValueIndex] = useState(0);
  const values = [30, 20, 20, 25, 30, 35, 40, 45, 48, 48];

  const [dbcolor, setDbColor] = useState(false);
  useEffect(() => {
    play();
    const interval = setInterval(() => {
      setValueIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex === values.length) {
          clearInterval(interval); // เมื่อถึงค่าสุดท้ายให้หยุด interval
          if (prevIndex === 9) { // เมื่อ valueIndex เป็น 9
            const keyLeft = localStorage.getItem("keyEarleft");
            if (keyLeft) {
              localStorage.setItem("scoreLeft1", "48");
              notification.success({
                message: "สำเร็จ",
                description: "กำลังจะพาท่านไปยังความถี่ถัดไป",
              });
              setTimeout(() => {
                navigate(RoutePath.check2000Hz);
              }, 5000);
            } else {
              localStorage.setItem("scoreRight1", "48");
              notification.success({
                message: "สำเร็จ",
                description: "กำลังจะพาท่านไปยังความถี่ถัดไป",
              });
              setTimeout(() => {
                navigate(RoutePath.check2000Hz);
              }, 5000);
            }
          }
          return prevIndex;
        }
        return nextIndex;
      });
    }, 6000);
  
    return () => {
      stop();
      clearInterval(interval);
    };
  }, [play, stop, values.length]);
  

  console.log("valueIndex",valueIndex)


  const saveDb = () => {
    stop();
    const Value:any = values[valueIndex]
    const keyLeft = localStorage.getItem("keyEarleft");
    const keyEarRight = localStorage.getItem("keyEarRight");
    if (keyLeft != null) {
      localStorage.setItem("scoreLeft1", Value);
    }
    if (keyEarRight != null) {
      localStorage.setItem("scoreRight1", Value);
    }
    navigate(RoutePath.check2000Hz);
    console.log("values[valueIndex]",Value)
  };

  useEffect(() => {
    const colorTimer = setTimeout(() => {
      setDbColor(!dbcolor);
    }, 6000);

    return () => {
      clearTimeout(colorTimer);
    };
  }, [dbcolor]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "100%",
          height: 585,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="steps-action">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p className="responsivecheckfont1">ระดับความดัง 1000 Hz</p>
              <GiSoundOn size={120} />
              <p
                style={{
                  fontSize: 24,
                  marginTop: 10,
                  fontWeight: 700,
                  backgroundColor: dbcolor ? "#000" : "#fff45b",
                  color: dbcolor ? "#ffffff" : "#ff0000",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                ระดับเสียง: {values[valueIndex]}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={saveDb}
              style={{ width: 200, height: 80, marginTop: 50, fontSize: 24 }}
            >
              คลิกเพื่อได้ยิน
            </Button>
          </div>
        </div>
      </Card>
      <div className="responsivecheck1000hz"></div>
    </div>
  );
}

export default Check1000Hz;