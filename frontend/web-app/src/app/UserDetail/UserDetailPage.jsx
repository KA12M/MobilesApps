import  { useEffect,useState} from "react";
import { observer } from "mobx-react-lite";
import {  useParams } from "react-router-dom";
import { useStore } from "../../utils/store";
import { Badge, Card, Container, ListGroup } from "react-bootstrap";
import { Tab, Tabs } from 'react-bootstrap';

import { formatISODateToThaiDate } from "../../utils/dateFormat";
import HearingList from "./HearingList";
import EyesList from "./EyesList";
import EyesCreate from "./EyesCreate";

const UserDetailPage = () => {
  const { userId } = useParams();

  const [formMode, setFormMode] = useState(false)

  const setMode = () => setFormMode(!formMode)

  const { setUserId, user, loading, hearings} =
    useStore().useUserDetailActions;
    

    console.log("👌👌👌",JSON.stringify(user));

  useEffect(() => {
    setUserId(userId);

    return () => setUserId(null);
  }, []);

  if (loading || !user) return;


  return (
    <Container className="main pt-4">
      <Card className="mb-4" body>
        ข้อมูลผู้ใช้งาน <Badge bg="primary">รหัส {userId}</Badge>
      </Card>



      <Card className="mb-4">
  <Card.Body>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Card.Title>
        {user.firstName} {user.lastName} 
      </Card.Title>
    </div>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroup.Item>
      วันเกิด: {formatISODateToThaiDate(user.birthday)}
    </ListGroup.Item>
    <ListGroup.Item>อายุ: </ListGroup.Item>
    <ListGroup.Item>เบอร์โทรศัพท์: </ListGroup.Item>
    <ListGroup.Item>หมายเหตุ: </ListGroup.Item>
  </ListGroup>
</Card>

<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="profile" title="ตรวจตา"  >
    {formMode ? <EyesCreate setMode={setMode} user={user} /> : <EyesList setMode={setMode} />}
  
  </Tab>
  <Tab eventKey="hearings" title="ตรวจหู">
      <HearingList hearings={hearings} />
  </Tab>
</Tabs>

    

    </Container>
  );
};

export default observer(UserDetailPage);
