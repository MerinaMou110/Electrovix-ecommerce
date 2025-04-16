import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useLocation } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Accessing user login info from Redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Accessing cart info from Redux
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate total items in the cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <div
        className="top-bar d-flex justify-content-between align-items-center p-2"
        style={{
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <span className="small">
          World's Fastest Online Shopping Destination
        </span>
        <div>
          <span className="me-3">Bangladesh</span>|
          <span className="ms-3">BDT</span>
        </div>
      </div>

      <Navbar
        style={{ backgroundColor: "#ffffff" }}
        expand="lg"
        className="py-3"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand
              className={`fw-bold text-dark ${
                isActive("/") ? "active-brand" : ""
              }`}
            >
              Electrovix
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto d-flex align-items-center">
              <NavDropdown
                title="All Categories"
                id="category-dropdown"
                className="me-3"
              >
                <NavDropdown.Item href="/category/electronics">
                  Electronics
                </NavDropdown.Item>
                <NavDropdown.Item href="/category/fashion">
                  Fashion
                </NavDropdown.Item>
                <NavDropdown.Item href="/category/home">Home</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div
              className="search-box-container"
              style={{ marginRight: "auto", maxWidth: "400px", flex: 1 }}
            >
              <SearchBox />
            </div>

            <Nav className="ms-auto d-flex align-items-center">
              <LinkContainer to="/login">
                <Nav.Link
                  className={`nav-link custom-nav-link ${
                    isActive("/login") ? "active" : ""
                  }`}
                >
                  <i className="fas fa-user me-1"></i>Login
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link
                  className={`nav-link custom-nav-link ${
                    isActive("/cart") ? "active" : ""
                  }`}
                >
                  <i className="fas fa-shopping-cart me-1"></i>
                  Cart{" "}
                  {cartCount > 0 && (
                    <span className="badge bg-danger rounded-pill">
                      {cartCount}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  className="custom-nav-link"
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item
                      className={`custom-nav-link ${
                        isActive("/admin/userlist") ? "active" : ""
                      }`}
                    >
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item
                      className={`custom-nav-link ${
                        isActive("/admin/productlist") ? "active" : ""
                      }`}
                    >
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item
                      className={`custom-nav-link ${
                        isActive("/admin/orderlist") ? "active" : ""
                      }`}
                    >
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && (
                <NavDropdown
                  title={
                    <span
                      className={`custom-nav-link ${
                        isActive("/profile") || isActive("/logout")
                          ? "active"
                          : ""
                      }`}
                    >
                      {userInfo.name}
                    </span>
                  }
                  id="user-menu"
                  className="custom-nav-link"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item
                      className={`custom-nav-link ${
                        isActive("/profile") ? "active" : ""
                      }`}
                    >
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={logoutHandler}
                    className="custom-nav-link"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        className="bottom-bar"
        style={{ backgroundColor: "#434377", color: "#ffffff" }}
      >
        <Container>
          <Nav className="justify-content-center py-2">
            <Nav.Link className="text-white" href="/">
              Shop
            </Nav.Link>
            <Nav.Link className="text-white" href="/">
              Blog
            </Nav.Link>
            <Nav.Link className="text-white" href="/">
              About
            </Nav.Link>
            <Nav.Link className="text-white" href="/">
              Pages
            </Nav.Link>
            <Nav.Link className="text-white" href="/">
              Brand
            </Nav.Link>
          </Nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;
