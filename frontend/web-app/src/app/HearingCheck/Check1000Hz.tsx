import React, { useState, useEffect } from "react";
import { Steps, Button, message, Card, notification } from "antd";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import soundFile from "../../sound/1000Hz.mp4";
import useSound from "use-sound";
import { useNavigate } from "react-router-dom";

function Check1000Hz() {
  const navigate = useNavigate();

  const [changesound, setChangesound] = useState(0.3);
  const [changesoundDB, setChangesoundDB] = useState<any>();

  const [dbcolor, setDbColor] = useState<any>()

  const [score, setScore] = useState<any>();

  const [play, { stop }] = useSound(soundFile, {
    interrupt: true,
    volume: changesound,
  });
  const [isSoundOn, setIsSoundOn] = useState(true);

  useEffect(() => {
    if (isSoundOn) {
      handleSoundSequence();
    } else {
      return;
    }
  }, [isSoundOn, play]);


  useEffect(() => {
    setDbColor(!dbcolor);
  }, [changesoundDB]);
  
  console.log("dbcolor",dbcolor)
  

  const soundSequence = [
    { volume: 0.3, db: 30 },
    { volume: 0.2, db: 20 },
    { volume: 0.25, db: 25 },
    { volume: 0.35, db: 35 },
    { volume: 0.4, db: 40 },
    { volume: 0.45, db: 45 },
    { volume: 0.5, db: 50 },
    { volume: 0.55, db: 55 },
    { volume: 0.6, db: 60 },
    { volume: 0.65, db: 65 },
    { volume: 0.7, db: 70 },
    { volume: 0.75, db: 75 },
    { volume: 0.8, db: 80 },
    { volume: 0.85, db: 85 },
    { volume: 0.9, db: 90 },
    { volume: 0.91, db: 91 },
  ];

  const handleSoundSequence = async () => {
    for (const { volume, db } of soundSequence) {
      const delay = 300
      for (let i = 0; i < 2; i++) {
        setChangesound(volume);
        await play();
        setChangesoundDB(db);
        console.log(db);
        await new Promise((resolve) => setTimeout(resolve, delay));
        // if (!isSoundOn || score !== undefined) {
        if (!isSoundOn) {
          stop();
          return;
        }
        stop();
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      if (db === 91) {
    const keyLeft = localStorage.getItem("keyEarleft");
        if(keyLeft)
        {
          localStorage.setItem("scoreLeft1", '91');
          notification.success({
            message: 'สำเร็จ',
            description: 'กำลังจะพาท่านไปยังความถี่ถัดไป',
          });
          setTimeout(() => {
            navigate("/Check2000Hz");
          }, 5000);
          return
        }else{
          localStorage.setItem("scoreRight1", '91');
          notification.success({
            message: 'สำเร็จ',
            description: 'กำลังจะพาท่านไปยังความถี่ถัดไป',
          });
          setTimeout(() => {
            navigate("/Check2000Hz");
          }, 5000);
        }
        return;
      }
    }
  };

  console.log("score", score);
  console.log("isSoundOn", isSoundOn);

  const saveDb = () => {
    stop();
    setIsSoundOn(false);
    setScore(changesoundDB);


    const keyLeft = localStorage.getItem("keyEarleft");

    const keyEarRight = localStorage.getItem("keyEarRight");

    console.log("keyLeft",keyLeft)
    if (keyLeft != null) {
      localStorage.setItem("scoreLeft1", changesoundDB);
    }
    if(keyEarRight != null) {
      localStorage.setItem("scoreRight1", changesoundDB);
    }



    navigate("/Check2000Hz");
    console.log("Score:", score);
  };



  return (
    <div
      style={{
        padding: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{ width: "100%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
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
              <p style={{ fontSize: 60, fontWeight: 700, marginBottom: 50 }}>
                1000 Hz
              </p>
              <GiSoundOn size={120} />
              {changesoundDB && (
                <p style={{ fontSize: 24, marginTop: 10,fontWeight:700,backgroundColor: dbcolor ?'#000':'#fff45b',color: dbcolor ? '#ffffff':'#ff0000',padding:10,borderRadius:5}}>
                  ระดับเสียง: {changesoundDB}
                </p>
              )}
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
              ได้ยิน
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Check1000Hz;
