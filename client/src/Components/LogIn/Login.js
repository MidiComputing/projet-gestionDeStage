import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import CircleLogo from "./CircleLogo.svg";
import SignIn from "./SignIn/SignIn";
import Signup from "./SignUp/Signup";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <div
      style={{
        backgroundColor: "#242527",
        height: "fit-content",
        minHeight: "100vh",
      }}
    >
      <Container style={{ minHeight: "100vh" }}>
        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Col
            style={{
              alignSelf: "center",
            }}
            md={6}
          >
            <Image width={"80%"} src={CircleLogo} fluid />
          </Col>
          <Col
            style={{
              alignSelf: "center",
            }}
            md={6}
          >
            <div
              style={{ backgroundColor: "#3A3B3D" }}
              className="home-content"
            >
              {showLogin && (
                <div
                  style={{
                    height: "max-content",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"space-between",
                    alignItems: "center",
                    gap: "10px",
                    minHeight: "85vh",
                  }}
                >
                  <h2 style={{ color: "white", fontWeight: "600" }}>Log In</h2>
                  <SignIn />
                  <p className="text-center mt-3" style={{ color: "white" }}>
                    If you don't have an account, click here to {""}
                    <span
                      className="highlight"
                      style={{ color: "#6A62FA", fontSize: "larger" }}
                      onClick={handleSignupClick}
                    >
                      Create an account
                    </span>
                  </p>
                </div>
              )}

              {showSignup && (
                <div
                  style={{
                    height: "max-content",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"space-between",
                    alignItems: "center",
                    gap: "10px",
                    minHeight: "85vh",
                  }}
                >
                  <h2 style={{ color: "white", fontWeight: "600" }}>Sign Up</h2>
                  <Signup />
                  <p style={{ color: "white" }}>
                    If you already have an account, click here to {""}
                    <span
                      style={{ color: "#6A62FA", fontSize: "larger" }}
                      className="highlight"
                      onClick={handleLoginClick}
                    >
                      Login
                    </span>
                  </p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
