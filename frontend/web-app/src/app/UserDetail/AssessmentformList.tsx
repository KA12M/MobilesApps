import React from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

const AssessmentformList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "อาชีพ",
      dataIndex: "occupation",
      key: "occupation",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      occupation: "Developer",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      occupation: "Designer",
    },
  ];

  const HandleToAssessment = () => {
    navigate("/Assessmentform");
    window.scrollTo(0, 0); 
    }

  return (
    <div style={{ padding: 30, position: "relative" }}>
      <Button onClick={HandleToAssessment} style={{ position: "absolute", top: -30, right: 30 }}>เพิ่มทดสอบการประเมิน</Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default AssessmentformList;
