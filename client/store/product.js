import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT'
/**
 * ACTION CREATORS
 */
const getOneProduct = product => ({type: GET_ONE_PRODUCT, product})

/**
 * THUNK CREATORS
 */


export const fetchSingleProduct = (productId) =>
  dispatch => {
    axios.get(`/api/products/${productId}`)
    .then(res => res.data)
    .then((product) => {
      return dispatch(getOneProduct(product))
    })
    .catch(err => console.log(err))
  }

/**
 * REDUCER
 */
export default function ( product = [], action) {
  switch (action.type) {
    case GET_ONE_PRODUCT:
      return action.product;
    default:
      return product
  }
}
