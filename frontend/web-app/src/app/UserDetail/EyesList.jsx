import { Button, Card, Table, DropdownButton, Dropdown } from "react-bootstrap";
import { formatISODateToThaiDate } from "../../utils/dateFormat";
import Swal from "sweetalert2";
import axios from "axios";
import { useStore } from "../../utils/store";
import { notification } from "antd";
import ExcelJS from "exceljs";
import PropTypes from "prop-types";
import agent, { pathServer } from "../../hooks/api/agent";
import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

const EyesList = ({ setMode, hearings }) => {
  EyesList.propTypes = {
    setMode: PropTypes.func.isRequired,
    hearings: PropTypes.shape({
      diabetes: PropTypes.object,
    }).isRequired,
  };

  const { loadHearing, user } = useStore().useUserDetailActions;

  const handleDetailEyes = (item) => {
    console.log("Goof", item);
    setMode(item);
  };

  const handleDelete = async (item) => {
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
        await agent.eye.delete(item.id);
        notification.success({
          message: "สำเร็จ",
          description: "ลบข้อมูลการตรวจตาเสร็จสิ้น",
        });
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลบ:", error);
        Swal.fire("ข้อผิดพลาด!", "มีบางอย่างผิดพลาดในการลบรายการ", "error");
      }
      loadHearing(user.id);
    }
  };

  const [hidenbutton, setHidenbutton] = useState(false);
  const componentRef = useRef(null);

  const generatePDFAll = () => {
    const opt = {
      margin: [0, 0, 0, 0],
      filename: "Eye_reportAll.pdf",
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


  const generatePDF = (itemId) => {
    console.log(itemId);
    const element = document.getElementById(itemId);
    const opt = {
      margin: [0.2, 0, 0, 0],

      filename: "Eye_reportById.pdf",
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

  const tableHeaderStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#007bff",
    color: "#ffffff",
  };
  const tableHeaderfixStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#007bff",
    color: "#ffffff",
    width: "300px",
  };

  const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  const imageStyle = {
    width: 150,
    borderRadius: "10px",
  };

  const noImageStyle = {
    fontSize: 20,
    fontWeight: 700,
  };

  console.log("user", user);

  const exportToExcel = async (selectedId) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Eyes Data");
    const userName = user.firstName + " " + user.lastName;

    const headerRow = worksheet.addRow([
      "ไอดี",
      "วันที่",
      "รูปภาพตาซ้าย",
      "รูปภาพตาขวา",
      "ผลลัพธ์ตาซ้าย",
      "ผลลัพธ์ตาขวา",
      "หมายเหตุ",
    ]);

    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "E8E8E8" },
      };
    });

    hearings?.diabetes?.value?.forEach((item) => {
      if (item.id === selectedId) {
        const leftEyeResults = item.imageEyeLeft
          ? JSON.parse(item.resultLeft)
          : [];
        const formattedLeftEyeResult = leftEyeResults
          .map((result) => `${result.Key}: ${result.Value.toFixed(3)}`)
          .join("\n");

        const rightEyeResults = item.imageEyeRight
          ? JSON.parse(item.resultRight)
          : [];
        const formattedRightEyeResult = rightEyeResults
          .map((result) => `${result.Key}: ${result.Value.toFixed(3)}`)
          .join("\n");

        const currentRow = worksheet.addRow([
          item.id ? item.id : "",
          formatISODateToThaiDate(item.createdAt),
          "",
          "",
          formattedLeftEyeResult,
          formattedRightEyeResult,
          item.note ? item.note : "",
        ]);

        if (item.imageEyeLeft) {
          const leftEyeImage = workbook.addImage({
            base64: item.imageEyeLeft,
            extension: "png",
          });
          worksheet.addImage(leftEyeImage, {
            tl: { col: 2, row: currentRow.number - 1 },
            ext: { width: 100, height: 100 },
          });
        }

        if (item.imageEyeRight) {
          const rightEyeImage = workbook.addImage({
            base64: item.imageEyeRight,
            extension: "png",
          });
          worksheet.addImage(rightEyeImage, {
            tl: { col: 3, row: currentRow.number - 1 },
            ext: { width: 100, height: 100 },
          });
        }
      }
    });

    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    worksheet.eachRow((row) => {
      row.height = 115;
    });

    worksheet.eachRow({ includeEmpty: true }, function (row) {
      row.eachCell({ includeEmpty: true }, function (cell) {
        cell.alignment = { horizontal: "center" };
      });
    });

    headerRow.height = 35;

    worksheet.getColumn(1).width = 10;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 13.8;
    worksheet.getColumn(4).width = 13.8;
    worksheet.getColumn(5).width = 23;
    worksheet.getColumn(6).width = 23;
    worksheet.getColumn(7).width = 65;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = `eyes_databyId_${userName}.xlsx`;

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

  const exportToExcelAll = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Eyes Data");
    const userName = user.firstName + " " + user.lastName;

    const headerRow = worksheet.addRow([
      "ไอดี",
      "วันที่",
      "รูปภาพตาซ้าย",
      "รูปภาพตาขวา",
      "ผลลัพธ์ตาซ้าย",
      "ผลลัพธ์ตาขวา",
      "หมายเหตุ",
    ]);

    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "E8E8E8" },
      };
    });

    for (const item of hearings?.diabetes?.value || []) {
      if (item.imageEyeLeft || item.imageEyeRight) {
        const leftEyeResults = item.imageEyeLeft
          ? JSON.parse(item.resultLeft)
          : [];
        const formattedLeftEyeResult = leftEyeResults
          .map((result) => `${result.Key}: ${result.Value.toFixed(3)}`)
          .join("\n");

        const rightEyeResults = item.imageEyeRight
          ? JSON.parse(item.resultRight)
          : [];
        const formattedRightEyeResult = rightEyeResults
          .map((result) => `${result.Key}: ${result.Value.toFixed(3)}`)
          .join("\n");

        const currentRow = worksheet.addRow([
          item.id ? item.id : "",
          formatISODateToThaiDate(item.createdAt),
          "",
          "",
          formattedLeftEyeResult,
          formattedRightEyeResult,
          item.note ? item.note : "",
        ]);

        if (item.imageEyeLeft) {
          const leftEyeImage = workbook.addImage({
            base64: item.imageEyeLeft,
            extension: "png",
          });
          worksheet.addImage(leftEyeImage, {
            tl: { col: 2, row: currentRow.number - 1 },
            ext: { width: 100, height: 100 },
          });
        }

        if (item.imageEyeRight) {
          const rightEyeImage = workbook.addImage({
            base64: item.imageEyeRight,
            extension: "png",
          });
          worksheet.addImage(rightEyeImage, {
            tl: { col: 3, row: currentRow.number - 1 },
            ext: { width: 100, height: 100 },
          });
        }
      }
    }

    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    worksheet.eachRow((row) => {
      row.height = 115;
    });

    worksheet.eachRow({ includeEmpty: true }, function (row) {
      row.eachCell({ includeEmpty: true }, function (cell) {
        cell.alignment = { horizontal: "center" };
      });
    });

    headerRow.height = 35;

    worksheet.getColumn(1).width = 10;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 13.8;
    worksheet.getColumn(4).width = 13.8;
    worksheet.getColumn(5).width = 23;
    worksheet.getColumn(6).width = 23;
    worksheet.getColumn(7).width = 65;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const fileName = `eyes_data_all_${userName}.xlsx`;

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

  const admin = localStorage.getItem("UserAdmin");



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
              ผลการตรวจโรคเบาหวานเข้าจอประสาทตา
            </Card.Text>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              onClick={setMode}
              style={{ marginBottom: "10px", width: 120, marginLeft: 85 }}
            >
              ตรวจสอบตา
            </Button>
            {/* <button
              className="download-button"
              style={{
                display: hearings?.diabetes?.value?.length ? "block" : "none",
              }}
            >
              <div className="docs">
                <svg
                  className="css-i6dzq1"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                  strokeWidth={2}
                  stroke="currentColor"
                  height={20}
                  width={20}
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line y2={13} x2={8} y1={13} x1={16} />
                  <line y2={17} x2={8} y1={17} x1={16} />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                ดาวน์โหลดข้อมูลทั้งหมด
              </div>
              <div onClick={exportToExcelAll} className="download">
                <svg
                  className="css-i6dzq1"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                  strokeWidth={2}
                  stroke="currentColor"
                  height={24}
                  width={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line y2={3} x2={12} y1={15} x1={12} />
                </svg>
              </div>
              
            </button> */}
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
        <Card.Body ref={componentRef} >
          <Table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead style={{ backgroundColor: "#f2f2f2" }}>
              <tr style={{ textAlign: "center" }}>
                <th style={{ ...tableHeaderStyle, width: 150 }}>วันที่</th>
                <th style={tableHeaderStyle}>รูปภาพตาซ้าย</th>
                <th style={tableHeaderStyle}>รูปภาพตาขวา</th>
                <th style={tableHeaderfixStyle}>หมายเหตุ</th>
                <th style={tableHeaderStyle}>อื่นๆ</th>
              </tr>
            </thead>
            <tbody>
              {hearings?.diabetes?.value?.map((item) => {
                const leftEyeColor = item?.imageEyeLeft ? "green" : "red";
                const rightEyeColor = item?.imageEyeRight ? "green" : "red";
                const leftEyeNote = item?.imageEyeLeft
                  ? "เบาหวาน ควรพบแพทย์"
                  : "ไม่มีรูปภาพ"; 
                const rightEyeNote = item?.imageEyeRight
                  ? "เบาหวาน ควรพบแพทย์"
                  : "ไม่มีรูปภาพ"; 

                return (
                  <tr key={item?.id} style={{ textAlign: "center" }}  id={item?.id}>
                    <td style={tableCellStyle}>
                      {formatISODateToThaiDate(item?.createdAt)}
                    </td>
                    <td style={tableCellStyle}>
                      {item?.imageEyeLeft ? (
                        <img
                          src={item?.imageEyeLeft}
                          style={imageStyle}
                          alt="Left Eye"
                        />
                      ) : (
                        <span style={{ ...noImageStyle, color: leftEyeColor }}>
                          {leftEyeNote}
                        </span>
                      )}
                    </td>
                    <td style={tableCellStyle}>
                      {item?.imageEyeRight ? (
                        <img
                          src={item?.imageEyeRight}
                          style={imageStyle}
                          alt="Right Eye"
                        />
                      ) : (
                        <span style={{ ...noImageStyle, color: rightEyeColor }}>
                          {rightEyeNote}
                        </span>
                      )}
                    </td>
                    <td style={tableCellStyle}>{item?.note}</td>
                    <td style={tableCellStyle}>
                      <div id="downloadButton" style={{ display: hidenbutton ? "none" : "block" }}>
                      <DropdownButton title="เลือก" variant="secondary">
                        {admin && (
                          <Dropdown.Item onClick={() => handleDelete(item)}>
                            ลบ
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item onClick={() => handleDetailEyes(item)}>
                          รายละเอียด
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => exportToExcel(item.id)}>
                          ดาวน์โหลดข้อมูล Excel
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => generatePDF(item.id)}>
                          ดาวน์โหลดข้อมูล PDF
                        </Dropdown.Item>
                      </DropdownButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div className="responsivehearinglist"></div>
    </div>
  );
};

export default EyesList;
