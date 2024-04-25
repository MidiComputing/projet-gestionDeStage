import React, { useMemo, useState } from "react";
import { Card, ListGroup, Accordion } from "react-bootstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateReport } from "../../JS/actions/rapportactions";

const RapportsAdmin = () => {
  const dispatch = useDispatch();
  const allReports = useSelector((state) => state.rapportR.reports);

  const [selectedDates, setSelectedDates] = useState({});

  const filteredReports = useMemo(
    () => allReports.filter((report) => report.rapport_status === "approved"),
    [allReports]
  );

  const handleDateChange = (date, reportId) => {
    setSelectedDates({ ...selectedDates, [reportId]: date });
  };

  const handleRevision = (reportId) => {
    dispatch(
      updateReport(reportId, { date_soutenance: selectedDates[reportId] })
    );
  };

  if (filteredReports.length === 0) {
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
      <h2>Approved Reports</h2>
      <div className="row">
        {filteredReports.map((report) => (
          <div key={report._id} className="col-md-12 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{report.application.companyName}</Card.Title>
                <Card.Text>
                  Teacher: {report.application.teacher_first_name}{" "}
                  {report.application.teacher_last_name}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Start Date:{" "}
                  {moment(report.application.startDate).format("YYYY-MM-DD")}
                  <br />
                  End Date:{" "}
                  {moment(report.application.endDate).format("YYYY-MM-DD")}
                </ListGroup.Item>
                <ListGroup.Item>Status: {report.rapport_status}</ListGroup.Item>
              </ListGroup>
              <Accordion defaultActiveKey={null}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Messages</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <h2>Choose Date for Revision</h2>
                      <div>
                        <DatePicker
                          selected={selectedDates[report._id] || null}
                          onChange={(date) =>
                            handleDateChange(date, report._id)
                          }
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select a date"
                        />
                        <button onClick={() => handleRevision(report._id)}>
                          Update Date
                        </button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RapportsAdmin;
