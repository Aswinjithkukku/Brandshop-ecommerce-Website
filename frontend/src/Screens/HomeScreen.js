import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
// import axios from 'axios'
import Product from "../components/Product";
// import products from '../products'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductActions";

function HomeScreen() {
  // const [products, setProducts] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    // async function fetchProducts() {
    // const { data } = await axios.get('/api/products/')
    // setProducts(data)
    // }
    // fetchProducts()
    dispatch(listProducts());
  }, [dispatch]);
  // const products = []
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <div className="loader-wrapper">
          <span className="loader">
            <span className="loader-inner"></span>
          </span>
        </div>
      ) : error ? (
        { error }
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
