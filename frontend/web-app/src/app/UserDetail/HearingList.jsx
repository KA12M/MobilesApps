import { useEffect, useRef, useState } from "react";
import { Button, Card, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { formatISODateToThaiDate } from "../../utils/dateFormat";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ExcelJS from "exceljs";
import { useStore } from "../../utils/store";
import PropTypes from "prop-types";
import html2pdf from "html2pdf.js";
import { notification } from "antd";
import agent from "../../hooks/api/agent";
import Swal from "sweetalert2";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement
);

const HearingList = ({ hearings, setModeHearing }) => {
  HearingList.propTypes = {
    hearings: PropTypes.shape({
      hearing: PropTypes.shape({
        value: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
    setModeHearing: PropTypes.func.isRequired,
  };

  const { loadHearing, user } = useStore().useUserDetailActions;

  console.log("hearings?.hearing?.value?", hearings?.hearing.value);

  const generateChartData = (items) => {
    const datasets = items
      .map((subItem) => {
        if (
          subItem.v250 !== 0 &&
          subItem.v500 !== 0 &&
          subItem.v1000 !== 0 &&
          subItem.v2000 !== 0 &&
          subItem.v4000 !== 0 &&
          subItem.v6000 !== 0 &&
          subItem.v8000 !== 0
        ) {
          const pointStyle = subItem.ear === 0 ? "crossRot" : "circle";
          const pointRadius = subItem.ear === 0 ? 13 : 10;
          const borderColor = subItem.ear === 0 ? "#2d4cff" : "#f52020";
          const backgroundColor =
            subItem.ear === 0
              ? "rgba(255, 255, 255, 0.953)"
              : "rgb(246, 246, 246)";
          const borderWidth = subItem.ear === 0 ? 3 : 3; 
          return {
            label: subItem.ear === 0 ? "หูซ้าย" : "หูขวา",
            data: [
              subItem.v250,
              subItem.v500,
              subItem.v1000,
              subItem.v2000,
              subItem.v4000,
              subItem.v6000,
              subItem.v8000,
            ],
            fill: false,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            pointStyle: pointStyle,
            pointRadius: pointRadius,
            borderWidth: borderWidth,
            pointRotation: 0,
          };
        } else {
          return null; 
        }
      })
      .filter((dataset) => dataset !== null); 

    return {
      labels: ["250", "500", "1000", "2000", "4000", "6000", "8000"],
      datasets: datasets,
    };
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "ระดับความถี่ (Hz)",
        },
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        title: {
          display: true,
          text: "ระดับความดัง (Db)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  const sumValues = (subItem) => {
    const one = subItem.v500 + subItem.v1000 + subItem.v2000;
    return one / 3;
  };

  const sumValuestwo = (subItem) => {
    const two = subItem.v500 + subItem.v1000 + subItem.v2000 + subItem.v4000;
    return two / 4;
  };

  useEffect(() => {
    localStorage.removeItem("keyEarRight");
    localStorage.removeItem("keyEarleft");
  }, []);

  const admin = localStorage.getItem("UserAdmin");

  const [hidenbutton, setHidenbutton] = useState(false);

  const exportToExcelAll = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Hearing Data");
    const userName = user.firstName + "" + user.lastName;

    const headerRow = worksheet.addRow([
      "รหัส",
      "วันที่",
      "หู",
      "V250",
      "V500",
      "V1000",
      "V2000",
      "V4000",
      "V6000",
      "V8000",
      "ผล",
    ]);

    headerRow.font = { bold: true };

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "E8E8E8" },
      };
    });

    hearings?.hearing?.value?.forEach((item) => {
      item.items.forEach((subItem) => {
        worksheet.addRow([
          item.id ? item.id : "",
          formatISODateToThaiDate(item.createdAt),
          subItem.ear === 0 ? "ซ้าย" : "ขวา",
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

    worksheet.eachRow({ includeEmpty: true }, function (row) {
      row.eachCell({ includeEmpty: true }, function (cell) {
        cell.alignment = { horizontal: "center" };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = `hearing_data_all_${userName}.xlsx`;

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("ไม่สามารถสร้างไฟล์ Excel ได้");
      }
    }
    notification.success({
      message: "สำเร็จ",
      description: "สร้างไฟล์ Excel สำเร็จ",
    });
  };

  const handleDelete = async (item) => {
    console.log("item", item);
    const swalOptions = {
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบรายการนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบทิ้ง",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    };
    const result = await Swal.fire(swalOptions);
    if (result.isConfirmed) {
      try {
        const test = await agent.hearing.delete(item);
        console.log("test", test);
        notification.success({
          message: "สำเร็จ",
          description: "ลบข้อมูลการทดสอบการได้ยินสร็จสิ้น",
        });
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลบ:", error);
        Swal.fire("ข้อผิดพลาด!", "มีบางอย่างผิดพลาดในการลบรายการ", "error");
      }
    }
    loadHearing(user.id);
  };

  const componentRef = useRef(null);

  const generatePDFAll = () => {
    const opt = {
      margin: [-15.5, -0.5, 0, 0],
      filename: "hearing_reportAll.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    setHidenbutton(true);

    new Promise((resolve, _) => {
      setTimeout(() => {
        resolve();
      }, 1000); 
    }).then(() => {
      componentRef.current.style.transform = "scale(0.8)";
      html2pdf()
        .from(componentRef.current)
        .set(opt)
        .save()
        .then(() => {
          componentRef.current.style.transform = "scale(1)";
          setHidenbutton(false);
          notification.success({
            message: "สำเร็จ",
            description: "สร้างไฟล์ PDF สำเร็จ",
          });
        });
    });
  };

  const exportToExcel = async (id) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Hearing Data");
    const userName = user.firstName + "" + user.lastName;

    const headerRow = worksheet.addRow([
      "รหัส",
      "วันที่",
      "หู",
      "V250",
      "V500",
      "V1000",
      "V2000",
      "V4000",
      "V6000",
      "V8000",
      "ผล",
    ]);

    headerRow.font = { bold: true };

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "E8E8E8" },
      };
    });
    const hearing = hearings?.hearing?.value?.find((item) => item.id === id);
    hearing?.items.forEach((subItem) => {
      worksheet.addRow([
        hearing.id ? hearing.id : "",
        formatISODateToThaiDate(hearing.createdAt),
        subItem.ear === 0 ? "ซ้าย" : "ขวา",
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

    worksheet.columns.forEach((column) => {
      column.width = 15;
    });

    worksheet.eachRow({ includeEmpty: true }, function (row) {
      row.eachCell({ includeEmpty: true }, function (cell) {
        cell.alignment = { horizontal: "center" };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = `hearing_databyId_${userName}.xlsx`;

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("ไม่สามารถสร้างไฟล์ Excel ได้");
      }
    }
  };

  const generatePDF = (itemId) => {
    console.log(itemId);
    const element = document.getElementById(itemId);
    const opt = {
      margin: -0.4,
      filename: "hearing_reportById.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    const downloadButton = document.querySelector("#downloadButton");

    if (downloadButton) {
      downloadButton.style.display = "none";
    }

    setHidenbutton(true);

    new Promise((resolve, _) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {
      downloadButton.style.display = "none";
      element.style.transform = "scale(0.8)";
      html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {
          if (downloadButton) {
            downloadButton.style.display = "block";
          }
          setHidenbutton(false);
          element.style.transform = "scale(1)";
          notification.success({
            message: "สำเร็จ",
            description: "สร้างไฟล์ PDF สำเร็จ",
          });
        });
    });
  };

  return (
    <div>
      <Card>
        <Card.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Card.Text style={{ fontSize: 18, fontWeight: 700 }}>
              ผลการทดสอบการได้ยิน
            </Card.Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              style={{ marginBottom: "10px", width: 120, marginLeft: 85 }}
              onClick={setModeHearing}
            >
              ตรวจสอบหู
            </Button>

            <div style={{ display: "flex", marginLeft: 5 }}>
              <DropdownButton
                title="ดาวน์โหลดข้อมูลทั้งหมด"
                variant="secondary"
              >
                <Dropdown.Item onClick={exportToExcelAll}>Excel</Dropdown.Item>
                <Dropdown.Item onClick={generatePDFAll}>PDF</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </Card.Body>
        <Card.Body
          ref={componentRef}
        >
          <Table style={{ border: "3px solid black" }}>
            <thead>
              <tr
                style={{ textAlign: "center", borderBottom: "2px solid black" }}
              >
                <th
                  style={{
                    width: 300,
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                  }}
                >
                  วันที่
                </th>
                <th
                  style={{
                    width: 730,
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                  }}
                >
                  ผล
                </th>
                <th style={{ borderBottom: "2px solid black" }}></th>
              </tr>
            </thead>
            <tbody>
              {hearings?.hearing?.value?.map((item) => (
                <tr key={item.id} id={item.id}>
                  <td style={{ fontSize: 17 }}>
                    {formatISODateToThaiDate(item.createdAt)}
                  </td>
                  <td>
                    <Table>
                      <thead>
                        <tr style={{ fontSize: 14 }}>
                          <th>หู</th>
                          <th>250Hz</th>
                          <th>500Hz</th>
                          <th>1000Hz</th>
                          <th>2000Hz</th>
                          <th>4000Hz</th>
                          <th>6000Hz</th>
                          <th>8000Hz</th>
                          <th>Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.items.map((subItem) => (
                          <tr key={subItem.id}>
                            <td
                              style={{
                                color: subItem.ear === 0 ? "blue" : "red",
                                fontWeight: 600,
                              }}
                            >
                              {subItem.ear === 0 ? "ซ้าย" : "ขวา"}
                            </td>
                            <td
                              style={{
                                color: subItem.ear === 0 ? "blue" : "red",
                                fontWeight: 600,
                              }}
                            >
                              {subItem.v250 == 0
                                ? "-"
                                : subItem.v250 == 91
                                ? "ไม่ได้ยิน"
                                : subItem.v250}
                            </td>
                            <td
                              style={{
                                color: subItem.ear === 0 ? "blue" : "red",
                                fontWeight: 600,
                              }}
                            >
                              {subItem.v500 == 0
                                ? "-"
                                : subItem.v500 == 91
                                ? "ไม่ได้ยิน"
                                : subItem.v500}
                            </td>
                            <td
                              style={{
                                color: subItem.ear === 0 ? "blue" : "red",
                                fontWeight: 600,
                              }}
                            >
                              {subItem.v1000 == 0
                                ? "-"
                                : subItem.v1000 == 91
                                ? "ไม่ได้ยิน"
                                : subItem.v1000}
                            </td>
                            <td
                              style={{
                                color: subItem.ear === 0 ? "blue" : "red",
                                fontWeight: 600,
                              }}
                            >
                              {subItem.v2000 == 0
                                ? "-"
                                : subItem.v2000 == 91
                                ? "ไม่ได้ยิน"
                                : subItem.v2000}
                            </td>
                            <td
                              style={{
                                color: subItem.ear === 0 ? "blue" : "red",
                                fontWeight: 600,
                              }}
                            >
                              {subItem.v4000 == 0
                                ? "-"
                                : subItem.v4000 == 91
                                ? "ไม่ได้ยิน"
                                : subItem.v4000}
                            </td>
                            <td
                              style={{
                                color: subItem.ear === 0 ? "blue" : "red",
                                fontWeight: 600,
                              }}
                            >
                              {subItem.v6000 == 0
                                ? "-"
                                : subItem.v6000 == 91
                                ? "ไม่ได้ยิน"
                                : subItem.v6000}
                            </td>
                            <td
                              style={{
                                color: subItem.ear === 0 ? "blue" : "red",
                                fontWeight: 600,
                              }}
                            >
                              {subItem.v8000 == 0
                                ? "-"
                                : subItem.v8000 == 91
                                ? "ไม่ได้ยิน"
                                : subItem.v8000}
                            </td>
                            <td
                              style={{
                                color: subItem.ear === 0 ? "blue" : "red",
                                fontWeight: 600,
                              }}
                            >
                              {subItem.v250 == 0 &&
                              subItem.v500 == 0 &&
                              subItem.v1000 == 0 &&
                              subItem.v2000 == 0 &&
                              subItem.v4000 == 0 &&
                              subItem.v6000 == 0 &&
                              subItem.v8000 == 0
                                ? "-"
                                : subItem.result}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {item.items.length > 0 && (
                      <div>
                        <p style={{ fontSize: 20, fontWeight: 600 }}>
                          กราฟการวัดระดับการได้ยิน
                        </p>
                        <Line
                          data={generateChartData(item.items)}
                          options={options}
                        />
                      </div>
                    )}

                    <div>
                      <div>
                        <Card.Text style={{ fontSize: 18, fontWeight: 700 }}>
                          ผลการทดสอบการได้ยิน
                        </Card.Text>
                      </div>

                      <div
                        style={{ display: "flex", marginTop: 30, width: 800 }}
                      >
                        <div style={{ marginTop: -20, marginRight: 50 }}>
                          <p>การแบ่งระดับความผิดปกติของการได้ยิน</p>
                          <p>1.การได้ยินปรกติ (Normal Hearing)</p>
                          <p>2.ระดับน้อย (Mild Hearing Loss)</p>
                          <p>3.ระดับปานกลาง (Moderate Hearing Loss)</p>
                        </div>

                        <div style={{ marginTop: 20 }}>
                          <p>
                            4.ระดับปานกลางค่อนข้างรุนแรง (Moderately Severe
                            Hearing Loss)
                          </p>
                          <p>5.ระดับรุนแรง (Severe Hearing Loss)</p>
                          <p>6.ระดับหูหนวก (Profound Hearing Loss)</p>
                        </div>
                      </div>

                      <p style={{ fontSize: 20, fontWeight: 600 }}>ผลสรุป</p>
                      {item.items.map((subItem) => (
                        <div key={subItem.id}>
                          {subItem.v250 !== 0 &&
                            subItem.v500 !== 0 &&
                            subItem.v1000 !== 0 &&
                            subItem.v2000 !== 0 &&
                            subItem.v4000 !== 0 &&
                            subItem.v6000 !== 0 &&
                            subItem.v8000 !== 0 && (
                              <p style={{ fontSize: 17, fontWeight: 600 }}>
                                -{" "}
                                <span
                                  style={{
                                    color: subItem.ear === 0 ? "blue" : "red",
                                  }}
                                >
                                  {subItem.ear === 0
                                    ? "1.หูข้างซ้าย"
                                    : "1.หูข้างขวา"}
                                </span>
                                <span
                                  style={{
                                    color: subItem.ear === 0 ? "blue" : "red",
                                  }}
                                >
                                  ของท่านมีระดับการได้ยิน
                                </span>
                                {sumValues(subItem) >= -10 &&
                                  sumValues(subItem) <= 25 && (
                                    <span
                                      style={{
                                        color:
                                          subItem.ear === 0 ? "blue" : "red",
                                      }}
                                    >
                                      การได้ยินปรกติ
                                    </span>
                                  )}
                                {sumValues(subItem) > 25 &&
                                  sumValues(subItem) <= 41 && (
                                    <span
                                      style={{
                                        color:
                                          subItem.ear === 0 ? "blue" : "red",
                                      }}
                                    >
                                      ระดับน้อย
                                    </span>
                                  )}
                                {sumValues(subItem) > 41 &&
                                  sumValues(subItem) <= 56 && (
                                    <span
                                      style={{
                                        color:
                                          subItem.ear === 0 ? "blue" : "red",
                                      }}
                                    >
                                      ระดับปานกลาง
                                    </span>
                                  )}
                                {sumValues(subItem) > 56 &&
                                  sumValues(subItem) <= 71 && (
                                    <span
                                      style={{
                                        color:
                                          subItem.ear === 0 ? "blue" : "red",
                                      }}
                                    >
                                      ระดับปานกลางค่อนข้างรุนแรง
                                    </span>
                                  )}
                                {sumValues(subItem) > 71 &&
                                  sumValues(subItem) <= 90 && (
                                    <span
                                      style={{
                                        color:
                                          subItem.ear === 0 ? "blue" : "red",
                                      }}
                                    >
                                      ระดับรุนแรง
                                    </span>
                                  )}
                                {sumValues(subItem) > 90 && (
                                  <span
                                    style={{
                                      color: subItem.ear === 0 ? "blue" : "red",
                                    }}
                                  >
                                    ระดับหูหนวก
                                  </span>
                                )}
                              </p>
                            )}
                        </div>
                      ))}

                      {item.items.map((subItem) => (
                        <div key={subItem.id}>
                          {subItem.v250 !== 0 &&
                            subItem.v500 !== 0 &&
                            subItem.v1000 !== 0 &&
                            subItem.v2000 !== 0 &&
                            subItem.v4000 !== 0 &&
                            subItem.v6000 !== 0 &&
                            subItem.v8000 !== 0 && (
                              <p
                                style={{
                                  fontSize: 17,
                                  color: subItem.ear === 0 ? "blue" : "red",
                                  fontWeight: 600,
                                }}
                              >
                                -{" "}
                                {subItem.ear === 0
                                  ? "2.หูข้างซ้าย"
                                  : "2.หูข้างขวา"}{" "}
                                ของท่านมีระดับการได้ยิน
                                {sumValuestwo(subItem) > 25
                                  ? "  ที่มีความดังมากกว่า 25 dB  ท่านควรไปพบแพทย์"
                                  : "ท่านอยู่ในระดับปกติ"}
                              </p>
                            )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div
                      id="downloadButton"
                      style={{ display: hidenbutton ? "none" : "block" }}
                    >
                      <DropdownButton title="เลือก" variant="secondary">
                        {admin && (
                          <Dropdown.Item onClick={() => handleDelete(item.id)}>
                            ลบ
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item onClick={() => exportToExcel(item.id)}>
                          ดาวน์โหลดข้อมูล Excel
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => generatePDF(item.id)}>
                          ดาวน์โหลดข้อมูล PDF
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </td>

                  {/* <td>{item.note}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div className="responsivehearinglist"></div>
    </div>
  );
};

export default HearingList;
