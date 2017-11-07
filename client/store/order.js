import axios from 'axios';
import history from '../history';

// ACTION TYPES

const CREATE_ORDER = 'CREATE_ORDER'

// ACTION CREATORS

const createOrder = order => ({type: CREATE_ORDER, order})

// THUNK CREATORS

export const createNewOrder = (orderData) =>
  dispatch => {
    axios.post(`/api/orders/create`, orderData)
    .then(res => dispatch(createOrder(res.data)))
    .then(() => history.push('/home'))
    .catch(err => console.error(err))
  }

/**
 * REDUCER
 */
export default function ( order = [], action) {
  switch (action.type) {
    case CREATE_ORDER:
      return action.order;
    default:
      return order
  }
}
