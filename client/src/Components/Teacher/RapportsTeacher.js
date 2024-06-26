import React, { useState } from "react";
import {
  Card,
  ListGroup,
  Button,
  Table,
  Form,
  Accordion,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateReport } from "../../JS/actions/rapportactions";
import { FaRegCalendarAlt, FaDownload } from "react-icons/fa";

const RapportsTeacher = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userR.currentUser);
  const allRapports = useSelector((state) => state.rapportR.reports);

  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState({});

  const handleMessageChange = (reportId, message) => {
    setMessages({ ...messages, [reportId]: message });
  };

  const handleUpdateMessage = (reportId) => {
    const updatedData = {
      message: messages[reportId],
    };
    dispatch(updateReport(reportId, updatedData));

    setMessages({ ...messages, [reportId]: "" });
  };

  const handleApprove = (reportId) => {
    dispatch(updateReport(reportId, { rapport_status: "approved" }));
  };

  const handleRevision = (reportId) => {
    dispatch(updateReport(reportId, { rapport_status: "revision" }));
  };

  const filteredRapports = allRapports.filter(
    (report) =>
      report.application.teacher_id === currentUser._id &&
      (report.application.first_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        report.application.last_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  return (
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
        Rapports
      </Card.Text>
      <hr />
      <Card.Body>
        {/* Search Bar */}
        <Form.Group className="mb-4" controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search by student name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>

        {filteredRapports.length === 0 ? (
          <Card>
            <Card.Body>
              <Card.Text>No rapports found.</Card.Text>
            </Card.Body>
          </Card>
        ) : (
          filteredRapports.map((report) => (
            <Card className="mb-4" key={report._id} style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>
                  Company Name {report.application?.companyName}
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Start Date: <FaRegCalendarAlt />{" "}
                  {moment(report.application?.startDate).format("YYYY-MM-DD")}
                </ListGroup.Item>
                <ListGroup.Item>
                  End Date: <FaRegCalendarAlt />{" "}
                  {moment(report.application?.endDate).format("YYYY-MM-DD")}
                </ListGroup.Item>
                <ListGroup.Item>
                  Teacher: {report.application?.teacher_first_name}{" "}
                  {report.application?.teacher_last_name}
                </ListGroup.Item>
                <ListGroup.Item>
                  Student: {report.application?.first_name}{" "}
                  {report.application?.last_name}
                </ListGroup.Item>
                <ListGroup.Item>
                  Status:{" "}
                  <span
                    style={{
                      color:
                        report.rapport_status === "approved"
                          ? "green"
                          : "orange",
                    }}
                  >
                    {report.rapport_status}
                  </span>
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Table variant="light" bordered striped responsive>
                  <tbody>
                    {report.files.map((file, fileIndex) => (
                      <tr key={fileIndex}>
                        <td>File {fileIndex + 1}</td>
                        <td>
                          <a href={file} download>
                            <FaDownload /> Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Accordion defaultActiveKey={null}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Comments</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup>
                        {report.message.slice(1).map((msg, index) => (
                          <ListGroup.Item key={index}>
                            {`${index + 1} ✎`} {msg}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Form.Group controlId={`message-${report._id}`}>
                  <Form.Label>Leave a comment:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={messages[report._id]}
                    onChange={(e) =>
                      handleMessageChange(report._id, e.target.value)
                    }
                  />
                </Form.Group>

                <ButtonGroup
                  style={{ width: "100%", marginTop: "10px" }}
                  aria-label="Basic example"
                >
                  <Button
                    onClick={() => handleUpdateMessage(report._id)}
                    variant="secondary"
                  >
                    Add Comment
                  </Button>
                  <Button
                    onClick={() => handleApprove(report._id)}
                    variant="secondary"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleRevision(report._id)}
                    variant="secondary"
                  >
                    Revision
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default RapportsTeacher;
