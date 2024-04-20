import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addcompany, deleteCompany } from "../../JS/actions/companyactions";

const AjouterEntreprise = () => {
  const dispatch = useDispatch();
  const allCompanies = useSelector((state) => state.companyR.companies);
  const currentUser = useSelector((state) => state.userR.currentUser);
  const [addCompany, setAddCompany] = useState({
    student: currentUser._id,
    companyName: "",
  });

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    dispatch(addcompany(addCompany));
    setAddCompany({ ...addCompany, companyName: "" }); // Reset company name
  };

  const handleDelete = (companyId) => {
    dispatch(deleteCompany(companyId));
  };

  return (
    <div>
      <h2>Add a Company</h2>
      <Form onSubmit={handleCompanySubmit}>
        <Form.Group controlId="companyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company name"
            value={addCompany.companyName}
            onChange={(e) =>
              setAddCompany({ ...addCompany, companyName: e.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Company
        </Button>
      </Form>

      <h2>Company List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allCompanies
            .filter((company) => company.student === currentUser._id)
            .map((company, index) => (
              <tr key={company._id}>
                <td>{index + 1}</td>
                <td>{company.companyName}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(company._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AjouterEntreprise;
