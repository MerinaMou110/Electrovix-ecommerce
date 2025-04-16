import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function ActivateScreen() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    loading: true,
    success: null,
    message: "",
  });

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/users/activate/${uid}/${token}/`
        );
        setStatus({
          loading: false,
          success: true,
          message: data.detail || "Account activated successfully.",
        });

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        setStatus({
          loading: false,
          success: false,
          message:
            err.response?.data?.detail || "Invalid or expired activation link.",
        });
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  const getCardContent = () => {
    if (status.loading) {
      return (
        <>
          <Spinner
            animation="border"
            role="status"
            className="mb-4"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h3>Loading...</h3>
        </>
      );
    }

    if (status.success) {
      return (
        <>
          <FaCheckCircle
            size={80}
            className="text-success mb-4"
            aria-label="Success icon"
          />
          <h2>Activation Successful</h2>
          <p>{status.message}</p>
          <p>Redirecting to login page...</p>
        </>
      );
    }

    return (
      <>
        <FaTimesCircle
          size={80}
          className="text-danger mb-4"
          aria-label="Error icon"
        />
        <h2>Activation Failed</h2>
        <p>{status.message}</p>
      </>
    );
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", background: "#f8f9fa" }}
    >
      <Card
        className="text-center p-5 shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "15px",
        }}
      >
        {getCardContent()}
      </Card>
    </div>
  );
}

export default ActivateScreen;
