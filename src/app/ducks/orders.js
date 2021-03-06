import produce from 'immer';
import axios from '../../common/axios-orders';

// Actions
const POST_ORDER_REQUEST = 'orders/postRequest';
const POST_ORDER_SUCCESS = 'orders/postSuccess';
const POST_ORDER_FAIL = 'orders/postFail';
const GET_ORDERS_REQUEST = 'orders/getRequest';
const GET_ORDERS_SUCCESS = 'orders/getSuccess';
const GET_ORDERS_FAIL = 'orders/getFail';

// Reducer
const initialState = {
  orders: [],
  error: null,
};

export default function ordersReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case POST_ORDER_SUCCESS:
        draft.error = null;
        return;
      case POST_ORDER_FAIL:
        draft.error = action.error;
        return;
      case GET_ORDERS_SUCCESS: {
        // transform orders object into an array of orders
        const orders = Object.entries(action.orders).map(([id, order]) => ({
          id,
          ...order,
        }));
        draft.orders = orders;
        draft.error = null;
        return;
      }
      case GET_ORDERS_FAIL:
        draft.error = action.error;
        return;
      default:
        return;
    }
  });
}

// Action Creators
export const postOrderRequest = (order) => ({
  type: POST_ORDER_REQUEST,
  order,
});
export const postOrderSuccess = (id, order) => ({
  type: POST_ORDER_SUCCESS,
  id,
  order,
});
export const postOrderFail = (error) => ({ type: POST_ORDER_FAIL, error });
export const getOrdersRequest = () => ({ type: GET_ORDERS_REQUEST });
export const getOrdersSuccess = (orders) => ({
  type: GET_ORDERS_SUCCESS,
  orders,
});
export const getOrdersFail = (error) => ({
  type: GET_ORDERS_FAIL,
  error,
});

// Thunk Action Dispatchers
export const postOrder = (order, idToken) => async (dispatch) => {
  try {
    dispatch(postOrderRequest(order));
    const response = await axios.post(`/orders.json?auth=${idToken}`, order);
    dispatch(postOrderSuccess(response.data.name, order));
    return response;
  } catch (err) {
    dispatch(postOrderFail(err));
    return Promise.reject(err);
  }
};
export const getOrders = (idToken, localId) => async (dispatch) => {
  try {
    dispatch(getOrdersRequest());
    const queryParams = `?auth=${idToken}&orderBy="localId"&equalTo="${localId}"`;
    const response = await axios.get(`/orders.json${queryParams}`);
    dispatch(getOrdersSuccess(response.data));
    return response;
  } catch (err) {
    dispatch(getOrdersFail(err.response ? err.response.data : err));
    return Promise.reject(err);
  }
};
