// import axios from 'axios'

const ADD = 'ADD'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

const add = item => ({type: ADD, item })
const removeCartItem = id => ({type: REMOVE_CART_ITEM, id});
const updateCartItem = item => ({type: UPDATE_CART_ITEM, item})
const increase = item => ({type: INCREASE, item});
const decrease = item => ({type: DECREASE, item});


export const addItem = item =>
  dispatch =>
    dispatch(add(item));

export const updateCartItemItem = (item) =>
  dispatch =>
    dispatch(updateCartItem(item));

export const deleteItem = id =>
  dispatch =>
    dispatch(removeCartItem(id));

export const increaseItem = item =>
  dispatch =>
    dispatch(increase(item));

export const decreaseItem = item =>
  dispatch =>
    dispatch(decrease(item));

/**
* REDUCER
*/
export default function (state = [], action) {
  switch (action.type) {
    case ADD:
      action.item.quantityInCart++;
      return [...state, action.item]
    case REMOVE_CART_ITEM:
      return state.filter(item => item.id !== action.id )
    case UPDATE_CART_ITEM:
      return state.map(item => (
        action.item.id === item.id ? action.item : item
      ));
    case INCREASE:
      action.item.quantityInCart++;
      return state.map(item =>
        (action.item.id === item.id
          ? action.item
          : item));
    case DECREASE:
      if (action.item.quantityInCart > 1) {
        action.item.quantityInCart--;
        return state.map(item =>
      (action.item.id === item.id
        ? action.item
        : item));
      } else {
        return state.filter(item => item.id !== action.id );
      }
    default:
      return state
  }
}
