import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { deleteItem, increaseItem, decreaseItem } from '../store';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Cart = (props) => {
  console.log(props.cart);
  return (
    <div>
    <NotificationContainer />
    {
      props.cart &&
      props.cart.map(item => (
        <div key={item.id}>
          <img className="thumbnail" src={item.image} />
          <div>{item.name}</div>
          <div>{item.priceInDollars}</div>
          <div>{item.quantityInCart}</div>
          <button
            onClick={() => {
            NotificationManager.success(`You added one ${item.name} to your cart`, 'Added Item');
            props.onIncrease(item)
          }}>^</button>
          <button
            onClick={() => {
            NotificationManager.warning(`You removed one ${item.name} from your cart`, 'Removed Item');
            props.onDecrease(item)
          }}
          disabled={item.quantityInCart === 1}
          >v</button>
          <button onClick={() => {
            NotificationManager.error(`You removed ${item.name} from your cart`, 'Removed Item');
            props.onDelete(item.id)}}>X</button>
        </div>
      ))
    }
    </div>
  );
};

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
