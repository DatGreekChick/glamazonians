import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NotificationContainer } from 'react-notifications';
import CartItem from './CartItem';
import CartTotals from './CartTotals';

export const Cart = (props) => {
    // Check for empty cart and rendering the cart items, totals, and checkout button if item is in cart
  return (
<div>{
    props.cart.length ? (
      <div id="cart" className="container">
          <table className="shopping-cart" style={{ width: '100%' }}>
            <tbody>
              <tr className="column-labels">
                <th className="product-image">Image</th>
                <th className="product-details">Product</th>
                <th className="product-price">Price</th>
                <th className="product-quantity">Quantity</th>
                <th className="product-removal">Remove</th>
                <th className="product-line-price">Total</th>
              </tr>
              {props.cart.map((item, i) => <CartItem item={item} key={i} cart={props.cart} />)}
            </tbody>
          </table>
        <CartTotals cart={props.cart} />
        <button className="checkout">Checkout</button>
        <NotificationContainer />
  </div>
      )
      //OR: if no items in cart, render empty cart message
    : (
        <div id="empty">
          <h1>Your cart is empty</h1>
        </div>
      )
    }</div>
  )
}

const mapState = state => {
  return {
    cart: state.cart
  };
};

export default withRouter(connect(mapState)(Cart));
