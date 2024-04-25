import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from "../../JS/actions/rapportactions";
import { Card, ListGroup, Accordion } from "react-bootstrap";
import moment from "moment";

const Rapports = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userR.currentUser);
  const applications = useSelector((state) => state.companyR.applications);
  const allRapports = useSelector((state) => state.rapportR.reports);

  const allApplications = useMemo(
    () =>
      applications.filter(
        (application) =>
          application.status === "approved" &&
          application.student === currentUser._id
      ),
    [applications, currentUser._id]
  );

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleSubmit = (application) => {
    if (selectedFiles && selectedFiles.length > 0) {
      const newReportData = {
        student: currentUser._id,
        application: application,
        rapport_status: "review",
        message: "",
        files: selectedFiles,
      };
      dispatch(createReport(newReportData));
      setSelectedFiles([]);
    } else {
      alert("Please select one or more files to upload.");
    }
  };

  if (allApplications.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>There are no reports yet.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Upload Reports</h2>
      <div className="row">
        {allApplications.map((application) => (
          <div key={application._id} className="col-md-12 mb-3">
            <Card>           
              <Card.Img
                variant="top"
                src="holder.js/100px180?text=Image cap"
                style={{ maxWidth: "100px" }}
              />
              <Card.Body>
                <Card.Title>{application.companyName}</Card.Title>
                <Card.Text>
                  Teacher: {application.teacher_first_name}{" "}
                  {application.teacher_last_name}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Start Date:{" "}
                  {moment(application.startDate).format("YYYY-MM-DD")}
                  <br />
                  End Date: {moment(application.endDate).format("YYYY-MM-DD")}
                </ListGroup.Item>
                <ListGroup.Item>
                  Status:{" "}
                  {
                    allRapports.find(
                      (report) => report.application._id === application._id
                    )?.rapport_status
                  }
                </ListGroup.Item>
              </ListGroup>
              <Accordion defaultActiveKey={null}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Messages</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup>
                      {allRapports
                        .filter(
                          (report) => report.application._id === application._id
                        )
                        .map((report) =>
                          report.message.slice(1).map((msg, index) => (
                            <ListGroup.Item key={index}>
                              {`${index + 1} ✎`} {msg}
                            </ListGroup.Item>
                          ))
                        )}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Card.Body>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={() => handleSubmit(application)}
                >
                  Upload Report
                </button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rapports;
