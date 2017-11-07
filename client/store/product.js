import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_NEW_PRODUCT_REVIEW = 'GET_NEW_PRODUCT_REVIEW'
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT'
/**
 * ACTION CREATORS
 */
export const getNewProductReview = review => ({ type: GET_NEW_PRODUCT_REVIEW, review});
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
    case GET_NEW_PRODUCT_REVIEW:
      return {...product, reviews: [ action.review, ...product.reviews ]}
    default:
      return product
  }
}
