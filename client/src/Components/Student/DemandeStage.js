import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addApplication } from "../../JS/actions/companyactions";
import moment from "moment";

const DemandeStage = () => {
  const dispatch = useDispatch();
  const allCompanies = useSelector((state) => state.companyR.companies);
  const currentUser = useSelector((state) => state.userR.currentUser);
  const allApplications = useSelector((state) => state.companyR.applications);

  const [formData, setFormData] = useState({
    first_name: currentUser.first_name || "",
    last_name: currentUser.last_name || "",
    companyName: "",
    startDate: "",
    endDate: "",
    student: currentUser._id || "",
    status: "pending",
  });

  const handleApplicationSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const selectedStartDate = new Date(formData.startDate);
    if (selectedStartDate < currentDate) {
      alert("Start date cannot be in the past.");
      return;
    }

    dispatch(addApplication(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Apply for Stage</h2>
      <Form onSubmit={handleApplicationSubmit}>
        <Form.Group controlId="companySelect">
          <Form.Label>Select Company</Form.Label>
          <Form.Control
            as="select"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          >
            <option value="">Select a company</option>
            {allCompanies
              .filter((company) => company.student === currentUser._id)
              .map((company) => (
                <option key={company._id} value={company.companyName}>
                  {company.companyName}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Apply
        </Button>
      </Form>

      <h2>All Applications</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {allApplications.map((application, index) => {
            if (application.student === currentUser._id) {
              return (
                <tr key={index}>
                  <td>{application.first_name}</td>
                  <td>{application.last_name}</td>
                  <td>{application.companyName}</td>
                  <td>
                    {moment(application.startDate).format("MMMM Do YYYY")}
                  </td>
                  <td>{moment(application.endDate).format("MMMM Do YYYY")}</td>
                  <td
                    style={{
                      color:
                        application.status === "pending"
                          ? "gray"
                          : application.status === "approved"
                          ? "green"
                          : "red",
                    }}
                  >
                    {application.status}
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
          {allApplications.every(
            (application) => application.student !== currentUser._id
          ) && (
            <tr>
              <td colSpan="6">You have not submitted any applications yet.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DemandeStage;
