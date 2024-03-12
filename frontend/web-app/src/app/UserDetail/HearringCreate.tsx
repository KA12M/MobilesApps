import { Button, Row, Col } from 'antd';
import React from 'react';
import { useNavigate } from "react-router-dom";

function HearringCreate() {
  const navigate = useNavigate();


  const HandleToCheck = () => {
  navigate("/EarSelect");
  }

  const HandleToAssessment = () => {
    navigate("/Assessmentform");
    }

  return (
    <Row justify="center" align="middle" style={{ height: '60vh' }}>
      <Col flex={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Button onClick={HandleToCheck} style={{ height: 80, width: 200, fontSize: 20, fontWeight: 600, marginBottom: 40, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: '2px solid #ccc' }}>ตรวจเช็คการได้ยิน</Button>
        <Button onClick={HandleToAssessment} style={{ height: 80, width: 200, fontSize: 20, fontWeight: 600, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: '2px solid #ccc' }}>แบบประเมิน</Button>
      </Col>
    </Row>
  );
}

export default HearringCreate;
