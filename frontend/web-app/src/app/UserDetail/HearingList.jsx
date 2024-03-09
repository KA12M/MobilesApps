import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import { formatISODateToThaiDate } from "../../utils/dateFormat";

const HearingList = ({ hearings,setModeHearing }) => {

  const handleDetailEyes = (item) => {
    console.log("Goof", item);
    setModeHearing(item); 
  }
  return (
    <Card>
      <Card.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Card.Text style={{fontSize:18,fontWeight:700}}>ผลการทดสอบการได้ยิน</Card.Text>
        </div>
        <div>
          <Button  onClick={setModeHearing}>ตรวจสอบหู</Button>
        </div>
      </Card.Body>
      <Card.Body>
        <Table>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>รหัส</th>
              <th>วันที่</th>
              <th>ผล</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {hearings?.hearing?.value?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{formatISODateToThaiDate(item.createdAt)}</td>
                <td>
                  <Table style={{}}>
                    <thead>
                      <tr>
                        <th>หู</th>
                        <th>V250</th>
                        <th>V500</th>
                        <th>V1000</th>
                        <th>V2000</th>
                        <th>V4000</th>
                        <th>V8000</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.items.map((subItem) => (
                        <tr key={subItem.id}>
                          <td>{subItem.ear == 0 ? "ซ้าย" : "ขวา"}</td>
                          <td>{subItem.v250 > 500 ? "บอด" : subItem.v250}</td>
                          <td>{subItem.v500 > 500 ? "บอด" : subItem.v500}</td>
                          <td>{subItem.v1000 > 500 ? "บอด" : subItem.v1000}</td>
                          <td>{subItem.v2000 > 500 ? "บอด" : subItem.v2000}</td>
                          <td>{subItem.v4000 > 500 ? "บอด" : subItem.v4000}</td>
                          <td>{subItem.v8000 > 500 ? "บอด" : subItem.v8000}</td>

                          <td>{subItem.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default HearingList;
