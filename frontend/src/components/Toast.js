import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" // Options: "light", "dark", "colored"
    />
  );
};

// Utility functions to show toasts
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right", // Use string-based position
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right", // Use string-based position
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    position: "top-right", // Use string-based position
  });
};

export const showWarningToast = (message) => {
  toast.warning(message, {
    position: "top-right", // Use string-based position
  });
};

export default Toast;
