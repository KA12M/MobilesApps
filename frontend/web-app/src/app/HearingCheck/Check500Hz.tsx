import React, { useState, useEffect } from "react";
import { Steps, Button, message, Card, notification } from "antd";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import useSound from "use-sound";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../utils/RoutePath";
import { pathImageServer, pathassets } from "../../hooks/api/agent";
import soundFile from "../../sound/500HzNew.mp4"; 

function Check500Hz() {
  const navigate = useNavigate();
 const soundFile = pathassets + "500HzNew-ec7b832c.mp4";
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
        clearInterval(interval);
        if (prevIndex === 9) {
          const keyLeft = localStorage.getItem("keyEarleft");
          if (keyLeft) {
            localStorage.setItem("scoreLeft7", "48");
            notification.success({
              message: "สำเร็จ",
              description: "กำลังจะพาท่านไปยังความถี่ถัดไป",
            });
            setTimeout(() => {
              navigate(RoutePath.pauseCheck);
            }, 5000);
          } else {
            localStorage.setItem("scoreRight7", "48");
            notification.success({
              message: "สำเร็จ",
              description: "กำลังจะพาท่านไปยังความถี่ถัดไป",
            });
            setTimeout(() => {
              navigate(RoutePath.pauseCheck);
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
     localStorage.setItem("scoreLeft7", Value);
   }
   if (keyEarRight != null) {
     localStorage.setItem("scoreRight7", Value);
   }
   navigate(RoutePath.pauseCheck);

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
            <p className="responsivecheckfont1">ระดับความดัง 500 Hz</p>
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

export default Check500Hz;
