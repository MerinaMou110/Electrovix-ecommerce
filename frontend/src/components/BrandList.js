import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBrands } from "../actions/productActions";
import { ListGroup } from "react-bootstrap";
// import { FaTimesCircle } from "react-icons/fa"; // Import reset icon (React Icons)
import { FaUndo } from "react-icons/fa";

const BrandList = ({ selectedBrand, onBrandClick }) => {
  const dispatch = useDispatch();
  const brandList = useSelector((state) => state.brandList);
  const { loading, error, brands } = brandList;

  useEffect(() => {
    dispatch(listBrands());
  }, [dispatch]);

  return (
    <div>
      {/* Title with Reset Icon */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <h5>Our Brands</h5>
        <FaUndo
          size={20}
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => onBrandClick("")} // Reset selected brand
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ListGroup>
          {brands.map((brand) => (
            <ListGroup.Item
              key={brand._id}
              onClick={() => onBrandClick(brand.slug)}
              className={`brand-item ${
                selectedBrand === brand.slug ? "active" : ""
              }`}
              style={{
                cursor: "pointer",
              }}
            >
              <i
                className={brand.icon_class}
                style={{ marginRight: "10px" }}
              ></i>
              {brand.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default BrandList;
