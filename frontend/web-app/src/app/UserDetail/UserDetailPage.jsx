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
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const setMode = (item) => {
    setFormMode(!formMode);
    setSelectedUser(item); // Store the selected item
  };

  const { setUserId, user, loading, hearings } =
    useStore().useUserDetailActions;

  useEffect(() => {
    setUserId(userId);

    return () => setUserId(null);
  }, []);

  if (loading || !user) return;

  console.log("user", user);
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
            <Card.Title className="mb-0" style={{fontSize:23}}>
              ชื่อผู้ป่วย : <span style={{fontWeight:700}}>{user.firstName} {user.lastName}</span>
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
                    <p style={{fontSize:18,fontWeight:600}}>วันเกิด</p>
                    <input
                      type="text"
                      style={{ height: 50 }}
                      defaultValue={formatISODateToThaiDate(user.birthday)}
                      className="form-control"
                      placeholder="วันเกิด ..."
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                  <p style={{fontSize:18,fontWeight:600}}>อายุ</p>
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
                  <p style={{fontSize:18,fontWeight:600}}>เบอร์โทรศัพท์</p>
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
                  <p style={{fontSize:18,fontWeight:600}}>หมายเหตุ</p>
                    <input
                      type="text"
                      style={{ height: 50 }}
                      defaultValue={user.note}
                      className="form-control"
                      placeholder="หมายเหตุ ..."
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
              <div style={{marginBottom:20}}>
              <Button>แก้ไข</Button>
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
