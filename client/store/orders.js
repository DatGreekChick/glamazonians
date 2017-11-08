import axios from 'axios';

const FETCH_ORDERS = 'FETCH_ORDERS';

const fetchOrders = orders => ({type: FETCH_ORDERS, orders})

export const fetchAllOrders = (id) =>
dispatch =>
  axios.get(`/api/orders/${id}`)
    .then(res => {
      dispatch(fetchOrders(res.data))})
    .catch(err => console.log(err))


    export default function (orders = [], action) {
      switch (action.type) {
        case FETCH_ORDERS:
        return action.orders;
        default:
          return orders
      }
    }
