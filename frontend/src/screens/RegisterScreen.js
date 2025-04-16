import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../actions/userActions";
import { showSuccessToast } from "../components/Toast"; // Import the toast utility function

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect") ? params.get("redirect") : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, success } = userRegister;

  useEffect(() => {
    if (success) {
      // Show success toast notification
      showSuccessToast(
        "Registration successful! Please check your email to activate your account."
      );
      // navigate(redirect); // Redirect to the specified page after successful registration
    }
  }, [success, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <Row className="w-100 align-items-center">
        <Col md={6} className="text-center d-none d-md-block">
          <img
            src="/images/Signup-rafiki.png"
            alt="Register Illustration"
            className="img-fluid"
          />
        </Col>
        <Col md={6}>
          <Card className="register-card p-4 shadow-lg">
            <div style={{ maxHeight: "90vh", overflowY: "auto" }}>
              <h1 className="text-center mb-4">Create Account</h1>
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Enter a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="passwordConfirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Register
                </Button>
              </Form>

              <Row className="py-3">
                <Col className="text-center">
                  Already have an account?{" "}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    Sign In
                  </Link>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default RegisterScreen;
