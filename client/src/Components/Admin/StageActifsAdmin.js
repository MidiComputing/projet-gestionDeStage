import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";

const StagesActifsAdmin = () => {
  const currentUser = useSelector((state) => state.userR.currentUser);
  const allApplications = useSelector((state) => state.companyR.applications);

  const approvedApplications = allApplications.filter((application) => {
    return (
      application.status === "approved" 
    );
  });

  return (
    <div>
      <h2>Stages Actifs</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company Name</th>
            <th>Teacher</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {approvedApplications.map((application, index) => (
            <tr key={index}>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.companyName}</td>
              <td>{application.teacher_first_name} {application.teacher_last_name}</td>
              <td>{moment(application.startDate).format("MMMM Do YYYY")}</td>
              <td>{moment(application.endDate).format("MMMM Do YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StagesActifsAdmin;
