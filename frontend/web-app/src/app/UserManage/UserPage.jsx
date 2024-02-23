import React, { useEffect, useState } from "react";
import { Container, Table, Card, Button, Modal, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useStore } from "../../utils/store";
import PaginationWidget from "../../components/PaginationWidget";
import { formatISODateToThaiDate } from "./../../utils/dateFormat";
import { RoutePath } from "./../../utils/RoutePath";

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
    createUser(data).then(() => {
      reset();
      handleClose();
    });
  }

  return (
    <Container className="main pt-4">
      <Card className="mb-4" body>
        ข้อมูลผู้ใช้งาน
      </Card>

      <Button className="mb-2" variant="success" onClick={handleShow}>
        + เพิ่มข้อมูลผู้ใช้
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>รหัส</th>
            <th>ชื่อ-นามสกุล</th>
            <th>เบอร์</th>
            <th>วันเกิด</th>
            <th>อายุ</th>
            <th>หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>
                <Link to={RoutePath.userDetail(el.id)}>
                  {el.firstName} {el.lastName}
                </Link>
              </td>
              <td>{el.phone}</td>
              <td>{formatISODateToThaiDate(el.birthday)}</td>
              <td>{el.age}</td>
              <td>{el.note}</td>
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
                {...register("surname", { required: true })}
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
