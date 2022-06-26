import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/UserActions";

function LoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector(state =>  state.userLogin)
  const { error, loading, userInfo } = userLogin

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  },[navigate,userInfo,redirect])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="mt-3">Sign In</h1>

          {loading ? (
        <div className="loader-wrapper">
          <span className="loader">
            <span className="loader-inner"></span>
          </span>
        </div>
      ) : error ? (
       <h3> { error } </h3>
      ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-4" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="text-center">
              <Button className="my-3" type="submit" variant="primary">
                Sign In
              </Button>
            </div>
          </Form>)}
          <Row className="py-3">
            <div className="text-center">
              <Col>
                New Customer?{' '}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Register
                </Link>
              </Col>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;
