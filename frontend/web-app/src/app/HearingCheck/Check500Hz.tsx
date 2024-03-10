import React, { useState, useEffect } from "react";
import { Steps, Button, message, Card } from "antd";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import soundFile from "../../sound/500Hz.mp4";
import useSound from "use-sound";
import { useNavigate } from "react-router-dom";

function Check500Hz() {
  const navigate = useNavigate();

  const [changesound, setChangesound] = useState(0.3);
  const [changesoundDB, setChangesoundDB] = useState<any>();

  const [score, setScore] = useState<any>();

  const [play, { stop }] = useSound(soundFile, {
    interrupt: true,
    volume: changesound,
  });
  const [isSoundOn, setIsSoundOn] = useState(true);


       useEffect(() => {
        const hasRefreshed = localStorage.getItem('hasRefreshed');
        if (!hasRefreshed) {
          localStorage.setItem('hasRefreshed', true);
          window.location.reload();
        } else {
          localStorage.removeItem('hasRefreshed');
        }
  }, []);


  useEffect(() => {
    if (isSoundOn) {
      handleSoundSequence();
    } else {
      return;
    }
  }, [isSoundOn, play]);

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
    { volume: 0.95, db: 95 },
  ];

  const handleSoundSequence = async () => {
    for (const { volume, db } of soundSequence) {
      for (let i = 0; i < 2; i++) {
        setChangesound(volume);
        await play();
        setChangesoundDB(db);
        console.log(db);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        if (!isSoundOn || score !== undefined) {
          stop();
          return;
        }
        stop();
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
      if (db === 95 || score !== undefined) {
        return;
      }
    }
  };

  console.log("score", score);
  console.log("isSoundOn", isSoundOn);

  const saveDb = () => {
    stop("");
    setIsSoundOn(false);
    setScore(changesoundDB);

    const ear0 = localStorage.getItem("ear0");
    const ear1 = localStorage.getItem("ear1");

    const score7Right = localStorage.getItem("scoreRight7");
    const score7Left = localStorage.getItem("scoreLeft7");

    if (score7Right) {
      localStorage.setItem("scoreLeft7", changesoundDB);
    } else if (score7Left) {
      localStorage.setItem("scoreRight7", changesoundDB);
    }

    if(ear0){
      localStorage.setItem("scoreLeft7", changesoundDB);
      }else{
      localStorage.setItem("scoreRight7", changesoundDB);
      }


      if(ear0 && ear1){
        handleSubmit();
        return
      }
      navigate("/PauseCheck");

    console.log("Score:", score);
  };


  function processHearing(item) {
    let total = 0;
    let count = 0;
  
    for (const key in item) {
      if (key.startsWith('v')) {
        total += item[key]; 
        count++;
      }
    };
    
  
    // Calculate the average score
    const result = total / count;

    switch (true) {
      case result > 90:
        return "ระดับหูหนวก";
      case result >= 71:
        return "ระดับรุนแรง";
      case result >= 56:
        return "ระดับปานกลางค่อนข้างรุนแรง";
        case result >= 41:
          return "ระดับปานกลาง";
        case result >= 26:
          return "ระดับน้อย";
          case result >= -10:
            return "การได้ยินปกติ";
      default:
        break;
    }
  }
  
  

  const transformData = () => {
    const transformedData = { items: [] };
  
    for (let ear = 0; ear < 2; ear++) {
      const item = {
        ear: ear,
      };
  
      for (let i = 1; i <= 7; i++) {
        const score = localStorage.getItem(`score${ear === 0 ? 'Left' : 'Right'}${i}`);
        item[`v${250 * Math.pow(2, i - 1)}`] = parseInt(score) || 0;
      }
  
      item["result"] = processHearing(item);
  
      transformedData.items.push(item);
    }
  
    console.log("new", JSON.stringify(transformedData, null, 2));
  
    return transformedData;
  };
  
  
  const handleSubmit = async () => {
  
    try {
      const userId = localStorage.getItem("UserId");
  
      if (!userId) {
        console.error("UserId not found in LocalStorage");
        return;
      }
  
      const transformedData = transformData();
  
      const bodyData = {
        userId: userId,
        items: transformedData.items,
      };
  
      const response = await fetch(
        "http://localhost:5255/api/Hearing/AddHearingByUserId",
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
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };
  
  
  


  return (
    <div style={{ padding: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
<Card style={{ width: "100%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>

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
            <p style={{ fontSize: 60, fontWeight: 700, marginBottom: 50 }}>500 Hz</p>
            <GiSoundOn size={120} />
            {changesoundDB && (
                <p style={{ fontSize: 20, marginTop: 10 }}>
                  ระดับเสียง: {changesoundDB}
                </p>
              )}
          </div>
        </div>
  
       <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
       <Button onClick={saveDb} style={{ width: 200, height: 80, marginTop: 50, fontSize: 20 }}>บันทึก</Button>

       <Button onClick={handleSubmit}>Test</Button>
       </div>
      </div>
    </Card>
  </div>
  
  
  );
}

export default Check500Hz;
