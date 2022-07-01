import React, { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";

import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/ProductActions";

function ProductScreen() {
  const params = useParams();
  const navigate = useNavigate()


  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const [qty,setQty] = useState(1)

  useEffect(() => {
 
    dispatch(listProductDetails(params.id));
  }, [dispatch,params.id]);

  const addToHandlerEvent = () =>{

    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return (
    <div>
      <Link to="/" className="btn btn-light py-2 my-2">
        Go Back
      </Link>
      {loading ? (
        <div className="loader-wrapper">
          <span className="loader">
            <span className="loader-inner"></span>
          </span>
        </div>
      ) : error ? (
       <h4> { error } </h4>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} ratings`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price :</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status :</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col className="mt-2">Quantity</Col>
                    <Col xs='auto'>
                      <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                      {
                        [...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      }
                      </Form.Control>
                      </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item className="text-center">
                <Button
                  onClick={addToHandlerEvent}
                  className="btn-block mt-2"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
