import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { RoutePath } from "../../utils/RoutePath";
import { pathServer } from "../../hooks/api/agent";

const AssessmentformList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // const handleEdit = (i) => {
  //   console.log("handleEdit ",i)
  // }

  const columns = [
    {
      title: "เวลา",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          {dayjs(text).locale("th").format("DD MMMM YYYY ")}
        </div>
      ),
    },
    {
      title: "คะแนนการประเมิน",
      dataIndex: "result",
      key: "result",
      align: "center",
      render: (result) => (
        <div style={{ textAlign: "center" }}>{sumValues(result)}</div>
      ),
    },
    {
      title: "หมายเหตุ",
      dataIndex: "result",
      key: "result",
      align: "center",
      render: (result) => (
        <div style={{ textAlign: "center" }}>
          {sumValues(result) > 10 ? (
            <div>
              <p style={{ color: "red", fontWeight: "600" }}>
                ท่านควรไปพบแพทย์
              </p>
            </div>
          ) : (
            <div>
              <p style={{ color: "green", fontWeight: "600" }}>
                ท่านมีการได้ยินปกติ
              </p>
            </div>
          )}
        </div>
      ),
    },
    // {
    //   title: "แก้ไข",
    //   dataIndex: "result",
    //   key: "result",
    //   align: "center",
    //   render: (result, record) => (
    //     <div style={{ textAlign: "center" }}>
    //       <Button onClick={() => handleEdit(record)}>แก้ไข</Button>
    //     </div>
    //   ),
    // },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("UserId");
      try {
        const response = await axios.get(
          `${pathServer}FMHT/GetFMHTByUserId?userId=${userId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
      }
    };

    fetchData();
  }, []);

  const HandleToAssessment = () => {
    navigate(RoutePath.assessmentform);
    window.scrollTo(0, 0);
  };

  const sumValues = (result) => {
    let totalScore = 0;
    const resultArray = JSON.parse(result);
    resultArray.forEach((item) => {
      const value = parseInt(item.value);
      switch (value) {
        case 3:
          totalScore += 3;
          break;
        case 2:
          totalScore += 2;
          break;
        case 1:
          totalScore += 1;
          break;
        default:
          totalScore += 0;
      }
    });
    return totalScore;
  };

  return (
    <div style={{ padding: 30, position: "relative" }}>
      <Button
        onClick={HandleToAssessment}
        style={{ position: "absolute", top: -30, right: 30 }}
      >
        เพิ่มทดสอบการประเมิน
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default AssessmentformList;
