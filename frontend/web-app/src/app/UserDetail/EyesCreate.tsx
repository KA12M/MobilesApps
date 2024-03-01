import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function EyesCreate({ setMode, userId, selectedUserDetail }) {
  const [leftEyeImage, setLeftEyeImage] = useState<any>(null);
  const [rightEyeImage, setRightEyeImage] = useState<any>(null);
  const [note, setNote] = useState("");
  const [leftEyeImageUrl, setLeftEyeImageUrl] = useState("");
  const [rightEyeImageUrl, setRightEyeImageUrl] = useState("");
  const [diabetesData, setDiabetesData] = useState(null);
  const [diabetesDataRecheck, setDiabetesDataRecheck] = useState<any>(null);
  const [diabetesDataDetail, setDiabetesDataDetail] = useState<any>(null);
  const [diabetesDataConvertLeft, setDiabetesDataConvertLeft] =
    useState<any>(null);
  const [disableButton, setDisableButton] = useState<any>(false);
  const [diabetesDataConvertRight, setDiabetesDataConvertRight] =
    useState<any>(null);
  const leftEyeInputRef = useRef<any>(null);
  const rightEyeInputRef = useRef<any>(null);

  const handleLeftEyeChange = (e) => {
    const file = e.target.files[0];
    setLeftEyeImage(file);
    setLeftEyeImageUrl(URL.createObjectURL(file));
  };

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
    const bodyData = {
      ImageEyeLeft: diabetesDataRecheck.imageEyeLeft,
      ImageEyeRight: diabetesDataRecheck.imageEyeRight,
      ResultLeft: diabetesDataRecheck.resultLeft,
      ResultRight: diabetesDataRecheck.resultRight,
      Note: note,
      Userid: userId,
    };
    try {
      const response = await fetch(
        "http://localhost:5255/api/Diabetes/CreateDiabete",
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
        setDiabetesData(data);

        if (data.imageEyeRight != null) {
          const ConvertRight =
            data.resultRight === "ไม่เป็นเบาหวาน"
              ? []
              : JSON.parse(data.resultRight);
          setDiabetesDataConvertRight(ConvertRight || null);
        }

        if (data.imageEyeLeft != null) {
          const ConvertLeft =
            data.resultLeft === "ไม่เป็นเบาหวาน"
              ? []
              : JSON.parse(data.resultLeft);
          setDiabetesDataConvertLeft(ConvertLeft || null);
        }

        setDisableButton(true);
        window.location.reload();
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  const handleRecheck = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ImageEyeLeft", leftEyeImage);
    formData.append("ImageEyeRight", rightEyeImage);
    formData.append("Note", note);
    try {
      const response = await fetch(
        "http://localhost:5255/api/Diabetes/RecheckDiabete",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Upload success:", data);

        // Handle data
        setDiabetesData(data);

        setDiabetesDataRecheck(data);

        if (data.imageEyeRight != null) {
          const ConvertRight =
            data.resultRight === "ไม่เป็นเบาหวาน"
              ? []
              : JSON.parse(data.resultRight);
          setDiabetesDataConvertRight(ConvertRight || null);
        }

        if (data.imageEyeLeft != null) {
          const ConvertLeft =
            data.resultLeft === "ไม่เป็นเบาหวาน"
              ? []
              : JSON.parse(data.resultLeft);
          setDiabetesDataConvertLeft(ConvertLeft || null);
        }

        setDisableButton(true);
      } else {
        console.error("Upload failed:", response.statusText);
        // Handle other non-JSON responses
        const text = await response.text();
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  console.log("setDiabetesData", selectedUserDetail.resultLeft);

  const handleCancle = (e) => {
    setLeftEyeImage(null);
    setRightEyeImage(null);
    setNote("");
    setLeftEyeImageUrl("");
    setRightEyeImageUrl("");
    setDiabetesData(null);
    setDiabetesDataRecheck(null);
    setDiabetesDataConvertLeft(null);
    setDiabetesDataConvertRight(null);
    setDisableButton(false);
    if (leftEyeInputRef.current) leftEyeInputRef.current.value = null;
    if (rightEyeInputRef.current) rightEyeInputRef.current.value = null;
  };

  return (
    <div style={{ width: "100%", padding: 35, backgroundColor: "#fff" }}>
      {selectedUserDetail.id ? (
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
              <img
                src={selectedUserDetail.imageEyeLeft}
                alt="Left Eye"
                style={{ width: 125, height: 125, marginTop: 10 }}
              />
            </div>

            <div style={{}}>
              <img
                src={selectedUserDetail.imageEyeRight}
                alt="Right Eye"
                style={{ width: 125, height: 125, marginTop: 10 }}
              />
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <textarea
              placeholder="หมายเหตุ"
              rows="4"
              cols="100"
              value={selectedUserDetail.note}
              disabled
            ></textarea>
          </div>

          <div style={{ width: "100%" }}>
            {selectedUserDetail && (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <p>
                  ตาซ้าย:{" "}
                  {selectedUserDetail ? (
                    selectedUserDetail.resultLeft === "ไม่เป็นเบาหวาน" ? (
                      <div>{selectedUserDetail.resultLeft}</div>
                    ) : selectedUserDetail.resultLeft === "ไม่มีรูปภาพ" ? (
                      <div>{selectedUserDetail.resultLeft}</div>
                    ) : (
                      <div>
                        {JSON.parse(selectedUserDetail.resultLeft).map(
                          (item) => (
                            <div>
                              <p key={item.Key} style={{ marginBottom: 4 }}>
                                {item.Key}
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  marginBottom: 20,
                                }}
                              >
                                <div
                                  style={{
                                    border: "1px solid #000",
                                    padding: "5px",
                                    width: 110,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: item.Value ? item.Value * 100 : 0,
                                      backgroundColor: "#02b01c",
                                      height: 20,
                                    }}
                                  ></div>
                                </div>
                                <span style={{ marginLeft: 10 }}>
                                  {(item.Value * 100).toFixed(3)}%
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )
                  ) : (
                    <>ไม่มีข้อมูล</>
                  )}
                </p>
                <p>
                  ตาขวา:{" "}
                  {selectedUserDetail ? (
                    selectedUserDetail.resultRight === "ไม่เป็นเบาหวาน" ? (
                      <div>{selectedUserDetail.resultRight}</div>
                    ) : selectedUserDetail.resultRight === "ไม่มีรูปภาพ" ? (
                      <div>{selectedUserDetail.resultRight}</div>
                    ) : (
                      <div>
                        {JSON.parse(selectedUserDetail.resultRight).map(
                          (item) => (
                            <div>
                              <p key={item.Key} style={{ marginBottom: 4 }}>
                                {item.Key}
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  marginBottom: 20,
                                }}
                              >
                                <div
                                  style={{
                                    border: "1px solid #000",
                                    padding: "5px",
                                    width: 110,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: item.Value ? item.Value * 100 : 0,
                                      backgroundColor: "#02b01c",
                                      height: 20,
                                    }}
                                  ></div>
                                </div>
                                <span style={{ marginLeft: 10 }}>
                                  {(item.Value * 100).toFixed(3)}%
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )
                  ) : (
                    <>ไม่มีข้อมูล</>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
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
              <span style={{ fontWeight: 600, fontSize: 25 }}>
                ตรวจสอบสภาพตา
              </span>
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
              }}
            >
              <div style={{width:'50%',paddingLeft:190}}>
                {leftEyeImageUrl && (
                  <img
                    src={leftEyeImageUrl}
                    alt="Left Eye"
                    style={{ width: 125, height: 125, marginTop: 10,borderRadius:10}}
                  />
                )}
              </div>

              <div style={{width:'50%',paddingLeft:200}}>
                {rightEyeImageUrl && (
                  <img
                    src={rightEyeImageUrl}
                    alt="Right Eye"
                    style={{ width: 125, height: 125, marginTop: 10,borderRadius:10}}
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

            <div className="file-input-wrapperleft">
              เลือกรูปภาพ
              <input
                type="file"
                onChange={handleLeftEyeChange}
                ref={leftEyeInputRef}
                disabled={disableButton}
                className="file-input"
              />
            </div>



            <div className="file-input-wrapperright">
              เลือกรูปภาพ
              <input
                type="file"
                onChange={handleRightEyeChange}
                ref={rightEyeInputRef}
                disabled={disableButton}
                className="file-input"
              />
            </div>
            
              {/* <input
                type="file"
                onChange={handleRightEyeChange}
                ref={rightEyeInputRef}
                disabled={disableButton}
              /> */}
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

            <div
              style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}
            >
              {disableButton ? (
                <div>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: "green",
                      marginRight: 25,
                      fontSize: 17,
                      fontWeight: 600,
                    }}
                  >
                    บันทึก
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleCancle}
                    style={{
                      backgroundColor: "#ff0000",
                      fontSize: 17,
                      fontWeight: 600,
                    }}
                  >
                    ยกเลิก
                  </Button>
                </div>
              ) : (
                <Button
                  type="submit"
                  onClick={handleRecheck}
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                  }}
                  disabled={!leftEyeImage && !rightEyeImage}
                >
                  ตรวจสอบ
                </Button>
              )}
            </div>

            <div style={{ width: "100%" }}>
              {diabetesData && (
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <p>
                    ตาซ้าย:{" "}
                    {diabetesDataConvertLeft
                      ? diabetesDataConvertLeft.length
                        ? diabetesDataConvertLeft.map((item) => (
                            <div>
                              <p key={item.Key} style={{ marginBottom: 4 }}>
                                {item.Key}
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  marginBottom: 20,
                                }}
                              >
                                <div
                                  style={{
                                    border: "1px solid #000",
                                    padding: "5px",
                                    width: 110,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: item.Value ? item.Value * 100 : 0,
                                      backgroundColor: "#02b01c",
                                      height: 20,
                                    }}
                                  ></div>
                                </div>
                                <span style={{ marginLeft: 10 }}>
                                  {(item.Value * 100).toFixed(3)}%
                                </span>
                              </div>
                            </div>
                          ))
                        : "ไม่เป็นเบาหวาน"
                      : "ไม่มีรูปภาพ"}
                  </p>
                  <p>
                    ตาขวา:{" "}
                    {diabetesDataConvertRight
                      ? diabetesDataConvertRight.length
                        ? diabetesDataConvertRight.map((item) => (
                            <div>
                              <p key={item.Key} style={{ marginBottom: 4 }}>
                                {item.Key}
                              </p>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  marginBottom: 20,
                                }}
                              >
                                <div
                                  style={{
                                    border: "1px solid #000",
                                    padding: "5px",
                                    width: 110,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: item.Value ? item.Value * 100 : 0,
                                      backgroundColor: "#02b01c",
                                      height: 20,
                                    }}
                                  ></div>
                                </div>
                                <span style={{ marginLeft: 10 }}>
                                  {(item.Value * 100).toFixed(3)}%
                                </span>
                              </div>
                            </div>
                          ))
                        : "ไม่เป็นเบาหวาน"
                      : "ไม่มีรูปภาพ"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default EyesCreate;
