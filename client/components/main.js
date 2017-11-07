import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { logout } from '../store';

const FontAwesome = require('react-fontawesome');

const Main = ({children, handleClick, isLoggedIn}) => {
  return (
    <div>
      <div className="header">
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these navLinks after you log in */}
              <NavLink to='/home'><strong>Cage Match</strong></NavLink>
              <NavLink to="/home">Home</NavLink>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <NavLink to="/products">Products</NavLink>
              <div className="cart-nav">
                <Link to="/cart"><FontAwesome
                  name="shopping-cart" size="2x"
                  style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}/></Link>
              </div>
            </div>
          ) : (
            <div>
              {/* The navbar will show these navLinks before you log in */}
              <NavLink to='/home'><strong>Cage Match</strong></NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/products">Products</NavLink>
              <div className="cart-nav">
                <Link to="/cart"><FontAwesome
                  name="shopping-cart" size="2x"
                  style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}/></Link>
              </div>
            </div>
          )}
        </nav>
      </div>
      <hr/>
      {children}
      <hr/>
      <footer>
        <span>GraceShopper&trade; </span>
        <NavLink to="/about">
          <span> About Us</span>
        </NavLink>
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
