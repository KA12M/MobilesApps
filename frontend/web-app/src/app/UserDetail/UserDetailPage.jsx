import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../utils/store";
import { Badge, Card, Container, ListGroup } from "react-bootstrap";

import { formatISODateToThaiDate } from "../../utils/dateFormat";
import HearingList from "./HearingList";

const UserDetailPage = () => {
  const { userId } = useParams();

  const { setUserId, user, loading, hearings } =
    useStore().useUserDetailActions;

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
          <Card.Title>
            {user.firstName} {user.lastName}
          </Card.Title>
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

      <HearingList hearings={hearings} />
    </Container>
  );
};

export default observer(UserDetailPage);
