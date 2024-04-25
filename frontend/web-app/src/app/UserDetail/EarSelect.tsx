import React, { useState, useEffect } from "react";
import { Card } from "antd";
import soundFile from "../../sound/1000Hz.mp4";
import { useNavigate } from "react-router-dom";
import { TbEar } from "react-icons/tb";
import { PiEarBold } from "react-icons/pi";
// import EarLeft from "../../image/earleft.png";
// import EarRight from "../../image/earright.png";
import { RoutePath } from "../../utils/RoutePath";
import { pathImageServer } from "../../hooks/api/agent";

function EarSelect() {
  const navigate = useNavigate();

  const EarLeft = "earleft.png";
  const EarRight = "earright.png";

  const selectEarLeft = () => {
    localStorage.setItem("ear0", "0");
    localStorage.setItem("keyEarleft", "0");
    navigate(RoutePath.check1000Hz);
  };

  const selectEarRight = () => {
    localStorage.setItem("ear1", "1");
    localStorage.setItem("keyEarRight", "1");
    navigate(RoutePath.check1000Hz);
  };

  useEffect(() => {
    const hasRefreshed = localStorage.getItem("hasRefreshed");
    if (!hasRefreshed) {
      localStorage.setItem("hasRefreshed", true);
      window.location.reload();

      for (let i = 1; i <= 7; i++) {
        localStorage.removeItem("scoreRight" + i);
      }

      for (let i = 1; i <= 7; i++) {
        localStorage.removeItem("scoreLeft" + i);
      }

      for (let i = 0; i <= 2; i++) {
        localStorage.removeItem("ear" + i);
      }

      localStorage.removeItem("keyEarleft");
      localStorage.removeItem("keyEarRight");
    } else {
      localStorage.removeItem("hasRefreshed");
    }
  }, []);

  return (
    <div className="responsiveearselect">
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
              <p style={{ fontSize: 40, fontWeight: 600 }}>กรุณาเลือก</p>

              <div style={{ display: "flex", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "100%",
                    cursor: "pointer",
                    borderRight: "1px solid #000", // เพิ่มเส้นแบ่งด้านขวาของปุ่ม "หูซ้าย"
                  }}
                  onClick={selectEarLeft}
                >
                  {/* <PiEarBold style={{ fontSize: 150 }} /> */}
                  <img
                    // src={EarLeft}
                    src={pathImageServer + EarLeft}
                    alt="right_ear_icon"
                    style={{ width: 150, height: 150 }}
                  />
                  <span style={{ fontSize: 18, fontWeight: 600 }}>หูซ้าย</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "100%",
                    cursor: "pointer",
                    borderLeft: "1px solid #000", // เพิ่มเส้นแบ่งด้านซ้ายของปุ่ม "หูขวา"
                  }}
                  onClick={selectEarRight}
                >
                  {/* <TbEar style={{ fontSize: 150 }} /> */}
                  <img
                    // src={EarRight}
                    src={pathImageServer + EarRight}
                    alt="right_ear_icon"
                    style={{ width: 150, height: 150 }}
                  />

                  <span style={{ fontSize: 18, fontWeight: 600 }}>หูขวา</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default EarSelect;
