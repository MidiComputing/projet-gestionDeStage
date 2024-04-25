import React, { useState } from "react";
import { Modal, Button, Table, Card } from "react-bootstrap";
import AccountModal from "./AccountModal";
import { useSelector } from "react-redux";

const AccountManagement = () => {
  const allAccounts = useSelector((state) => state.accountR.accounts);
  const teachers = allAccounts.filter((account) => account.role === "teacher");

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  if (teachers.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>There are no teacher accounts yet.</Card.Text>
        </Card.Body>
      </Card>
    );
  }
  return (
    <>
      <Button onClick={handleShowModal}>Add Teacher Account</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Teacher Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AccountModal />
        </Modal.Body>
      </Modal>

      <h2>Teachers</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.first_name}</td>
              <td>{teacher.last_name}</td>
              <td>{teacher.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AccountManagement;
