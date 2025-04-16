import axios from "axios";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_PAYMENT_INITIATE_REQUEST,
  ORDER_PAYMENT_INITIATE_SUCCESS,
  ORDER_PAYMENT_INITIATE_FAIL,
  // ORDER_PAYMENT_SUCCESS_REQUEST,
  // ORDER_PAYMENT_SUCCESS_SUCCESS,
  // ORDER_PAYMENT_SUCCESS_FAIL,
  // ORDER_PAYMENT_FAIL_REQUEST,
  // ORDER_PAYMENT_FAIL_SUCCESS,
  // ORDER_PAYMENT_FAIL_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../constants/OrderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstant";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
// Action to create a new order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/orders/add/`,
      order,
      config
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data, // Order data
    });

    dispatch({ type: CART_CLEAR_ITEMS });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Initiate Payment
export const initiatePayment =
  (orderId, totalPrice) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAYMENT_INITIATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      if (!userInfo) {
        throw new Error("User not authenticated");
      }

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/orders/initiate-payment/`,
        { order_id: orderId, totalPrice },
        config
      );

      if (data.GatewayPageURL) {
        dispatch({
          type: ORDER_PAYMENT_INITIATE_SUCCESS,
          payload: data,
        });
        window.location.href = data.GatewayPageURL;
      } else {
        throw new Error("Payment initiation failed. GatewayPageURL missing.");
      }
    } catch (error) {
      dispatch({
        type: ORDER_PAYMENT_INITIATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// // Handle Payment Success
// export const paymentSuccess = (tran_id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_PAYMENT_SUCCESS_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     if (!userInfo) {
//       throw new Error("User not authenticated");
//     }

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.post(
//       `/api/orders/payment-success/`,
//       { tran_id },
//       config
//     );

//     dispatch({
//       type: ORDER_PAYMENT_SUCCESS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ORDER_PAYMENT_SUCCESS_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// // Handle Payment Failure
// export const paymentFail = (tran_id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ORDER_PAYMENT_FAIL_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     if (!userInfo) {
//       throw new Error("User not authenticated");
//     }

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.post(
//       `/api/orders/payment-fail/`,
//       { tran_id },
//       config
//     );

//     dispatch({
//       type: ORDER_PAYMENT_FAIL_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ORDER_PAYMENT_FAIL_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/orders/${id}/`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/api/orders/${id}/pay/`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/api/orders/${order._id}/deliver/`,
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listMyOrders =
  (page = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_MY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${BASE_URL}/api/orders/myorders/?page=${page}`,
        config
      );

      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data, // Ensure that the response data includes 'orders', 'page', 'pages', and 'total'
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listOrders =
  (page = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${BASE_URL}/api/orders/?page=${page}`,
        config
      );

      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
