import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import AccountModal from "./AccountModal";
import { useDispatch, useSelector } from "react-redux";

const AccountManagement = () => {
  const allAccounts = useSelector((state) => state.accountR.accounts);

  const students = allAccounts.filter((account) => account.role === "student");
  const teachers = allAccounts.filter((account) => account.role === "teacher");

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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

      {/* <h2>Students</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}

      <h2>Teachers</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th> Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.first_name}</td>
              <td> {teacher.last_name}</td>
              <td>{teacher.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AccountManagement;
