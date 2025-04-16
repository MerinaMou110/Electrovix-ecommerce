import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Ratings from "./Rating";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions"; // Assuming you have this action
import { showSuccessToast } from "./Toast"; // Import toast utility function
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function Product({ product }) {
  const dispatch = useDispatch();
  const [qty] = useState(1); // Quantity default to 1

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty)); // Dispatch the action to add to cart
    showSuccessToast(`${product.name} has been added to your cart!`); // Show success toast
  };

  // Calculate discount price and percentage off
  const discountPrice =
    product.discountPercentage && product.price
      ? (
          product.price -
          product.price * (product.discountPercentage / 100)
        ).toFixed(2)
      : null;

  const percentageOff = product.discountPercentage
    ? `${product.discountPercentage}% OFF`
    : null;

  return (
    <Card className="my-3 p-3 rounded product-card">
      <Link to={`/product/${product._id}`}>
        <div className="product-image-wrapper">
          {product.discountPercentage > 0 && (
            <span className="sale-badge">{percentageOff}</span>
          )}
          <Card.Img src={`${BASE_URL}${product.image}`} alt={product.name} />
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Ratings
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color={"#f8e825"}
          />
        </Card.Text>

        {discountPrice ? (
          <Card.Text as="h3">
            <span className="discount-price">৳{discountPrice}</span>{" "}
            <span className="original-price">৳{product.price}</span>
          </Card.Text>
        ) : (
          <Card.Text as="h3">৳{product.price}</Card.Text>
        )}

        <div className="add-to-cart-button-wrapper">
          <Button
            onClick={addToCartHandler}
            className="btn-block add-to-cart-button"
            disabled={product.countInStock === 0}
            type="button"
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Product;
