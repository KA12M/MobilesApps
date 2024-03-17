import React, { useEffect } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { formatISODateToThaiDate } from "../../utils/dateFormat";
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import ExcelJS from 'exceljs';
import { useStore } from "../../utils/store";

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);

const HearingList = ({ hearings, setModeHearing }) => {


  const { loadHearing,user } =
  useStore().useUserDetailActions;

  console.log("hearings?.hearing?.value?",hearings?.hearing.value)

  const generateChartData = (items) => {
    const datasets = items.map((subItem, index) => {
      if (subItem.v250 !== 0 && subItem.v500 !== 0 && subItem.v1000 !== 0 && subItem.v2000 !== 0 &&
          subItem.v4000 !== 0 && subItem.v6000 !== 0 && subItem.v8000 !== 0) {
        const pointStyle = subItem.ear === 0 ? 'circle' : 'crossRot';
        const pointRadius = subItem.ear === 0 ? 5 : 10;
        const borderColor = subItem.ear === 0 ? '#f52020' : '#2d4cff';
        const backgroundColor = subItem.ear === 0 ? 'rgba(255, 255, 255, 0.953)' : 'rgb(246, 246, 246)';
        const borderWidth = subItem.ear === 0 ? 3 : 3; // กำหนดความหนาของเส้นสำหรับกาบาท
        return {
          label: subItem.ear === 0 ? "หูซ้าย" : "หูขวา",
          data: [subItem.v250, subItem.v500, subItem.v1000, subItem.v2000, subItem.v4000, subItem.v6000, subItem.v8000],
          fill: false,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          pointStyle: pointStyle,
          pointRadius: pointRadius,
          tension: 0.1,
          borderWidth: borderWidth, 
          pointRotation: 0 
        };
      } else {
        return null; // ไม่สร้าง dataset ถ้า subItem.v เป็น 0
      }
    }).filter(dataset => dataset !== null); // กรอง dataset ที่ไม่มีค่า null
  
    return {
      labels: ['250', '500', '1000', '2000', '4000', '6000', '8000'],
      datasets: datasets
    };
  };
  

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'ระดับความถี่ (Hz)'
        }
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        title: {
          display: true,
          text: 'ระดับความดัง (Db)'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
        }
      }
    }
  };
  
  
  const sumValues = (subItem) => {
   const one = subItem.v500 + subItem.v1000 + subItem.v2000;
   return one / 3
  };

  const sumValuestwo = (subItem) => {
    const two = subItem.v500 + subItem.v1000 + subItem.v2000+ subItem.v4000;
    return two / 4
   };

   useEffect(() => {
      localStorage.removeItem('keyEarRight')
      localStorage.removeItem('keyEarleft')
   }, [])

   const exportToExcelAll = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Hearing Data');
    const userName = user.firstName + '' + user.lastName;
  
    const headerRow = worksheet.addRow([
      'รหัส','วันที่', 'หู', 'V250', 'V500', 'V1000', 'V2000', 'V4000', 'V6000', 'V8000', 'ผล'
    ]);
  
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'E8E8E8' },
      };
    });
  
    hearings?.hearing?.value?.forEach((item) => {
      item.items.forEach((subItem) => {
        worksheet.addRow([
          item.id ? item.id : '',
          formatISODateToThaiDate(item.createdAt),
          subItem.ear === 0 ? 'ซ้าย' : 'ขวา',
          subItem.v250,
          subItem.v500,
          subItem.v1000,
          subItem.v2000,
          subItem.v4000,
          subItem.v6000,
          subItem.v8000,
          subItem.result,
        ]);
      });
    });
  
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });
  
    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `hearing_data_all_${userName}.xlsx`;
  
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('ไม่สามารถสร้างไฟล์ Excel ได้');
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
        <div style={{display:'flex',flexDirection:'column'}}>
          <Button style={{ marginBottom: "10px",width:120,marginLeft:85}} onClick={setModeHearing}>ตรวจสอบหู</Button>
          <button className="download-button" >
  <div className="docs">
    <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth={2} stroke="currentColor" height={20} width={20} viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line y2={13} x2={8} y1={13} x1={16} />
      <line y2={17} x2={8} y1={17} x1={16} />
      <polyline points="10 9 9 9 8 9" />
    </svg>
    ดาวน์โหลดข้อมูลทั้งหมด
  </div>
  <div onClick={exportToExcelAll} className="download">
    <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth={2} stroke="currentColor" height={24} width={24} viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line y2={3} x2={12} y1={15} x1={12} />
    </svg>
  </div>
</button>
        </div>
      </Card.Body>
      <Card.Body>


          <div style={{display:'flex'}}>
<div style={{marginTop:-20,marginRight:50}}>
  <p>การแบ่งระดับความผิดปกติของการได้ยิน</p>
  <p>1.การได้ยินปรกติ (Normal Hearing)</p>
  <p>2.ระดับน้อย (Mild Hearing Loss)</p>
  <p>3.ระดับปานกลาง (Moderate Hearing Loss)</p>
</div>

<div style={{marginTop:20}}>
  <p>4.ระดับปานกลางค่อนข้างรุนแรง (Moderately Severe Hearing Loss)</p>
  <p>5.ระดับรุนแรง (Severe Hearing Loss)</p>
  <p>6.ระดับหูหนวก (Profound Hearing Loss)</p>
</div>
          </div>

        
        <Table>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{width:150}}>วันที่</th>
              <th style={{width:790}}>ผล</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {hearings?.hearing?.value?.map((item) => (
              <tr key={item.id}>
                <td>{formatISODateToThaiDate(item.createdAt)}</td>
                <td>
                  <Table >
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
                          <td>{subItem.v250 == 0 ? "-" :subItem.v250 == 91 ? "ไม่ได้ยิน" : subItem.v250}</td>
                          <td>{subItem.v500 ==0 ? "-" :subItem.v500 == 91 ? "ไม่ได้ยิน" : subItem.v500}</td>
                          <td>{subItem.v1000 == 0 ? "-" : subItem.v1000 == 91 ? "ไม่ได้ยิน" : subItem.v1000}</td>
                          <td>{subItem.v2000 == 0 ? "-" : subItem.v2000 == 91 ? "ไม่ได้ยิน" : subItem.v2000}</td>
                          <td>{subItem.v4000 == 0 ? "-" : subItem.v4000 == 91 ? "ไม่ได้ยิน" : subItem.v4000}</td>
                          <td>{subItem.v6000 == 0 ? "-" : subItem.v6000 == 91 ? "ไม่ได้ยิน" : subItem.v6000}</td>
                          <td>{subItem.v8000 == 0 ? "-" : subItem.v8000 == 91 ? "ไม่ได้ยิน" : subItem.v8000}</td>
                          <td>{subItem.v250 == 0 && subItem.v500 == 0 && subItem.v1000 == 0 && subItem.v2000 == 0 && subItem.v4000 == 0 && subItem.v6000 == 0 && subItem.v8000 == 0 ? '-': subItem.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {item.items.length > 0 && (
  <div>
    <p style={{fontSize:20,fontWeight:600}}>กราฟแสดงค่าทั้งหมด</p>
    <Line
      data={generateChartData(item.items)}
      options={options}
    />
  </div>
)}


                  <div>
                      <p>ผลสรุป</p>
                      {item.items.map((subItem) => (
  <div key={subItem.id}>
    {subItem.v250 !== 0 && subItem.v500 !== 0 && subItem.v1000 !== 0 && subItem.v2000 !== 0 &&
    subItem.v4000 !== 0 && subItem.v6000 !== 0 && subItem.v8000 !== 0 && (
      <p style={{ fontSize: 17 }}>
        - {subItem.ear === 0 ? "1.หูข้างซ้าย" : "1.หูข้างขวา"} ของท่านมีระดับการได้ยิน
        {sumValues(subItem) >= -10 && sumValues(subItem) <= 25 && <span>การได้ยินปรกติ</span>}
        {sumValues(subItem) > 25 && sumValues(subItem) <= 41 && <span>ระดับน้อย</span>}
        {sumValues(subItem) > 41 && sumValues(subItem) <= 56 && <span>ระดับปานกลาง</span>}
        {sumValues(subItem) > 56 && sumValues(subItem) <= 71 && <span>ระดับปานกลางค่อนข้างรุนแรง</span>}
        {sumValues(subItem) > 71 && sumValues(subItem) <= 90 && <span>ระดับรุนแรง</span>}
        {sumValues(subItem) > 90 && <span>ระดับหูหนวก</span>}
      </p>
    )}
  </div>
))}



{item.items.map((subItem) => (
  <div key={subItem.id}>
    {subItem.v250 !== 0 && subItem.v500 !== 0 && subItem.v1000 !== 0 && subItem.v2000 !== 0 &&
    subItem.v4000 !== 0 && subItem.v6000 !== 0 && subItem.v8000 !== 0 && (
      <p style={{ fontSize: 17 }}>
        - {subItem.ear === 0 ? "2.หูข้างซ้าย" : "2.หูข้างขวา"} ของท่านมีระดับการได้ยิน
        {sumValuestwo(subItem) > 25 ? '  ที่มีความดังมากกว่า 25 dB  ท่านควรไปพบแพทย์' : 'ท่านอยู่ในระดับปกติ'}
      </p>
    )}
  </div>
))}

                  </div>

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
