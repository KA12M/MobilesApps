import React from "react";
import { Card, Table } from "react-bootstrap";
import { formatISODateToThaiDate } from "../../utils/dateFormat";

const HearingList = ({ hearings }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>ผลการทดสอบการได้ยิน</Card.Text>
      </Card.Body>
      <Card.Body>
        <Table>
          <thead>
            <tr>
              <th>รหัส</th>
              <th>วันที่</th>
              <th>ผล</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {hearings.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{formatISODateToThaiDate(item.createdAt)}</td>
                <td>
                  <Table>
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
