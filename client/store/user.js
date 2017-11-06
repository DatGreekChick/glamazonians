import axios from 'axios';
import history from '../history';

const GET_USER = 'GET_USER',
  GET_USERS = 'GET_USERS',
  UPDATE_USER = 'UPDATE_USER',
  REMOVE_USER = 'REMOVE_USER';

const defaultUser = {};

const getUser = user => ({ type: GET_USER, user });
const getUsers = users => ({ type: GET_USERS, users });
const updateUser = user => ({ type: UPDATE_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(res => {
      dispatch(getUser(res.data));
      history.push('/products');
    })
    .catch(error => dispatch(getUser({ error })));

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser());
      history.push('/login');
    })
    .catch(err => console.log(err));

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case GET_USERS:
      return action.users;
    case UPDATE_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
