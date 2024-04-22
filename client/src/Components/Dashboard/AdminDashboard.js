import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { getUser, logout } from "../../JS/actions/useraction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DemandeStageAdmin from "../Admin/DemandeStageAdmin";
import { getallApplications } from "../../JS/actions/companyactions";
import AccountManagement from "../Admin/AccountManagment";
import { getAllAccounts } from "../../JS/actions/accountactions";
import StagesActifsAdmin from "../Admin/StageActifsAdmin";

const AdminDashboard = () => {
  useEffect(() => {
    dispatch(getallApplications());
    dispatch(getAllAccounts());
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
            <h4>Stage Horizon (Admin)</h4>
            <Nav
              variant="pills"
              className="flex-column"
              activeKey={activeTab}
              onSelect={handleTabSelect}
            >
              <Nav.Item>
                <Nav.Link eventKey="tab1">Demandes de Stages</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab2">Stages Actifs</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="tab4">Ajouter un professionnel</Nav.Link>
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
                <DemandeStageAdmin />
              </div>
            )}
            {activeTab === "tab2" && (
              <div>
                <StagesActifsAdmin />
              </div>
            )}

            {activeTab === "tab4" && (
              <div>
                <AccountManagement />
              </div>
            )}
            {activeTab === "tab5" && (
              <div>
                <h4>Main Content for Tab 5</h4>
                <p>This is the main content for Tab 5.</p>
              </div>
            )}
            {activeTab === "tab6" && (
              <div>
                <h4>Main Content for Tab 6</h4>
                <p>This is the main content for Tab 6.</p>
              </div>
            )}
            {/* Add more content for other tabs */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
