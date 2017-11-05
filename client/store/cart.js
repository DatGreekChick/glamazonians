// import axios from 'axios'

const ADD = 'ADD'
const UPDATE = 'UPDATE'
const REMOVE = 'REMOVE'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

const add = item => ({type: ADD, item })
const remove = id => ({type: REMOVE, id});
const update = item => ({type: UPDATE, item})
const increase = item => ({type: INCREASE, item});
const decrease = item => ({type: DECREASE, item});


export const addItem = item =>
  dispatch =>
    dispatch(add(item));

export const updateItem = (item) =>
  dispatch =>
    dispatch(update(item));

export const deleteItem = id =>
  dispatch =>
    dispatch(remove(id));

export const increaseItem = item =>
  dispatch =>
    dispatch(increase(item));

export const decreaseItem = item =>
  dispatch =>
    dispatch(decrease(item));

export const increaseItem = item =>
dispatch =>
dispatch(increase(item));

/**
* REDUCER
*/
export default function (state = [], action) {
  switch (action.type) {
    case ADD:
      action.item.quantityInCart++;
      return [...state, action.item]
    case REMOVE:
      return state.filter(item => item.id !== action.id )
    case UPDATE:
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
