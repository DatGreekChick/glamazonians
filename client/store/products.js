import axios from 'axios'

/**
 * ACTION TYPES
 */
const FETCH = 'FETCH'
const CREATE = 'CREATE'
const REMOVE = 'REMOVE'
const UPDATE = 'UPDATE'
/**
 * ACTION CREATORS
 */
const fetch = products => ({type: FETCH, products})
const create = product => ({type: CREATE, product})
const remove = id => ({ type: REMOVE, id })
const update = product => ({ type: UPDATE, product })
/**
 * THUNK CREATORS
 */
export const fetchAllProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res => {
        dispatch(fetch(res.data))})
      .catch(err => console.log(err))

export const getSingleProduct = id =>
  dispatch =>
    axios.get(`/api/products/${id}`)
      .then(res =>
        dispatch(update(res.data)))
      .catch(err => console.log(err))

export const postProduct = product =>
  dispatch =>
    axios.post('/api/products', product)
      .then(res =>
        dispatch(create(res.data || product)))
      .catch(err => console.log(err))

export const updateProduct = (id, product) =>
  dispatch =>
    axios.put(`/api/products/${id}`, product)
      .then(res =>
        dispatch(update(res.data)))
      .catch(err => console.log(err))

export const deleteProduct = id =>
  dispatch => {
    dispatch(remove(id));
    axios.delete(`/products/${id}`)
      .catch(err => console.log(err))
  };
/**
 * REDUCER
 */
export default function (products = [], action) {
  switch (action.type) {
    case FETCH:
      return action.products;
    case CREATE:
      return [action.product, ...products]
    case REMOVE:
      return products.filter(product => product.id !== action.id )
    case UPDATE:
      return products.map(product => (
        action.product.id === product.id ? action.product : product
      ));
    default:
      return products
  }
}
