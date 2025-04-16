import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Nav, Button } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import CategoryList from "../components/CategoryList";
import BrandList from "../components/BrandList";
import PriceFilter from "../components/PriceFilter";
import { listProducts } from "../actions/productActions";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUndo } from "react-icons/fa";

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";
  const filterBy = queryParams.get("filter_by") || "";
  const currentPage = queryParams.get("page") || 1;
  const categorySlug = queryParams.get("category_slug") || "";
  const brandSlug = queryParams.get("brand_slug") || "";
  const minPrice = queryParams.get("minPrice") || "";
  const maxPrice = queryParams.get("maxPrice") || "";

  // Fetch products whenever filters or pagination change
  useEffect(() => {
    dispatch(
      listProducts(
        keyword,
        filterBy,
        currentPage,
        categorySlug,
        brandSlug,
        minPrice,
        maxPrice
      )
    );
  }, [
    dispatch,
    keyword,
    filterBy,
    currentPage,
    categorySlug,
    brandSlug,
    minPrice,
    maxPrice,
  ]);

  // Update query parameters while preserving existing filters
  const updateQueryParams = (updates) => {
    const params = new URLSearchParams(location.search);

    // Update or delete provided parameters
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, value); // Set the new value
      } else {
        params.delete(key); // Remove the parameter if empty
      }
    });

    // Navigate to the updated URL
    navigate(`/?${params.toString()}`);
  };

  // Handlers for filter interactions
  const handleCategoryClick = (newCategorySlug) => {
    updateQueryParams({
      category_slug: newCategorySlug,
      page: 1, // Reset to the first page
    });
  };

  const handleBrandClick = (newBrandSlug) => {
    updateQueryParams({
      brand_slug: newBrandSlug,
      page: 1, // Reset to the first page
    });
  };

  const handleFilterChange = (newFilter) => {
    updateQueryParams({ filter_by: newFilter, page: 1 });
  };

  const handlePriceFilterChange = (newMinPrice, newMaxPrice) => {
    updateQueryParams({
      minPrice: newMinPrice,
      maxPrice: newMaxPrice,
      page: 1,
    });
  };

  // Reset Filters
  const resetFilters = () => {
    navigate("/"); // Reset URL to the base without any query params
  };

  return (
    <div>
      <ProductCarousel />
      <h1 className="text-center my-5">Trending Products</h1>

      {/* Category, Brand, and Price Filters */}
      <Row>
        <Col md={3}>
          <CategoryList
            selectedCategory={categorySlug} // Highlight active category
            onCategoryClick={handleCategoryClick} // Callback to handle category click
          />
          <BrandList
            selectedBrand={brandSlug} // Highlight active brand
            onBrandClick={handleBrandClick} // Callback to handle brand click
          />
          <PriceFilter onPriceFilterChange={handlePriceFilterChange} />
          <Button
            variant="primary"
            className="mt-3 w-100 reset-button-all"
            onClick={resetFilters}
          >
            <FaUndo className="me-2" />
            Reset All Filters
          </Button>
        </Col>
        <Col md={9}>
          {/* Filter Tabs */}
          <Nav variant="tabs" className="mb-4 justify-content-center">
            <Nav.Item>
              <Nav.Link
                className={filterBy === "best_seller" ? "active-filter" : ""}
                onClick={() => handleFilterChange("best_seller")}
              >
                Best Seller
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={filterBy === "featured" ? "active-filter" : ""}
                onClick={() => handleFilterChange("featured")}
              >
                Featured Product
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={filterBy === "latest" ? "active-filter" : ""}
                onClick={() => handleFilterChange("latest")}
              >
                New Product
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={filterBy === "discount" ? "active-filter" : ""}
                onClick={() => handleFilterChange("discount")}
              >
                Discount
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Product List */}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>

              <Paginate
                pages={pages}
                page={page}
                keyword={keyword}
                filterBy={filterBy}
                category_slug={categorySlug}
                brand_slug={brandSlug}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default HomeScreen;
