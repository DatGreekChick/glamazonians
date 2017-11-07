import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../store';
var FontAwesome = require('react-fontawesome');

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = ({ children, handleClick, isLoggedIn, cart }) => {
  return (
    <div>
      <h1>Glamazonians</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/products">Products</Link>
            <div className="cart-nav">
            <Link to="/home" ><FontAwesome
            name="user-circle-o" size="2x"
                          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} /></Link>

            <Link to="/cart"><FontAwesome
name="shopping-cart" size="2x"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} /></Link>
            </div>

          </div>
        ) : (
          <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/products">Products</Link>
            <div className="cart-nav">
              <Link to="/cart"><FontAwesome
name="shopping-cart" size="2x"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} /></Link>
            </div>
          </div>
        )}
      </nav>
      <hr />
      {children}
      <hr />
      <footer>
        <span>GraceShopper&trade;</span>
        <Link to="/about">
          <span>About Us</span>
        </Link>
      </footer>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
