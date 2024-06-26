import React, { useState } from "react";
import {
  Accordion,
  Table,
  Button,
  Modal,
  Card,
  ButtonGroup,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { editApplication } from "../../JS/actions/companyactions";
import { FaRegCalendarAlt } from "react-icons/fa";

const ApplicationDetails = ({ application, handleAction, allRapports }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "gray";
      case "approved":
        return "green";
      case "declined":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <Accordion className="my-2">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Application created on{" "}
          {moment(application.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </Accordion.Header>
        <Accordion.Body>
          <Table variant="light" bordered striped responsive>
            <tbody>
              <tr>
                <td>Company Name:</td>
                <td>{application.companyName}</td>
              </tr>
              <tr>
                <td>Teacher:</td>
                <td>
                  {application.teacher_first_name}{" "}
                  {application.teacher_last_name}
                </td>
              </tr>
              <tr>
                <td>Start Date:</td>
                <td>
                  <FaRegCalendarAlt />{" "}
                  {moment(application.startDate).format("MMMM Do YYYY")}
                </td>
              </tr>
              <tr>
                <td>End Date:</td>
                <td>
                  <FaRegCalendarAlt />{" "}
                  {moment(application.endDate).format("MMMM Do YYYY")}
                </td>
              </tr>
              <tr>
                <td>Status:</td>
                <td style={{ color: getStatusColor(application.status) }}>
                  {application.status}
                </td>
              </tr>
            </tbody>
          </Table>
          <ButtonGroup
            style={{ width: "100%" }}
            className="mt-2"
            aria-label="Basic example"
          >
            <Button
              variant="primary"
              onClick={() => handleAction(application._id, "approve")}
              disabled={
                application.status === "approved" ||
                allRapports.some(
                  (report) =>
                    report.application._id === application._id &&
                    report.rapport_status === "approved"
                )
              }
            >
              {application.status === "approved" ? "Approved" : "Approve"}
            </Button>

            <Button
              variant="secondary"
              onClick={() => handleAction(application._id, "reject")}
              disabled={
                application.status === "declined" ||
                allRapports.some(
                  (report) =>
                    report.application._id === application._id &&
                    report.rapport_status === "approved"
                )
              }
            >
              {application.status === "declined" ? "Declined" : "Decline"}
            </Button>
          </ButtonGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

const DemandeStageAdmin = () => {
  const dispatch = useDispatch();
  const allApplications = useSelector((state) => state.companyR.applications);
  const allRapports = useSelector((state) => state.rapportR.reports);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const groupedApplications = allApplications.reduce((acc, application) => {
    const key = `${application.first_name} ${application.last_name}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(application);
    return acc;
  }, {});

  const handleAction = (applicationId, type) => {
    setSelectedApplicationId(applicationId);
    setActionType(type);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    const status = actionType === "approve" ? "approved" : "declined";
    dispatch(
      editApplication({
        status,
        idApplication: selectedApplicationId,
      })
    );
    setShowModal(false);
  };

  const filteredApplications = Object.keys(groupedApplications)
    .filter((key) => key.toLowerCase().includes(searchQuery.toLowerCase()))
    .reduce((acc, key) => {
      acc[key] = groupedApplications[key];
      return acc;
    }, {});

  if (allApplications.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>There are no applications yet.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card
        border="secondary"
        className="bg-dark text-white"
        style={{ minHeight: "90vh" }}
      >
        <Card.Text
          as="h2"
          className="m-3"
          style={{ fontFamily: "monospace", fontWeight: "600" }}
        >
          All Applications
        </Card.Text>
        <hr />
        <Card.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search by student name"
              aria-label="Search by student name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          {Object.keys(filteredApplications).map((key, index) => (
            <Card className="my-4" border="secondary" key={index}>
              <Card.Header as="h3" eventkey={index.toString()}>
                {key}
              </Card.Header>
              <Card.Body style={{ background: "#e4e4e4" }}>
                {filteredApplications[key].map((application, innerIndex) => (
                  <ApplicationDetails
                    key={innerIndex}
                    application={application}
                    handleAction={handleAction}
                    allRapports={allRapports}
                  />
                ))}
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                Number of applications: {filteredApplications[key].length}
              </Card.Footer>
            </Card>
          ))}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          {actionType === "approve" ? "approve" : "decline"} this application?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirmAction}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DemandeStageAdmin;
