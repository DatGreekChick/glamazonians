import axios from 'axios';
import history from '../history';

// ACTION TYPES

const CREATE_ORDER = 'CREATE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

// ACTION CREATORS

const createOrder = order => ({ type: CREATE_ORDER, order });
const updateOrder = order => ({ type: UPDATE_ORDER, order });

// THUNK CREATORS

export const createNewOrder = orderData => dispatch => {
  axios
    .post(`/api/orders/create`, orderData)
    .then(res => dispatch(createOrder(res.data)))
    .then(() => history.push('/checkout'))
    .catch(err => console.error(err));
};

export const updateOneOrder = orderData => dispatch => {
  axios
    .put(`/api/orders/${orderData.id}`, orderData)
    .then(res => dispatch(updateOrder(res.data)))
    .then(() => history.push('/products'))
    .catch(err => console.error(err));
};

/**
 * REDUCER
 */
export default function(order = {}, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return action.order;
    case UPDATE_ORDER:
      return action.order;
    default:
      return order;
  }
}
