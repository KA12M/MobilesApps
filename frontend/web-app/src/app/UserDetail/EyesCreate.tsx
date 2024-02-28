import React, { useState } from "react";
import { Button } from "react-bootstrap";

function EyesCreate({ setMode, userId }) {
  const [leftEyeImage, setLeftEyeImage] = useState(null);
  const [rightEyeImage, setRightEyeImage] = useState(null);
  const [note, setNote] = useState("");
  const [leftEyeImageUrl, setLeftEyeImageUrl] = useState("");
  const [rightEyeImageUrl, setRightEyeImageUrl] = useState("");
  const [diabetesData, setDiabetesData] = useState(null);
  const [diabetesDataConvertLeft, setDiabetesDataConvertLeft] = useState<any>(null);
  const [disableButton, setDisableButton] = useState<any>(false);

  const [diabetesDataConvertRight, setDiabetesDataConvertRight] =
    useState<any>(null);

  const handleLeftEyeChange = (e) => {
    const file = e.target.files[0];
    setLeftEyeImage(file);
    setLeftEyeImageUrl(URL.createObjectURL(file));
  };

    console.log("userId",userId)

  const handleRightEyeChange = (e) => {
    const file = e.target.files[0];
    setRightEyeImage(file);
    setRightEyeImageUrl(URL.createObjectURL(file));
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ImageEyeLeft", leftEyeImage);
    formData.append("ImageEyeRight", rightEyeImage);
    formData.append("Note", note);
    formData.append("Userid", userId);

    try {
      const response = await fetch("http://localhost:5255/api/Diabetes", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload success:", data);
        setDiabetesData(data);
        const ConvertRight =
          data.resultRight === "ไม่เป็นเบาหวาน"
            ? []
            : JSON.parse(data.resultRight);
        setDiabetesDataConvertRight(ConvertRight || null);

        const ConvertLeft =
          data.resultLeft === "ไม่เป็นเบาหวาน"
            ? []
            : JSON.parse(data.resultLeft);
        setDiabetesDataConvertLeft(ConvertLeft || null);
        
        
        setDisableButton(true)
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  //   console.log("🤔🤔",diabetesDataConvert)

  return (
    <div style={{ width: "100%", padding: 35, backgroundColor: "#fff" }}>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            border: "1px solid #fff",
            width: "100%",
            borderRadius: 15,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ paddingLeft: 30, paddingTop: 20 }}>
            <Button className="btn btn-danger" onClick={setMode}>
              กลับ
            </Button>
          </div>

          <div style={{ padding: 30 }}>
            <span style={{ fontWeight: 600, fontSize: 25 }}>ตรวจสอบสภาพตา</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <span style={{ fontSize: 18, marginRight: 20 }}>ดวงตาซ้าย</span>
            <span style={{ fontSize: 18 }}>ดวงตาขวา</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div style={{}}>
              {leftEyeImageUrl && (
                <img
                  src={leftEyeImageUrl}
                  alt="Left Eye"
                  style={{ width: 125, height: 125, marginTop: 10 }}
                />
              )}
            </div>

            <div style={{}}>
              {rightEyeImageUrl && (
                <img
                  src={rightEyeImageUrl}
                  alt="Right Eye"
                  style={{ width: 125, height: 125, marginTop: 10 }}
                />
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <input type="file" onChange={handleLeftEyeChange} disabled={disableButton}/>
            <input type="file" onChange={handleRightEyeChange} disabled={disableButton} />
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <textarea
              placeholder="หมายเหตุ"
              rows="4"
              cols="100"
              value={note}
              onChange={handleNoteChange}
              disabled={disableButton}
            ></textarea>
          </div>



          <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>

            {disableButton ? <Button className="btn btn-danger" onClick={setMode}>
              กลับ
            </Button> : <Button type="submit">ส่งข้อมูล</Button>}
     
          </div>

          {diabetesData && (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <p>
                ตาซ้าย:{" "}
                {diabetesDataConvertLeft.length
                  ? diabetesDataConvertLeft.map((item) => (
                      <>
                        <p>
                          {item.Key}: {(item.Value * 100).toFixed(3)} %
                        </p>
                      </>
                    ))
                  : "ไม่เป็นเบาหวาน"}
              </p>
              <p>
                ตาขวา:{" "}
                {diabetesDataConvertRight.length
                  ? diabetesDataConvertRight.map((item) => (
                      <>
                        <p>
                          {item.Key}: {(item.Value * 100).toFixed(3)}  %
                        </p>
                      </>
                    ))
                  : "ไม่เป็นเบาหวาน"}
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default EyesCreate;
