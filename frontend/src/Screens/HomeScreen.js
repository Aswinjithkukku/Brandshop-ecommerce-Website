import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductActions";
import { useLocation } from "react-router-dom";

function HomeScreen() {
  
  const dispatch = useDispatch();
  const location = useLocation();

  let keyword = location.search

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch,keyword]);

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  return (
    <div>
      {!keyword && <ProductCarousel/>}

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
        <div>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
