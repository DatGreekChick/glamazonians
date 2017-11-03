import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import {
  Main,
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  Orders,
  About,
  ContactUs,
  Careers,
  FAQs,
  MyAccount,
  Cart,
  SingleReview,
  ThankYou,
  AddReviewForm,
  SingleOrder
} from './components';
import { me, fetchAllProducts } from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/about" component={About} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/careers" component={Careers} />
            <Route path="/faqs" component={FAQs} />
            <Route path="/cart" component={Cart} />
            <Route path="/thank-you" component={ThankYou} />
            <Route
              exact
              path="/products/:productId"
              component={SingleProduct}
            />
            <Route
              exact path="/products/:productId/currentReview"
              component={SingleReview}
            />
            <Route
              exact path="/products/:productId/addReview"
              component={AddReviewForm}
            />
            <Route exact path="/products" component={AllProducts} />
            {isLoggedIn && (
              <Switch>
                <Route exact path="/home" component={UserHome} />
                <Route exact path="/myAccount" component={MyAccount} />
                <Route exact path="/orders" component={Orders} />
                <Route path="/orders/:orderId" component={SingleOrder} />
              </Switch>
            )}
            {isAdmin && (
              <Switch>
                <Route exact path="/users" component={Users} />
                <Route path="/users/:userId" component={SingleUser} />
                <Route exact path="/orders" component={Orders} />
                <Route path="/orders/:orderId" component={SingleOrder} />
                <Route exact path="/addProduct" component={AddProductForm} />
              </Switch>
            )}
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
  // Otherwise, state.user will be an empty object, and state.user.id will be falsey
  isAdmin: !!state.user.isAdmin,
  isLoggedIn: !!state.user.id
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
    dispatch(fetchAllProducts());
  }
});

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
};
