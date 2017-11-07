import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Reviews from './Reviews';
import { connect } from 'react-redux';
import {
  fetchSingleProduct,
  addItem,
  increaseItem,
  decreaseItem,
} from '../store';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';

class SingleProduct extends Component {


  componentWillMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchSelectedProduct(productId);
  }

  addHandler(product) {
    NotificationManager.success(
      `You added ${product.name} to your cart`,
      'Added Item'
    );
    if (this.props.cart.indexOf(product) > -1) {
      this.props.onIncrease(product);
    } else {
      this.props.onAdd(product);
    }
  }

  decreaseHandler(product) {
    NotificationManager.warning(
      `You removed one ${product.name} from your cart`,
      'Removed Item'
    );
    this.props.onDecrease(product);
  }

  increaseHandler(product) {
    NotificationManager.success(
      `You added one ${product.name} to your cart`,
      'Added Item'
    );
    this.props.onIncrease(product);
  }


  render() {
    const { product } = this.props;
    return (
      <div className="products oneProduct">
        <h1 className="title">{product.name}</h1>
        <img src={product.image} />
        <div className="product-info">
          <h2> &#36; {product.priceInDollars} </h2>
          <h4>{product.description}</h4>
          <span>
            <h3>Quantity: {product.quantityInCart}</h3>
          </span>
          <button
            onClick={() => {
              this.increaseHandler(product);
            }}
            disabled={product.quantityInCart < 1}
          >
            &#x21e7;
          </button>
          <button
            onClick={() => {
              this.decreaseHandler(product);
            }}
            disabled={product.quantityInCart <= 1}
          >
            &#x21e9;
          </button>
          <div>
            <button
              className="addButton"
              onClick={() => {
                this.addHandler(product);
              }}
            >
              Add To Cart
            </button>
          </div>
          <Reviews />
        </div>
        <NotificationContainer />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    cart: state.cart,
    product: state.product,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSelectedProduct: product => {
    dispatch(fetchSingleProduct(product));
  },
  onAdd: product => {
    dispatch(addItem(product));
  },
  onIncrease: product => {
    dispatch(increaseItem(product));
  },
  onDecrease: product => {
    dispatch(decreaseItem(product));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
