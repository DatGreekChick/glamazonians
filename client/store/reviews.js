'use strict';
import axios from 'axios';

const CREATE_REVIEW = 'CREATE_REVIEW';

const createReview = review => ({
  type: CREATE_REVIEW,
  review
})

export const postReview = review =>
dispatch =>
  axios.post('/api/reviews', review)
    .then(res =>
      {
      dispatch(createReview(res.data))
        return res.data;
    })
    .catch(err => console.log(err))

export default function (state = {}, action) {
  switch (action.type){
    case CREATE_REVIEW:
      return action.review;
    default:
      return state;
  }
}
