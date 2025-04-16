import React, { useState } from "react";

function PriceFilter({ onPriceFilterChange }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onPriceFilterChange(minPrice, maxPrice);
  };

  return (
    <div className="price-filter my-3">
      <h5>Filter by Price</h5>
      <form onSubmit={handleFilterSubmit}>
        <div className="form-group">
          <label>Min Price</label>
          <input
            type="number"
            className="form-control"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 1200000"
          />
        </div>
        <div className="form-group">
          <label>Max Price</label>
          <input
            type="number"
            className="form-control"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 1299999"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Apply
        </button>
      </form>
    </div>
  );
}

export default PriceFilter;
