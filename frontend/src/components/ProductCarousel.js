import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="custom-carousel">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} className="carousel-link">
            <Image
              src={`${BASE_URL}${product.image}`}
              alt={product.name}
              fluid
              className="carousel-image"
            />
            {/* Product name and price moved outside the image */}
            <div className="carousel-caption-below">
              <h4 className="carousel-title">
                {product.name} (${product.price})
              </h4>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
