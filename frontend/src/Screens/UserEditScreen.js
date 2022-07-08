import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/UserActions";
import { USER_UPDATE_RESET } from '../constants/UserConstants'

function UserEditScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const userId = params.id;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate;

  useEffect(() => {
    if(successUpdate){
      dispatch({type: USER_UPDATE_RESET})
      navigate('/admin/userlist')
    }else{
      if(!user.name || user._id !== Number(userId)){
        dispatch(getUserDetails(userId))
      }else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
    
  }, [user,userId, successUpdate,navigate,dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id: user._id, email, name, isAdmin}))
  };

  return (
    <div>
        <Link to='/admin/userlist'>
        Go Back
        </Link>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1 className="mt-3">Edit User</h1>

            {loading ? (
              <div className="loader-wrapper">
                <span className="loader">
                  <span className="loader-inner"></span>
                </span>
              </div>
            ) : error ? (
              <h5> {error} </h5>
            ) :  (
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

                <Form.Group className="my-4" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-4" controlId="isadmin">
                  <Form.Label>Admin</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>

                <div className="text-center">
                  <Button className="my-3" type="submit" variant="primary">
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserEditScreen;
