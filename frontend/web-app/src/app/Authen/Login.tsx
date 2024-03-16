import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
import { Container, Button, Modal, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { DatePicker} from "antd";
import dayjs from "dayjs";
import th from "antd/lib/date-picker/locale/th_TH";
import { useStore } from "../../utils/store";
import { observer } from "mobx-react-lite";

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState()
  const [admin] = useState(1234)


  useEffect(() => {
    const storedUserId = localStorage.getItem('UserId');
    const storedUserAdmin = localStorage.getItem('UserAdmin');
    if (storedUserId) {
      navigate(`/user/${storedUserId}`);
    }
    if(storedUserAdmin) {
      navigate("/UserPage");
    }
  }, []);


  const handlePhone = (e) => {
    setPhone(e.target.value);
  };


  const handleLogin = async () => {
      if(phone == admin)
      {
        notification.success({
          message: 'สำเร็จ',
          description: 'เข้าสู่ระบบผู้ดูแลระบบเสร็จสิ้น',
        });
        setTimeout(() => {
        navigate("/UserPage");
        }, 3000);
      }
      else{
        try {
          const response = await axios.post(
            `http://localhost:5255/api/User/LoginByPhone?phone=${phone}`
          );
          const userid = response.data.id
            if(userid)
            {
              notification.success({
                message: 'สำเร็จ',
                description: 'เข้าสู่ระบบเสร็จสิ้น',
              });
              setTimeout(() => {
              navigate(`/user/${userid}`);
              }, 3000);
            }
            else{
              notification.error({
                message: 'ล้มเหลว',
                description: 'เข้าสู่ระบบล้มเหลว กรุณาเข้าสู่ระบบใหม่',
              });
            }
            console.log("response",response);
            
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการลบ:", error);
          
        }
      }
    }

    const handleRegister = () => {
      navigate("Register");
    }

    const { loadUsers, data, pagination, createUser } = useStore().useUserActions;

    const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

    const {
      register,
      handleSubmit,
      reset,
      formState: { isValid },
    } = useForm({ defaultValues: {} });

    function onSubmit(data) {
      console.log("data", data);
      createUser(data).then(() => {
        reset();
        handleClose();
        notification.success({
          message: 'สำเร็จ',
          description: 'สมัครสมาชิกเสร็จสิ้น',
        });
      });
    }

    const [selectedDate, setSelectedDate] = useState(null);

    console.log("selectedDate", selectedDate);
  
    const handleDateChange = (date) => {
      const localDate = dayjs(date).local().startOf("day").add(1, "day").toDate();
      setSelectedDate(localDate);
    };
    
  return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="formLogin">
        <div style={{display:'flex',justifyContent:'center'}}><p style={{fontSize:40,fontWeight:600}}>เข้าสู่ระบบ</p></div>
        <div className="flex-columnLogin">
          <label>เบอร์โทรศัพท์</label>
        </div>
        <div className="inputFormLogin">
          <svg
            height={20}
            viewBox="-64 0 512 512"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
          </svg>
          <input
            type="text"
            className="inputLogin"
            placeholder="กรุณาใส่เบอร์โทรศัพท์"
            value={phone}
            onChange={handlePhone}
          />
        </div>

        <button className="button-submitLogin" onClick={handleLogin}>เข้าสู่ระบบ</button>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <span>ยังไม่มีบัญชีใช่ไหม? <span onClick={handleShow} style={{ color: '#3946fd', fontWeight: 600,cursor:'pointer' }}>ลงทะเบียนเลย!</span></span>
      </div>


      <Modal show={show} onHide={handleClose} style={{ zIndex: 9999 }}>
        <Modal.Header closeButton>
          <Modal.Title>สมัครสมาชิก</Modal.Title>
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

        <div className="flex-rowLogin">
        </div>
      </div>
    </div>
  );
}

export default observer(Login);
