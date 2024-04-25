import React, { useState } from "react";
import { Accordion, Table, Button, Modal, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { editApplication } from "../../JS/actions/companyactions";

const DemandeStageAdmin = () => {
  const dispatch = useDispatch();
  const allApplications = useSelector((state) => state.companyR.applications);
  const allRapports = useSelector((state) => state.rapportR.reports);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const groupedApplications = allApplications.reduce((acc, application) => {
    const key = `${application.first_name} ${application.last_name}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(application);
    return acc;
  }, {});

  const handleApprove = () => {
    dispatch(
      editApplication({
        status: "approved",
        idApplication: selectedApplicationId,
      })
    );
    setShowModal(false);
  };

  const handleReject = () => {
    dispatch(
      editApplication({
        status: "declined",
        idApplication: selectedApplicationId,
      })
    );
    setShowModal(false);
  };

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

  const handleAction = (applicationId, type) => {
    setSelectedApplicationId(applicationId);
    setActionType(type);
    setShowModal(true);
  };

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
    <div>
      <h2>All Applications</h2>

      <Accordion defaultActiveKey={null}>
        {Object.keys(groupedApplications).map((key, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>{key}</Accordion.Header>
            <Accordion.Body>
              {groupedApplications[key].map((application, innerIndex) => (
                <Accordion key={innerIndex} defaultActiveKey={null}>
                  <Accordion.Item eventKey={innerIndex.toString()}>
                    <Accordion.Header>
                      Application number {innerIndex + 1} created on{" "}
                      {moment(application.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Table variant="dark" bordered striped responsive>
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
                              {moment(application.startDate).format(
                                "MMMM Do YYYY"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>End Date:</td>
                            <td>
                              {moment(application.endDate).format(
                                "MMMM Do YYYY"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Status:</td>
                            <td
                              style={{
                                color: getStatusColor(application.status),
                              }}
                            >
                              {application.status}
                            </td>
                          </tr>
                          <tr>
                            <tr>
                              <Button
                                variant="success"
                                onClick={() =>
                                  handleAction(application._id, "approve")
                                }
                                disabled={
                                  application.status === "approved" ||
                                  allRapports.some(
                                    (report) =>
                                      report.application._id ===
                                        application._id &&
                                      report.rapport_status === "approved"
                                  )
                                }
                              >
                                {application.status === "approved"
                                  ? "Approved"
                                  : "Approve"}
                              </Button>{" "}
                              <Button
                                variant="danger"
                                onClick={() =>
                                  handleAction(application._id, "reject")
                                }
                                disabled={
                                  application.status === "declined" ||
                                  allRapports.some(
                                    (report) =>
                                      report.application._id ===
                                        application._id &&
                                      report.rapport_status === "approved"
                                  )
                                }
                              >
                                {application.status === "declined"
                                  ? "Declined"
                                  : "Decline"}
                              </Button>
                            </tr>
                          </tr>
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          {actionType === "approve" ? "approve" : "decline"} this application?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={actionType === "approve" ? handleApprove : handleReject}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DemandeStageAdmin;
