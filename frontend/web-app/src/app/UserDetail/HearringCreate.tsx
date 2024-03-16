import { Button, Row, Col } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AssessmentformList from './AssessmentformList';

function HearringCreate({setModeHearing,setModeAssess}) {
  const navigate = useNavigate();
  const [showFMHT, setShowFMHT] = useState(false);

  const HandleToCheck = () => {
  navigate("/EarSelect");
  }

  const toggleFMHT = () => {
    setShowFMHT(true);
  }
  // const HandleToAssessment = () => {
  //   navigate("/Assessmentform");
  //   window.scrollTo(0, 0); 
  //   }

  //   const HandleToAssessmentList = () => {
  //     // navigate("/AssessmentformList");
  //     window.scrollTo(0, 0);
  //     setModeAssess(true); 
  //   }

  return (
<div>
      <div style={{ paddingLeft: 50, paddingTop: 50 }}>
        <Button onClick={setModeHearing}>กลับ</Button>
      </div>
      {!showFMHT ? (
        <Row justify="center" align="middle" style={{ height: '60vh' }}>
          <Col flex={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Button onClick={HandleToCheck} style={{ height: 80, width: 200, fontSize: 20, fontWeight: 600, marginBottom: 40, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: '2px solid #ccc' }}>ทดสอบการได้ยิน</Button>
            <Button onClick={toggleFMHT} style={{ height: 80, width: 500, fontSize: 20, fontWeight: 600, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: '2px solid #ccc', marginBottom: 40 }}>แบบสอบถามการได้ยินห้านาทีฉบับภาษาไทย (FMHT)</Button>
          </Col>
        </Row>
      ) : (
        <AssessmentformList />
      )}
    </div>
  );
}

export default HearringCreate;
