import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../constants/ProductConstants";

function ProductEditScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState(0);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const productId = params.id;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [product, productId, navigate, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image-upload',file)
    formData.append('product_id',productId)
    setUploading(true)
    try{
      const config = {
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      const {data} = await axios.post('/api/products/upload/', formData, config)
      setImage(data)
      setUploading(false)
    }catch(error){
       setUploading(false)

    }
  };

  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1 className="mt-3">Edit Product</h1>

            {loadingUpdate && (
              <div className="loader-wrapper">
                <span className="loader">
                  <span className="loader-inner"></span>
                </span>
              </div>
            )}

            {errorUpdate && <h4 className="text-danger">{errorUpdate} </h4>}

            {loading ? (
              <div className="loader-wrapper">
                <span className="loader">
                  <span className="loader-inner"></span>
                </span>
              </div>
            ) : error ? (
              <h5> {error} </h5>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group className="my-4" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-4" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-4" controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                </Form.Group>  
                  <Form.Group controlId="image-upload" className="mb-3">
                  <Form.Control 
                  type="file"
                  // id="image-file"
                  label="Choose File"
                  custom='true'
                  onChange={uploadFileHandler} />
                </Form.Group> 
                {uploading && <h6  className="text-warning">Loading.....</h6>}

                <Form.Group className="my-4" controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-4" controlId="countinstock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-4" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-4" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
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

export default ProductEditScreen;
