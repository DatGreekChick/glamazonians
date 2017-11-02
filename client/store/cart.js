// import axios from 'axios'

const ADD = 'ADD'
const UPDATE = 'UPDATE'
const REMOVE = 'REMOVE'

const add = item => ({type: ADD, item })
const remove = id => ({type: REMOVE, id});
const update = item => ({type: UPDATE, item})

export const addItem = item =>
dispatch =>
dispatch(add(item));

export const updateItem = (item) =>
dispatch =>
dispatch(update(item));

export const deleteItem = id =>
dispatch =>
dispatch(remove(id));

/**
* REDUCER
*/
export default function (state = [], action) {
switch (action.type) {
  case ADD:
    return [...state, action.item]
  case REMOVE:
    return state.filter(item => item.id !== action.id )
  case UPDATE:
    return state.map(item => (
      action.item.id === item.id ? action.item : item
    ));
  default:
    return state
  }
}


//How to implement on page;

// import {addItem, deleteItem} from '../store';


// onAdd () {
//   dispatch(addItem(product))
// };

// onDelete () {
//   dispatch(deleteItem(3))
// }

// <button onClick={props.onAdd}>ADD</button>
// <button onClick={props.onDelete}>DELETE</button>
