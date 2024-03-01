import { Button, Card, Table,DropdownButton, Dropdown } from "react-bootstrap";
import { formatISODateToThaiDate } from "../../utils/dateFormat";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useStore } from "../../utils/store";

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
        await axios.delete(`http://localhost:5255/api/Diabetes?eyeId=${item.id}`);
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
    backgroundColor: "#f2f2f2",
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
        <div>
          <Button onClick={setMode}>ตรวจสอบตา</Button>
        </div>
      </Card.Body>
      <Card.Body>
      <Table style={{ borderCollapse: "collapse", width: "100%" }}>
  <thead style={{ backgroundColor: "#f2f2f2" }}>
    <tr style={{ textAlign: "center" }}>
      <th style={tableHeaderStyle}>รหัส</th>
      <th style={{ ...tableHeaderStyle, width: 150 }}>วันที่</th>
      <th style={tableHeaderStyle}>รูปภาพตาซ้าย</th>
      <th style={tableHeaderStyle}>รูปภาพตาขวา</th>
      <th style={tableHeaderStyle}>หมายเหตุ</th>
      <th style={tableHeaderStyle}>อื่นๆ</th>
    </tr>
  </thead>
  <tbody>
    {hearings?.diabetes?.value?.map((item) => {
      return (
        <tr key={item.id} style={{ textAlign: "center" }}>
          <td style={tableCellStyle}>{item.id}</td>
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
