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
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// Reducer for initiating payment
export const orderPaymentInitiateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_INITIATE_REQUEST:
      return { loading: true };
    case ORDER_PAYMENT_INITIATE_SUCCESS:
      return { loading: false, success: true, paymentData: action.payload };
    case ORDER_PAYMENT_INITIATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer for payment success
// export const orderPaymentSuccessReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ORDER_PAYMENT_SUCCESS_REQUEST:
//       return { loading: true };
//     case ORDER_PAYMENT_SUCCESS_SUCCESS:
//       return { loading: false, success: true };
//     case ORDER_PAYMENT_SUCCESS_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// // Reducer for payment failure
// export const orderPaymentFailReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ORDER_PAYMENT_FAIL_REQUEST:
//       return { loading: true };
//     case ORDER_PAYMENT_FAIL_SUCCESS:
//       return { loading: false, success: true };
//     case ORDER_PAYMENT_FAIL_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_DELIVER_RESET:
      return {};

    default:
      return state;
  }
};

export const orderListMyReducer = (
  state = { orders: [], page: 1, pages: 1, total: 0 },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
        orders: [],
      };

    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders, // Store the orders
        page: action.payload.page, // Store the current page
        pages: action.payload.pages, // Store the total number of pages
        total: action.payload.total, // Store the total number of orders
      };

    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_LIST_MY_RESET:
      return {
        orders: [],
        page: 1,
        pages: 1,
        total: 0,
      };

    default:
      return state;
  }
};

export const orderListReducer = (
  state = { orders: [], page: 1, pages: 1, total: 0 },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true, orders: [] };

    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        page: action.payload.page,
        pages: action.payload.pages,
        total: action.payload.total,
      };

    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
