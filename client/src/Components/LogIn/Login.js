import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

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
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <div style={{ backgroundColor: "#1B1E1F" }} className="home-content">
            {showLogin && (
              <div>
                <h2 className="text-center mb-4" style={{ color: "white" }}>Log In</h2>
                <SignIn />
                <p className="text-center mt-3" style={{ color: "white" }}>
                  If you don't have an account, click here to create an account{" "}
                  <span className="highlight" onClick={handleSignupClick}>
                    Create an account
                  </span>
                </p>
              </div>
            )}

            {showSignup && (
              <div>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Signup />
                <p className="text-center mt-3">
                  If you already have an account, click here to
                  <span className="highlight" onClick={handleLoginClick}>
                    Login
                  </span>
                </p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
