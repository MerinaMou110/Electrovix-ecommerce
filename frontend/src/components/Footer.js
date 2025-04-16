import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-section pt-5 pb-3">
      <Container>
        <Row>
          {/* About Section */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold text-light mb-3">About Us</h5>
            <p class="text-readable">
              YourStore is your one-stop destination for the best shopping
              experience. We provide high-quality products at unbeatable prices
              with fast delivery services. Shop now and enjoy premium quality
              and satisfaction!
            </p>
          </Col>

          {/* Quick Links Section */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold text-light mb-3">
              Quick Links
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="/shop" className="footer-link">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="footer-link">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col md={4} className=" contact mb-4">
            <h5 className="text-uppercase fw-bold text-light mb-3">
              Contact Us
            </h5>
            <p class="text-readable">
              <FaEnvelope className="me-2" /> support@yourstore.com
            </p>
            <p class="text-readable">
              <FaPhone className="me-2" /> +123 456 7890
            </p>
            <h6 className="text-light mt-4">Follow Us</h6>
            <div className="d-flex">
              <a
                href="https://facebook.com"
                className="footer-social-icon me-3"
              >
                <FaFacebook size={30} />
              </a>
              <a href="https://twitter.com" className="footer-social-icon me-3">
                <FaTwitter size={30} />
              </a>
              <a
                href="https://instagram.com"
                className="footer-social-icon me-3"
              >
                <FaInstagram size={30} />
              </a>
              <a href="https://linkedin.com" className="footer-social-icon">
                <FaLinkedin size={30} />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary" />

        <Row>
          <Col className="text-center">
            <p class="text-readable mb-0">
              &copy; {new Date().getFullYear()} YourStore. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
