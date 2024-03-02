import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../utils/store";
import { Badge, Button, Card, Container, ListGroup } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";

import { formatISODateToThaiDate } from "../../utils/dateFormat";
import HearingList from "./HearingList";
import EyesList from "./EyesList";
import EyesCreate from "./EyesCreate";

const UserDetailPage = () => {
  const { userId } = useParams();
  const [formMode, setFormMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const setMode = (item) => {
    setFormMode(!formMode);
    setSelectedUser(item);
  };

  const { setUserId, user, loading, hearings } =
    useStore().useUserDetailActions;

  const [firstnameuser, setFirstnameuser] = useState('');
  const [lastnameuser, setLastnameuser] = useState('');
  const [phoneuser, setPhoneuser] = useState(null);


  const handlefirstName = (e) => {
    setFirstnameuser(e.target.value);
  };

  const handlelastName = (e) => {
    setLastnameuser(e.target.value);
  };


  const handlephone = (e) => {
    setPhoneuser(e.target.value);
  };

  useEffect(() => {
    setUserId(userId)
    
    return () => setUserId(null);
  }, []);

  useEffect(() => {
    setFirstnameuser(user?.firstName)
    setLastnameuser(user?.lastName)
    setPhoneuser(user?.phone)
  }, [user])
  

  if (loading || !user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = {
      firstName: firstnameuser,
      lastName: lastnameuser,
      phone: phoneuser
    };
    try {
      const response = await fetch("http://localhost:5255/api/User/NewUserByName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload success:", data);
        setIsEditMode(false);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };



  return (
    <Container className="main pt-4">
      <Card className="mb-4" body>
        ข้อมูลผู้ใช้งาน <Badge bg="primary">รหัส {userId}</Badge>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Card.Title className="mb-0" style={{ fontSize: 23 }}>
              ชื่อผู้ป่วย :{" "}
              <span style={{ fontWeight: 700 }}>
                {user.firstName} {user.lastName}
              </span>
            </Card.Title>
          </div>
        </Card.Body>
        {/* <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>วันเกิด:</strong> {formatISODateToThaiDate(user.birthday)}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>อายุ:</strong>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>เบอร์โทรศัพท์:</strong> {user.phoneNumber}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>หมายเหตุ:</strong> {user.note}
        </ListGroup.Item>
      </ListGroup> */}

        <div className="container " style={{ marginTop: -35 }}>
          <div className="row">
            <div className="">
              <div className="p-3 py-5">
                <div className="row mt-2">
                  <div className="col-md-6">
                    <p style={{ fontSize: 18, fontWeight: 600 }}>ชื่อ</p>
                    <input
                      type="text"
                      style={{ height: 50 }}
                      defaultValue={user.firstName}
                      className="form-control"
                      placeholder="ชื่อ ..."
                      disabled={!isEditMode}
                      value={firstnameuser}
                      onChange={handlefirstName}
                    />
                  </div>
                  <div className="col-md-6">
                    <p style={{ fontSize: 18, fontWeight: 600 }}>นามสกุล</p>
                    <input
                      type="text"
                      style={{ height: 50 }}
                      className="form-control"
                      placeholder="นามสกุล ..."
                      disabled={!isEditMode}
                      value={lastnameuser}
                      onChange={handlelastName}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <p style={{ fontSize: 18, fontWeight: 600 }}>วันเกิด</p>
                    <input
                      type="text"
                      style={{ height: 50 }}
                      defaultValue={formatISODateToThaiDate(user.birthday)}
                      className="form-control"
                      placeholder="วันเกิด ..."
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="col-md-6">
                    <p style={{ fontSize: 18, fontWeight: 600 }}>อายุ</p>
                    <input
                      type="text"
                      style={{ height: 50 }}
                      className="form-control"
                      placeholder="อายุ ..."
                      disabled
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <p style={{ fontSize: 18, fontWeight: 600 }}>
                      เบอร์โทรศัพท์
                    </p>
                    <input
                      type="text"
                      style={{ height: 50 }}
                      defaultValue={user.phone}
                      className="form-control"
                      placeholder="เบอร์โทรศัพท์ ..."
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <p style={{ fontSize: 18, fontWeight: 600 }}>หมายเหตุ</p>
                    <input
                      type="text"
                      style={{ height: 50 }}
                      defaultValue={user.note}
                      className="form-control"
                      placeholder="หมายเหตุ ..."
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            {isEditMode ? (
              <div style={{ marginLeft: 20 }}>
                <Button
                  onClick={handleSubmit}

                  style={{ marginRight: 30, backgroundColor: "#00be26" }}
                >
                  บันทึก
                </Button>
                <Button
                  onClick={() => {
                    setIsEditMode(false);
                  }}
                  style={{ backgroundColor: "#fe0000" }}
                >
                  ยกเลิก
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditMode(true)}
                style={{ marginLeft: 18, backgroundColor: "#e45b00" }}
              >
                แก้ไข
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="profile" title="ตรวจตา">
          {formMode ? (
            <EyesCreate
              setMode={setMode}
              userId={userId}
              selectedUserDetail={selectedUser}
            />
          ) : (
            <EyesList setMode={setMode} hearings={hearings} />
          )}
        </Tab>
        <Tab eventKey="hearings" title="ตรวจหู">
          <HearingList hearings={hearings} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default observer(UserDetailPage);
