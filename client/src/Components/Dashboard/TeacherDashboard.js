import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { logout } from "../../JS/actions/useraction";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StagesActifsTeacher from "../Teacher/StagesActifsTeacher";
import { getAllReports } from "../../JS/actions/rapportactions";
import { getallApplications } from "../../JS/actions/companyactions";
import RapportsTeacher from "../Teacher/RapportsTeacher";
import SoutenanceTeacher from "../Teacher/SoutenanceTeacher";

const TeacherDashboard = () => {
  useEffect(() => {
    dispatch(getAllReports());
    dispatch(getallApplications());
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Container fluid>
      <Row>
        <Col sm={3} className="bg-dark text-white">
          {/* Sidebar with vertical tabs */}
          <div className="p-4">
            <h4>Stage Horizon (Teacher)</h4>
            <Nav
              variant="pills"
              className="flex-column"
              activeKey={activeTab}
              onSelect={handleTabSelect}
            >
              <Nav.Item>
                <Nav.Link eventKey="tab1">Stages Actifs</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="tab5">Rapports</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab6">Soutenances</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab7" onClick={handleLogout}>
                  Log out
                </Nav.Link>
              </Nav.Item>
              {/* Add more tabs as needed */}
            </Nav>
          </div>
        </Col>
        <Col sm={9} className="bg-light">
          {/* Main content */}
          <div className="p-4">
            {activeTab === "tab1" && (
              <div>
                <StagesActifsTeacher />
              </div>
            )}

            {activeTab === "tab5" && (
              <div>
                <RapportsTeacher/>
              </div>
            )}
            {activeTab === "tab6" && (
              <div>
                <SoutenanceTeacher/>
              </div>
            )}
            {/* Add more content for other tabs */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TeacherDashboard;
