'use strict';
import axios from 'axios';

const CREATE_ITEM = 'CREATE_ITEM';

const createItem = item => ({
  type: CREATE_ITEM,
  item
})

export const postItem = item =>
dispatch =>
  axios.post('/api/items', item)
    .then(res =>
      {
      dispatch(createItem(res.data))
        return res.data;
    })
    .catch(err => console.log(err))

export default function (state = {}, action) {
  switch (action.type){
    case CREATE_ITEM:
      return action.item;
    default:
      return state;
  }
}
