import React, { useState } from "react";
import {
  Card,
  ListGroup,
  Button,
  Table,
  Form,
  Accordion,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateReport } from "../../JS/actions/rapportactions";

const RapportsTeacher = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userR.currentUser);
  const allRapports = useSelector((state) => state.rapportR.reports);

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
    (report) => report.application.teacher_id === currentUser._id
  );

  if (filteredRapports.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>There are no rapports yet.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      {filteredRapports.map((report) => (
        <Card key={report._id} style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>
              Company Name {report.application?.companyName}
            </Card.Title>
            <Card.Text>
              Student Name: {report.application?.first_name}{" "}
              {report.application?.last_name}
              <br />
              Start Date:{" "}
              {moment(report.application?.startDate).format("YYYY-MM-DD")}
              <br />
              End Date:{" "}
              {moment(report.application?.endDate).format("YYYY-MM-DD")}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Status: {report.rapport_status}</ListGroup.Item>
            <ListGroup.Item>
              Teacher: {report.application?.teacher_first_name}{" "}
              {report.application?.teacher_last_name}
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Table variant="dark" bordered striped responsive>
              <tbody>
                {report.files.map((file, fileIndex) => (
                  <tr key={fileIndex}>
                    <td>File {fileIndex + 1}</td>
                    <td>
                      <a href={file} download>
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Accordion defaultActiveKey={null}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Messages</Accordion.Header>
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
              <Form.Label>Message:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={messages[report._id]}
                onChange={(e) =>
                  handleMessageChange(report._id, e.target.value)
                }
              />
            </Form.Group>
            <Button onClick={() => handleUpdateMessage(report._id)}>
              Update Message
            </Button>
            <Button onClick={() => handleApprove(report._id)}>Approve</Button>
            <Button onClick={() => handleRevision(report._id)}>Revision</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default RapportsTeacher;
