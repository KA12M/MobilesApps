import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStore } from "../../utils/store";
import { formatISODateToThaiDate } from "./../../utils/dateFormat";
import { RoutePath } from "./../../utils/RoutePath";
import Swal from "sweetalert2";
import axios from "axios";
import { DatePicker, Table, notification } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import th from "antd/lib/date-picker/locale/th_TH";
import { useLocation } from "react-router-dom";
import agent from "../../hooks/api/agent";

dayjs.extend(utc);

const UserPage = () => {
  const navigate = useNavigate();

  const { loadUsers, data, createUser } = useStore().useUserActions;

  const [show, setShow] = useState(false);

  const location = useLocation();
  const locationData = location.state?.userData;

  console.log("locationData", locationData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ defaultValues: {} });

  useEffect(() => {
    loadUsers();
    localStorage.removeItem("UserId");
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onSubmit(data) {
    console.log("data", data);
    createUser(data).then(() => {
      reset();
      handleClose();
      notification.success({
        message: "สำเร็จ",
        description: "สมัครสมาชิกเสร็จสิ้น",
      });
    });
  }

  useEffect(() => {
    localStorage.setItem("UserAdmin", "1");
  }, []);

  const [sortOrder, setSortOrder] = useState("asc");
  const [idSortOrder, setIdSortOrder] = useState("asc");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    (user) =>
      (user.firstName &&
        (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (user.lastName &&
        (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (user.phone &&
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.id.toString().includes(searchTerm.toLowerCase())
  );

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
        // await axios.delete(
        //   `http://localhost:5255/api/User/RemoveUser?userId=${item}`
        // );
        await agent.user.deleteUser(item)
        notification.success({
          message: "สำเร็จ",
          description: "ลบสมาชิกเสร็จสิ้น",
        });
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลบ:", error);
        Swal.fire("ข้อผิดพลาด!", "มีบางอย่างผิดพลาดในการลบรายการ", "error");
      }
      loadUsers();
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);

  console.log("selectedDate", selectedDate);

  const handleDateChange = (date) => {
    const localDate = dayjs(date).local().startOf("day").add(1, "day").toDate();
    setSelectedDate(localDate);
  };

  const logout = () => {
    localStorage.clear();
    navigate(RoutePath.home);
  };

  const columns = [
    {
      title: "รหัส",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => (idSortOrder === "asc" ? a.id - b.id : b.id - a.id),
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        const nameA = (a.firstName || "").toUpperCase();
        const nameB = (b.firstName || "").toUpperCase();
        if (nameA < nameB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      },
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "วันเกิด",
      dataIndex: "birthday",
      key: "birthday",
      render: (text, record) => formatISODateToThaiDate(record.birthday),
    },
    {
      title: "อายุ",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "หมายเหตุ",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "อื่นๆ",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <DropdownButton title="เลือก" variant="secondary">
          <Dropdown.Item onClick={() => handleDelete(record.id)}>
            ลบ
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={RoutePath.userDetail(record.id)}>
            รายละเอียด
          </Dropdown.Item>
        </DropdownButton>
      ),
    },
  ];

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

        <Button className="mb-2" variant="warning" onClick={logout}>
          ออกจากระบบ
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        // pagination={{
        //   current: pagination.currentPage,
        //   total: pagination.totalCount,
        //   pageSize: pagination.pageSize,
        //   onChange: (page, pageSize) => {
        //     loadUsers(page, pageSize);
        //   },
        // }}
        bordered
        rowKey="id"
      />

      {/* <PaginationWidget pagination={pagination} /> */}

      <Modal show={show} onHide={handleClose} style={{ zIndex: 9999 }}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มข้อมูลผู้ใช้</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit((data) =>
              onSubmit({ ...data, birthday: selectedDate })
            )}
          >
            <Form.Group className="mb-3">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                {...register("firstName", { required: true })}
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
                maxLength={10}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ zIndex: 999999 }}>
              <Form.Label>วันที่</Form.Label>
              <div style={{ zIndex: 999999 }}>
                <DatePicker
                  selected={selectedDate}
                  getPopupContainer={(trigger) => trigger.parentNode} // กันโดน modal ทับ
                  onChange={handleDateChange}
                  format="YYYY-MM-DD"
                  locale={th}
                  style={{ width: 180, height: 40 }}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button
                disabled={!isValid || !selectedDate}
                variant="success"
                type="submit"
              >
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
