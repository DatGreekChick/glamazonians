import axios from 'axios'

// ACTION TYPES

const CREATE_ORDER = 'CREATE_ORDER'

// ACTION CREATORS

const createOrder = order => ({type: CREATE_ORDER, order})

// THUNK CREATORS

export const createNewOrder = (orderData) =>
  dispatch => {
    axios.post(`/api/orders/`, orderData)
    .then(res => dispatch(createOrder(res.data)))
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
