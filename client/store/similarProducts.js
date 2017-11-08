import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS_BY_TAG = 'GET_PRODUCTS_BY_TAG'

/**
 * ACTION CREATORS
 */
export const getSimilarProducts = similarProducts => ({ type: GET_PRODUCTS_BY_TAG, similarProducts});

/**
 * THUNK CREATORS
 */


export const fetchSimilarProduct = (tag) =>
  dispatch => {
    axios.get(`/api/products/tags?tag=${tag}`)
    .then(res => res.data)
    .then((similarProducts) => {
      return dispatch(getSimilarProducts(similarProducts))
    })
    .catch(err => console.log(err))
  }


/**
 * REDUCER
 */
export default function ( similarProducts = [], action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_TAG:
      return action.similarProducts;
      return similarProducts;
  }
}
