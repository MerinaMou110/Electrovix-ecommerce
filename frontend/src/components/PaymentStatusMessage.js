import React from "react";
import { Card } from "react-bootstrap";
import { BsCheckCircle, BsXCircle, BsExclamationCircle } from "react-icons/bs";

const PaymentStatusMessage = ({ status }) => {
  const getMessageDetails = (status) => {
    switch (status) {
      case "success":
        return {
          icon: (
            <BsCheckCircle size={60} color="green" className="mx-auto my-3" />
          ),
          title: "Payment Successful!",
          message: "Your payment has been processed successfully.",
          variant: "success",
        };
      case "fail":
        return {
          icon: <BsXCircle size={60} color="red" className="mx-auto my-3" />,
          title: "Payment Failed!",
          message:
            "Unfortunately, your payment could not be completed. Please try again.",
          variant: "danger",
        };
      case "cancel":
        return {
          icon: (
            <BsExclamationCircle
              size={60}
              color="orange"
              className="mx-auto my-3"
            />
          ),
          title: "Payment Cancelled!",
          message:
            "You have cancelled the payment process. Please try again if needed.",
          variant: "warning",
        };
      default:
        return {
          icon: null,
          title: "Unknown Status",
          message: "Something went wrong. Please try again.",
          variant: "secondary",
        };
    }
  };

  const { icon, title, message } = getMessageDetails(status);

  return (
    <Card className="text-center p-3 my-3">
      {icon}
      <h2 className={`text-${status}`}>{title}</h2>
      <p>{message}</p>
    </Card>
  );
};

export default PaymentStatusMessage;
