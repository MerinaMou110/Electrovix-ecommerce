import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/productActions";
import { ListGroup } from "react-bootstrap";
// import { FaTimesCircle } from "react-icons/fa"; // Import reset icon (React Icons)
import { FaUndo } from "react-icons/fa";

const CategoryList = ({ selectedCategory, onCategoryClick }) => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <div>
      {/* Title with Reset Icon */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <h5>Our Categories</h5>
        <FaUndo
          size={20}
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => onCategoryClick("")} // Reset selected category
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ListGroup>
          {categories.map((category) => (
            <ListGroup.Item
              key={category._id}
              onClick={() => onCategoryClick(category.slug)}
              className={`category-item ${
                selectedCategory === category.slug ? "active" : ""
              }`}
              style={{
                cursor: "pointer",
              }}
            >
              {/* Display the icon and category name */}
              <i
                className={category.icon_class}
                style={{ marginRight: "10px" }}
              ></i>
              {category.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default CategoryList;
