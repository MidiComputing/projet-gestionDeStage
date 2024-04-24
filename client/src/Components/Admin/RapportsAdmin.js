import React, { useState } from "react";
import { Card, ListGroup, Accordion } from "react-bootstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateReport } from "../../JS/actions/rapportactions";

const RapportsAdmin = () => {
  const dispatch = useDispatch();
  const allRapports = useSelector((state) =>
    state.rapportR.reports.filter(
      (report) => report.rapport_status === "approved"
    )
  );
  
  // State to store selected dates for each report
  const [selectedDates, setSelectedDates] = useState({});

  // Function to handle date change for a specific report
  const handleDateChange = (date, reportId) => {
    setSelectedDates({ ...selectedDates, [reportId]: date });
  };

  // Function to handle date revision for a specific report
  const handleRevision = (reportId) => {
    // Dispatch action to update the report with the selected date
    dispatch(updateReport(reportId, { date_soutenance: selectedDates[reportId] }));
  };

  return (
    <div className="container mt-4">
      <h2>Approved Reports</h2>
      <div className="row">
        {allRapports.map((report) => (
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
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Messages</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <h2>Choose Date for Revision</h2>
                      <div>
                        <DatePicker
                          selected={selectedDates[report._id] || null} // Use selected date for this report, if available
                          onChange={(date) => handleDateChange(date, report._id)} // Handle date change for this report
                          dateFormat="dd/MM/yyyy" // Date format
                          placeholderText="Select a date" // Placeholder text
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