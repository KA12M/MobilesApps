import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import { formatISODateToThaiDate } from "../../utils/dateFormat";
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);

const HearingList = ({ hearings, setModeHearing }) => {

  const handleDetailEyes = (item) => {
    console.log("Goof", item);
    setModeHearing(item); 
  }

  console.log("hearings?.hearing?.value?",hearings?.hearing?.value)

  // Generate chart data for line chart
  const generateChartData = (subItem) => {
    return {
      labels: ['250', '500', '1000', '2000', '4000','6000', '8000'],
      datasets: [
        {
          label: 'ค่า V',
          data: [subItem.v250, subItem.v500, subItem.v1000, subItem.v2000, subItem.v4000,subItem.v6000, subItem.v8000],
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        }
      ]
    };
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'ระดับความถี่'
        }
      },
      y: {
        suggestedMin: 0, 
        suggestedMax: 1000, 
        title: {
          display: true,
          text: 'ระดับความดัง'
        }
      }
    }
  };
  
  
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
                        <th>V6000</th>
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
                          <td>{subItem.v6000 > 500 ? "บอด" : subItem.v6000}</td>
                          <td>{subItem.v8000 > 500 ? "บอด" : subItem.v8000}</td>
                          <td>{subItem.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {item.items.map((subItem) => (
                    <div key={subItem.id}>
                      <p style={{fontSize:20,fontWeight:600}}>กราฟแสดงค่า {subItem.ear == 0 ? "หูซ้าย" : "หูขวา"}</p>
                      <Line
                        data={generateChartData(subItem)}
                        options={options}
                      />
                    </div>
                  ))}
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
