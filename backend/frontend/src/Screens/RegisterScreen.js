import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/UserActions";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="mt-3">Register</h1>

          {loading ? (
            <div className="loader-wrapper">
              <span className="loader">
                <span className="loader-inner"></span>
              </span>
            </div>
          ) : error ? (
            <h5> {error} </h5>
          ) : message ? (
            <h5>{message}</h5>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-4" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-4" controlId="password">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-4" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-4" controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div className="text-center">
                <Button className="my-3" type="submit" variant="primary">
                  Register
                </Button>
              </div>
            </Form>
          )}

          <Row className="py-3">
            <div className="text-center">
              <Col>
                Already have an account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Sign In
                </Link>
              </Col>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterScreen;
