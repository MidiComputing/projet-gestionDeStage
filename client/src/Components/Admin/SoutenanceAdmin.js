import React from "react";
import { Table,Card } from "react-bootstrap";
import moment from "moment";
import { useSelector } from "react-redux";

const SoutenanceAdmin = () => {
  const allRapports = useSelector((state) => state.rapportR.reports);

  const rapportsWithDateSoutenance = allRapports.filter(
    (report) =>
      report.rapport_status === "approved" &&
      report.date_soutenance !== null &&
      report.date_soutenance !== undefined
  );

  if (rapportsWithDateSoutenance.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>There are no presentations yet.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Rapports with Date Soutenance</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Student</th>
            <th>Teacher</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Rapport Status</th>
            <th>Date Soutenance</th>
          </tr>
        </thead>
        <tbody>
          {rapportsWithDateSoutenance.map((report) => (
            <tr key={report._id}>
              <td>{report.application.companyName}</td>
              <td>
                {report.application.first_name} {report.application.last_name}
              </td>
              <td>
                {report.application.teacher_first_name}{" "}
                {report.application.teacher_last_name}
              </td>
              <td>
                {moment(report.application.startDate).format("YYYY-MM-DD")}
              </td>
              <td>{moment(report.application.endDate).format("YYYY-MM-DD")}</td>
              <td>{report.rapport_status}</td>
              <td>{moment(report.date_soutenance).format("YYYY-MM-DD")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SoutenanceAdmin;
