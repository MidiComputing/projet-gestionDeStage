import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

import { addUser } from "../../JS/actions/useraction";

const AccountModal = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "teacher",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      e.stopPropagation();
    } else {
      dispatch(addUser(formData, navigate));
      setValidated(true);
    }
    setValidated(true);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <div className="signup-form">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your first name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <div
                  style={{ display: "flex", gap: "10px" }}
                  className="password-input"
                >
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant="light"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility("password")}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  Please enter a password.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <div
                  style={{ display: "flex", gap: "10px" }}
                  className="password-input"
                >
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant="light"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  {passwordsMatch
                    ? "Passwords do not match."
                    : "Please confirm your password."}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="btn-block">
                Sign Up
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountModal;
