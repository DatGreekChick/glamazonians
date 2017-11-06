import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { addItem, increaseItem } from '../store';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const AllProducts = (props) => {
  const clickHandle = (product) => {
    NotificationManager.success(`You added ${product.name} to your cart`, 'Added Item');
    if (props.cart.indexOf(product) > -1){
      props.onIncrease(product)
    } else {
      props.onAdd(product);
    }
  }
return (
  <div>
  <NotificationContainer />
    <h1>Products</h1>
    <div>
      { props.products &&
        props.products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.image} />
              <div>{product.name}</div>
              <div>{product.priceInDollars}</div>
            </Link>
            <button
              onClick={() => clickHandle(product)} >ADD</button>
            </div>
          )
        )
      }
    </div>
  </div>
  );
}

const mapState = (state) => {
  return {
    products: state.products,
    cart: state.cart,
    user: state.user
  }
}

  const mapDispatch = (dispatch) => ({
    onAdd (product) {
        dispatch(addItem(product))
      },
    onIncrease (product) {
          dispatch(increaseItem(product))
        }
      }
  );

export default withRouter(connect(mapState, mapDispatch)(AllProducts));
