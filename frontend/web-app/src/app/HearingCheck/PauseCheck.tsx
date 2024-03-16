import { Row, Col, notification } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../utils/RoutePath";
import { Card, Button } from 'antd';
import { FaCheck } from 'react-icons/fa';

function PauseCheck() {
  const navigate = useNavigate();

 

  const ear0 = localStorage.getItem("ear0");
  const ear1 = localStorage.getItem("ear1");
  const keyEarleft = localStorage.getItem("keyEarleft");
  const keyEarRight = localStorage.getItem("keyEarRight");
  const hasBothEars = ear0 && ear1;


  useEffect(() => {
    const hasRefreshed = localStorage.getItem("hasRefreshed");
    if (!hasRefreshed) {
      localStorage.setItem("hasRefreshed", true);
      window.location.reload();
    } else {
      localStorage.removeItem("hasRefreshed");
      if (hasBothEars) {
        handleSubmit();
      }
    }
  }, [hasBothEars]);


  const HandleGoCheck = () => {
    if(keyEarleft)
    {
      localStorage.setItem("ear1", "1");
      localStorage.removeItem('keyEarleft');
      localStorage.setItem("keyEarRight", '1');
    }
    if(keyEarRight){
      localStorage.setItem("ear0", "0");
      localStorage.removeItem('keyEarRight');
      localStorage.setItem("keyEarleft", '0');
    }
    navigate("/Check1000Hz");

    
  };

  function processHearing(item) {
    let total = 0;
    let count = 0;

    for (const key in item) {
      if (key.startsWith("v")) {
        total += item[key];
        count++;
      }
    }

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
  
      const frequencies = [250, 500, 1000, 2000, 4000, 6000, 8000];
  
      for (let i = 0; i < frequencies.length; i++) {
        const score = localStorage.getItem(
          `score${ear === 0 ? "Left" : "Right"}${i + 1}` // ปรับ i + 1 เพื่อให้ได้เลขเท่ากับ index + 1
        );
        item[`v${frequencies[i]}`] = parseInt(score) || 0;
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

        notification.success({
          message: "สำเร็จ",
          description: "ทำการบันทึกเสร็จสิ้น เรากำลังพาท่านกลับไป",
        });
        setTimeout(() => {
          navigate(RoutePath.userDetail(userId));
        });
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
        {/* {hasBothEars ? (
          <div style={{}}>
            <p>คุณได้ทำการตรวจเช็คทั้งสองข้างแล้ว</p>
            <div>
              <Button onClick={handleSubmit}>บันทึก</Button>
            </div>
          </div>
        ) : ( */}
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 'fit-content' }}>
        <Button
          style={{
            height: '100px',
            width: '220px',
            fontSize: '25px',
            fontWeight: 600,
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginBottom: '20px',
            marginTop:'20px',
            marginRight:'100px',
            marginLeft:'100px',
            
          }}
          onClick={HandleGoCheck}
        >
          ตรวจเช็คหู{ear0 ? 'ขวา' : 'ซ้าย'}
        </Button>

        <Button
  style={{
    height: '100px',
    width: '220px',
    fontWeight: 600,
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginBottom: '20px',
    marginTop:'20px',
    marginRight:'100px',
    marginLeft:'100px',
            fontSize: '25px',

  }}
>
   {ear1 ? '' : <FaCheck size={45}  />}
</Button>

          <div>
          <Button
          style={{
            height: '60px',
            width: '220px',
            fontSize: '25px',
            fontWeight: 600,
            backgroundColor: '#ff0000',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onClick={handleSubmit}
        >
          สิ้นสุดบทดสอบ
        </Button>
          </div>
      </Card>
    </div>
         {/* )} */}
      </Col>
    </Row>
  );
}

export default PauseCheck;
