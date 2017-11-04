import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { deleteItem, increaseItem, decreaseItem } from '../store';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export class Cart extends Component {
  constructor(){
    super();
  }


  getCartTotal() {
    var individualPrices = this.props.cart.map(el => el.quantityInCart * el.priceInDollars)
    var total = individualPrices.reduce( (sum, value) => sum + value );
    return total;
  }


  componentWillUpdate(){
    this.getCartTotal();

  }

  render(){
  return (
    <div id="cart">
    <NotificationContainer />
    {
      this.props.cart.length &&
      this.props.cart.map(item => (
        <div key={item.id}>
          <img className="thumbnail" src={item.image} />
          <div>{item.name}</div>
          <div>{item.priceInDollars}</div>
          <div>{item.quantityInCart}</div>
          <button
            onClick={() => {
            NotificationManager.success(`You added one ${item.name} to your cart`, 'Added Item');
            this.props.onIncrease(item)
          }}>^</button>
          <button
            onClick={() => {
            NotificationManager.warning(`You removed one ${item.name} from your cart`, 'Removed Item');
            this.props.onDecrease(item)
          }}
          disabled={item.quantityInCart === 1}
          >v</button>
          <button onClick={() => {
            NotificationManager.error(`You removed ${item.name} from your cart`, 'Removed Item');
            this.props.onDelete(item.id)}}>X</button>
        </div>
      ))
    }
    {
      this.props.cart.length && (
      <div id="total">
        <h1>Total:</h1>
        <h2>&#x24;  {this.getCartTotal()}</h2>
      </div>
      )}
      {
        !this.props.cart.length &&
        <div id="empty">
          <h1>
            Your cart is empty
          </h1>
        </div>
      }
    </div>

  );
}
}

const mapState = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => ({
  onDelete (product) {
      dispatch(deleteItem(product))
    },
  onIncrease (product) {
    dispatch(increaseItem(product))
  },
  onDecrease (product) {
    dispatch(decreaseItem(product))
  }
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
