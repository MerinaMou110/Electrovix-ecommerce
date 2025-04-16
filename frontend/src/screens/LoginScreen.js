import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search
    ? "/" + new URLSearchParams(location.search).get("redirect")
    : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <Row className="w-100 align-items-center">
        <Col md={6} className="text-center d-none d-md-block">
          <img
            src="/images/login-rafiki.png"
            alt="Login Illustration"
            className="img-fluid"
          />
        </Col>
        <Col md={6}>
          <Card className="login-card p-4 shadow-lg">
            <h1 className="text-center mb-4">Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Sign In
              </Button>
            </Form>

            <Row className="py-3">
              <Col className="text-center">
                New Customer?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Register
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default LoginScreen;
