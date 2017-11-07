import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { auth, signUpAuth } from '../store';
import FontAwesome from 'react-fontawesome';
/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName, handleSubmit, error, match }) => {
  return (
    <div className="userForm">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          {match.path === '/signup' && (
            <div>
              <label htmlFor="name">
                Name
              </label>
              <input name="userName" type="text" />
            </div>
          )}
          <div>
            <label htmlFor="email">
              Email
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              Password
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button className="loginButton" type="submit">
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </div>
      </form>
      <div>
        <a href="/auth/google">
          <FontAwesome name="google-plus-square" className="social google" />
          <span className="socialText"> {displayName} with Google</span>
        </a>
      </div>
      <div>
        <a href="/auth/facebook">
          <FontAwesome
            name="facebook-square"
            className="social facebook"
          />{' '}
          <span className="socialText"> {displayName} with Facebook</span>
        </a>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error
});

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error
});

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      !evt.target.userName
        ? dispatch(auth(email, password, formName))
        : dispatch(
            signUpAuth(evt.target.userName.value, email, password, formName)
          );
    }
  };
};

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm));
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm));

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
