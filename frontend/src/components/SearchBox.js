import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import FontAwesome search icon

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        placeholder="Search products..."
        onChange={(e) => setKeyword(e.target.value)}
        className="me-2"
        style={{
          borderRadius: "25px",
          border: "1px solid #ced4da",
          padding: "10px 15px",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      <button
        type="submit"
        className="btn d-flex align-items-center justify-content-center px-3"
        style={{
          borderRadius: "25px",
          border: "1px solid #ced4da",
          backgroundColor: "transparent",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#8d90ad"; // Light gray on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent"; // Reset to transparent
        }}
      >
        <FaSearch />
      </button>
    </Form>
  );
}

export default SearchBox;
