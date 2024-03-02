import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStore } from "../../utils/store";
import PaginationWidget from "../../components/PaginationWidget";
import { formatISODateToThaiDate } from "./../../utils/dateFormat";
import { RoutePath } from "./../../utils/RoutePath";
import Swal from 'sweetalert2';
import axios from 'axios';
import DatePicker from "react-datepicker";

const UserPage = () => {
  const { loadUsers, data, pagination, createUser } = useStore().useUserActions;

  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ defaultValues: {} });

  useEffect(() => {
    loadUsers();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onSubmit(data) {
    console.log("data",data)
    
    createUser(data).then(() => {
      reset();
      handleClose();
    });
  }

  const [sortOrder, setSortOrder] = useState("asc");
  const [idSortOrder, setIdSortOrder] = useState("asc");

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleIdSort = () => {
    setIdSortOrder(idSortOrder === "asc" ? "desc" : "asc");
  };
  
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    (user) =>
      (user.firstName &&
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.lastName &&
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.phone &&
        user.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedData = filteredData.sort((a, b) => {
    const nameA = (a.firstName || "").toUpperCase();
    const nameB = (b.firstName || "").toUpperCase();
    if (nameA < nameB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (nameA > nameB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });
  

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
        await axios.delete(`http://localhost:5255/api/User/RemoveUser?userId=${item}`);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบ:', error);
        Swal.fire('ข้อผิดพลาด!', 'มีบางอย่างผิดพลาดในการลบรายการ', 'error');
      }
      loadUsers()
    }
  };
  
  const sortedDataId = filteredData.sort((a, b) => {
    if (idSortOrder === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
  
  
  const [selectedDate, setSelectedDate] = useState(null);

  console.log('selectedDate',selectedDate)

  return (
    <Container className="main pt-4">
      <div className="mb-4" style={{ width: "700", fontSize: 28 }}>
        ข้อมูลผู้ใช้งาน
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Group className="mb-0" style={{ width: "50%" }}>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="ค้นหาชื่อผู้ใช้..."
          />
        </Form.Group>

        <Button className="mb-2" variant="success" onClick={handleShow}>
          + เพิ่มข้อมูลผู้ใช้
        </Button>
      </div>

      {/* <Table striped bordered hover style={{ backgroundColor: "#f5f5f5" }}> */}
      <Table style={{ backgroundColor: "#f5f5f5" }}>
  <thead>
    <tr>
    <th onClick={handleIdSort} style={{ backgroundColor: "#007bff", color: "#ffffff", cursor: "pointer" }}>
  รหัส{" "}
  {sortedDataId === "asc" ? (
    <span style={{ float: "right" }}>▲</span>
  ) : (
    <span style={{ float: "right" }}>▼</span>
  )}
</th>

      <th onClick={handleSort} style={{ backgroundColor: "#007bff", color: "#ffffff", cursor: "pointer" }}>
        ชื่อ-นามสกุล{" "}
        {sortOrder === "asc" ? (
          <span style={{ float: "right" }}>▲</span>
        ) : (
          <span style={{ float: "right" }}>▼</span>
        )}
      </th>
      <th style={{ backgroundColor: "#007bff", color: "#ffffff" }}>เบอร์</th>
      <th style={{ backgroundColor: "#007bff", color: "#ffffff", width: 220 }}>วันเกิด</th>
      <th style={{ backgroundColor: "#007bff", color: "#ffffff" }}>อายุ</th>
      <th style={{ backgroundColor: "#007bff", color: "#ffffff" }}>หมายเหตุ</th>
      <th style={{ backgroundColor: "#007bff", color: "#ffffff" }}>อื่นๆ</th>
    </tr>
  </thead>
  <tbody>
    {sortedData.map((el) => (
      <tr key={el.id}>
        <td>{el.id}</td>
        <td>
            {el.firstName} {el.lastName}
        </td>
        <td>{el.phone}</td>
        <td>{formatISODateToThaiDate(el.birthday)}</td>
        {/* <td>{el.birthday}</td> */}
        <td>{el.age}</td>
        <td>{el.note}</td>
        <td>
          <DropdownButton title="เลือก" variant="secondary">


          
            <Dropdown.Item onClick={() =>handleDelete(el.id)}>ลบ</Dropdown.Item>


            <Dropdown.Item as={Link} to={RoutePath.userDetail(el.id)}>รายละเอียด</Dropdown.Item>



          </DropdownButton>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


      <PaginationWidget pagination={pagination} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มข้อมูลผู้ใช้</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                {...register("firstname", { required: true })}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                {...register("lastName", { required: true })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>เบอร์โทรศัพท์</Form.Label>
              <Form.Control
                {...register("phone", { required: true })}
                type="tel"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>วันที่</Form.Label>
              <br />
              <DatePicker
                selected={selectedDate} 
                onChange={(date) => setSelectedDate(date)}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>วันที่</Form.Label>
              <Form.Control
                {...register("birthday", { required: true })}
                type="text"
                value={selectedDate ? selectedDate.toISOString() : ""}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Button disabled={!isValid} variant="success" type="submit">
                บันทึก
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default observer(UserPage);
