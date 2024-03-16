import { Button, Card, Table,DropdownButton, Dropdown } from "react-bootstrap";
import { formatISODateToThaiDate } from "../../utils/dateFormat";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useStore } from "../../utils/store";
import { notification } from 'antd';
import ExcelJS from 'exceljs';

const EyesList = ({setMode,hearings}) => {


  const { loadHearing,user } =
  useStore().useUserDetailActions;
 
  console.log("useruser",hearings)

  const handleDetailEyes = (item) => {
    console.log("Goof", item);
    setMode(item); 
  }

  const handleDelete = async (item) => {
    const swalOptions = {
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบรายการนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบทิ้ง',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    };
    const result = await Swal.fire(swalOptions);
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5255/api/Diabetes/RemoveDiabete?eyeId=${item.id}`);
        notification.success({
          message: 'สำเร็จ',
          description: 'ลบข้อมูลการตรวจตาเสร็จสิ้น',
        });
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบ:', error);
        Swal.fire('ข้อผิดพลาด!', 'มีบางอย่างผิดพลาดในการลบรายการ', 'error');
      }
      loadHearing(user.id)
    }
  
  };

  const tableHeaderStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#007bff",
    color: "#ffffff"
  };
  const tableHeaderfixStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#007bff",
    color: "#ffffff",
    width:'300px'
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
  

  console.log("user",user)

  const exportToExcel = async (selectedId) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Eyes Data');
    const userName = user.firstName + ' ' + user.lastName;
  
    // Add header row
    const headerRow = worksheet.addRow(['วันที่', 'รูปภาพตาซ้าย', 'รูปภาพตาขวา', 'หมายเหตุ', 'ผลลัพธ์ตาซ้าย', 'ผลลัพธ์ตาขวา']);
  
    // Formatting header row
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'E8E8E8' },
  
      };
    });
  
    // Add data rows
    hearings?.diabetes?.value?.forEach((item) => {
      if (item.id === selectedId) {
        worksheet.addRow([
          formatISODateToThaiDate(item.createdAt),
          item.imageEyeLeft ? item.imageEyeLeft : 'ไม่มีรูปภาพ',
          item.imageEyeRight ? item.imageEyeRight : 'ไม่มีรูปภาพ',
          item.resultLeft ? item.resultLeft : '',
          item.resultRight ? item.resultRight : '',
          item.note ? item.note : '',
        ]);
      }
    });
  
    // Set column widths (optional)
    worksheet.columns.forEach((column) => {
      column.width = 25;
    });
  
    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `eyes_data_single_${userName}.xlsx`;
  
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

  const exportToExcelAll = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Eyes Data');
    const userName = user.firstName + '' + user.lastName;
  
    // Add header row
    const headerRow = worksheet.addRow(['วันที่', 'รูปภาพตาซ้าย', 'รูปภาพตาขวา', 'หมายเหตุ', 'ผลลัพธ์ตาซ้าย', 'ผลลัพธ์ตาขวา']);
  
    // Formatting header row
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'E8E8E8' },

      };
    });
  
    // Add data rows
    hearings?.diabetes?.value?.forEach((item) => {
      worksheet.addRow([
        formatISODateToThaiDate(item.createdAt),
        item.imageEyeLeft ? item.imageEyeLeft : 'ไม่มีรูปภาพ',
        item.imageEyeRight ? item.imageEyeRight : 'ไม่มีรูปภาพ',
        item.resultLeft ? item.resultLeft : '',
        item.resultRight ? item.resultRight : '',
        item.note ? item.note : '',
      ]);
    });
  
    // Set column widths (optional)
    worksheet.columns.forEach((column) => {
      column.width = 25;
    });
  
    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `eyes_data_all_${userName}.xlsx`;
  
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
          <Card.Text style={{fontSize:18,fontWeight:700}}>ผลการทดสอบการมองเห็น</Card.Text>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column" }}>
  <Button onClick={setMode} style={{ marginBottom: "10px",width:120,marginLeft:85}}>ตรวจสอบตา</Button>
  <button className="download-button" >
  <div className="docs"><svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth={2} stroke="currentColor" height={20} width={20} viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line y2={13} x2={8} y1={13} x1={16} /><line y2={17} x2={8} y1={17} x1={16} /><polyline points="10 9 9 9 8 9" /></svg> ดาวน์โหลดข้อมูลทั้งหมด</div>
  <div onClick={exportToExcelAll} className="download">
    <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth={2} stroke="currentColor" height={24} width={24} viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line y2={3} x2={12} y1={15} x1={12} /></svg>
  </div>
</button>

</div>


      </Card.Body>
      <Card.Body>
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
      return (
        <tr key={item.id} style={{ textAlign: "center" }}>
          <td style={tableCellStyle}>{formatISODateToThaiDate(item.createdAt)}</td>
          <td style={tableCellStyle}>
            {item.imageEyeLeft ? (
              <img src={item.imageEyeLeft} style={imageStyle} alt="Left Eye" />
            ) : (
              <span style={noImageStyle}>ไม่มีรูปภาพ</span>
            )}
          </td>
          <td style={tableCellStyle}>
            {item.imageEyeRight ? (
              <img src={item.imageEyeRight} style={imageStyle} alt="Right Eye" />
            ) : (
              <span style={noImageStyle}>ไม่มีรูปภาพ</span>
            )}
          </td>
          <td style={tableCellStyle}>{item.note}</td>
          <td style={tableCellStyle}>
            <DropdownButton title="เลือก" variant="secondary">
              <Dropdown.Item onClick={() => handleDelete(item)} >ลบ</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDetailEyes(item)}>รายละเอียด</Dropdown.Item>
              <Dropdown.Item onClick={() => exportToExcel(item.id)}>ดาวน์โหลดข้อมูล</Dropdown.Item>
            </DropdownButton>
          </td>
        </tr>
      );
    })}
  </tbody>
</Table>

      </Card.Body>
    </Card>
  );
};

export default EyesList;
