import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { updateOneOrder } from '../store';

/**
 * COMPONENT
 */
const Checkout = ({ updateOrder, order }) => {
  function handleSubmit(evt) {
    evt.preventDefault();
    const name = evt.target.name.value;
    const email = evt.target.email.value;
    const line1 = evt.target.line1.value;
    const line2 = evt.target.line2.value;
    const city = evt.target.city.value;
    const state = evt.target.state.value;
    const zipcode = evt.target.zipcode.value;
    updateOrder(order.id);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">
              <small>Name</small>
            </label>
            <input name="userName" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="line1">
              <small>Line1</small>
            </label>
            <input name="line1" type="text" />
          </div>
          <div>
            <label htmlFor="line2">
              <small>Line2</small>
            </label>
            <input name="line2" type="text" />
          </div>
          <div>
            <label htmlFor="city">
              <small>City</small>
            </label>
            <input name="city" type="text" />
          </div>
          <div>
            <label htmlFor="state">
              <small>State</small>
            </label>
            <input name="state" type="text" />
          </div>
          <div>
            <label htmlFor="zipcode">
              <small>Zip Code</small>
            </label>
            <input name="zipcode" type="text" />
          </div>
          <div>
            <label htmlFor="creditcard">
              <small>Credit Card</small>
            </label>
            <input name="creditcard" type="text" />
          </div>
          <div>
            <button type="submit">Purchase</button>
          </div>
        </div>
      </form>
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
const mapState = state => ({
  order: state.order
});

const mapDispatch = dispatch => {
  return {
    updateOrder(evt) {
      dispatch(udpateOneOrder());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Checkout));

/**
 * PROP TYPES
 */
Checkout.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
