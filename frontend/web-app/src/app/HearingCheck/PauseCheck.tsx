import { Button, Row, Col } from "antd";
import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

function PauseCheck() {
  const navigate = useNavigate();


  useEffect(() => {
    const hasRefreshed = localStorage.getItem('hasRefreshed');
    if (!hasRefreshed) {
      localStorage.setItem('hasRefreshed', true);
      window.location.reload();
    } else {
      localStorage.removeItem('hasRefreshed');
    }
}, []);


  const ear0 = localStorage.getItem("ear0");
  const ear1 = localStorage.getItem("ear1");
  const hasBothEars = ear0 && ear1;

  const HandleGoCheck = () => {
    if(ear0){
    localStorage.setItem("ear1", '1');
    }else{
    localStorage.setItem("ear0", '0');
    }
    navigate("/Check1000Hz");
  }


  
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
<Row justify="center" align="middle" style={{ height: "60vh" }}>
      <Col
        flex={1}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* หากมี ear0 และ ear1 อยู่แล้ว */}
        {hasBothEars ? (
          <div style={{}}>
            <p>คุณได้ทำการตรวจเช็คทั้งสองข้างแล้ว</p>
          </div>
        ) : (
          // หากยังไม่มี ear0 หรือ ear1
          <div>
            <Button
              style={{
                height: 80,
                width: 200,
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 40,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                border: "2px solid #ccc",
              }}
              onClick={HandleGoCheck}
            >
              ตรวจเช็คหู{ear0 ? "ขวา" : "ซ้าย"}
            </Button>
            <Button
              style={{
                height: 80,
                width: 200,
                fontSize: 20,
                fontWeight: 600,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                border: "2px solid #ccc",
              }}
              
              onClick={handleSubmit}
            >
              บันทึกการตรวจ
            </Button>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default PauseCheck;
