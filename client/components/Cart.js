import React from 'react';
import { connect } from 'react-redux'
import { deleteItem } from '../store';

// implement a way to increase quantity with addItem reducer so that the items aren't just pushed into an array over and over

const Cart = (props) => {
  console.log(props.cart);
  return (
    <div>
    {
      props.cart &&
      props.cart.map(item => (
        <div key={item.id}>
          <img className="thumbnail" src={item.image} />
          <div>{item.name}</div>
          <div>{item.priceInDollars}</div>
          <button onClick={() => {
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
    }
});

export default connect(mapState, mapDispatch)(Cart);
