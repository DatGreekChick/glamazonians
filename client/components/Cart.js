import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deleteItem, increaseItem, decreaseItem } from '../store';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';

export class Cart extends Component {
  constructor() {
    super();
  }

  getCartTotal() {
    // TODO: update to const or let
    var individualPrices = this.props.cart.map(
      el => el.quantityInCart * el.price / 100
    );
    var total = individualPrices.reduce((sum, value) => sum + value);
    return Number(total.toFixed(2));
  }

  componentWillUpdate() {
    this.getCartTotal();
  }

  render() {
    /*
      TODO:
      - break out into multiple components
        - CartItem
        - EmptyCart
        - CartTotal
      - make HTML more semantic (table instead of divs)
    */
    let cart;
    if (this.props.cart.length) {
      cart = (
        <div className="shopping-cart">
          <div className="column-labels">
            <label className="product-image">Image</label>
            <label className="product-details">Product</label>
            <label className="product-price">Price</label>
            <label className="product-quantity">Quantity</label>
            <label className="product-removal">Remove</label>
            <label className="product-line-price">Total</label>
          </div>
          {this.props.cart.map(item => (
            <div key={item.id} className="product">
              <div className="product-image">
                <img src={item.image} />
              </div>
              <div className="product-details">
                <div className="product-title">{item.name}</div>
                <p className="product-description">{item.description}</p>
              </div>
              <div className="product-price"> {item.priceInDollars}</div>
              <div className="product-quantity">
                {/* TODO: make button onClick functions component methods? */}
                <button
                  onClick={() => {
                    NotificationManager.success(
                      `You added one ${item.name} to your cart`,
                      'Added Item'
                    );
                    this.props.onIncrease(item);
                  }}
                >
                  +
                </button>
                <span>  {item.quantityInCart}  </span>
                <button
                  onClick={() => {
                    NotificationManager.warning(
                      `You removed one ${item.name} from your cart`,
                      'Removed Item'
                    );
                    this.props.onDecrease(item);
                  }}
                  disabled={item.quantityInCart === 1}
                >
                  -
                </button>
              </div>
              <div className="product-removal">
                <button
                  className="remove-product"
                  onClick={() => {
                    NotificationManager.error(
                      `You removed ${item.name} from your cart`,
                      'Removed Item'
                    );
                    this.props.onDelete(item.id);
                  }}
                >
                  X
                </button>
              </div>
              <div className="product-line-price">
                {(item.priceInDollars * item.quantityInCart).toFixed(2)}
              </div>
            </div>
          ))}
          <div id="totals">
            <div className="totals-item">
              <label>Subtotal</label>
              <div className="totals-value" id="cart-subtotal">
              {this.getCartTotal()}
              </div>
            </div>
            <div className="totals-item">
              <label>Tax (5%)</label>
              <div className="totals-value" id="cart-tax">
                {(this.getCartTotal() * 0.0635).toFixed(2)}
              </div>
            </div>
            <div className="totals-item">
              <label>Shipping</label>
              <div className="totals-value" id="cart-shipping">{(this.getCartTotal() * 0.08).toFixed(2)}</div>
            </div>
            <div className="totals-item totals-item-total">
              <label>Total:</label>
              <div className="total-value" id="cart-total"> &#x24;
              {(this.getCartTotal() * 1.1435).toFixed(2)}
              </div>
            </div>
          </div>
          <button className="checkout">Checkout</button>
        </div>
      );
    } else {
      cart = (
        <div id="empty">
          <h1>Your cart is empty</h1>
        </div>
      );
    }
    return (
      <div id="cart" className="container">
        {cart}
        <NotificationContainer />
      </div>
    );
  }
}

const mapState = state => {
  return {
    cart: state.cart
  };
};

const mapDispatch = dispatch => ({
  onDelete(product) {
    dispatch(deleteItem(product));
  },
  onIncrease(product) {
    dispatch(increaseItem(product));
  },
  onDecrease(product) {
    dispatch(decreaseItem(product));
  }
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
