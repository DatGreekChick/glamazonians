import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Reviews from './Reviews';
import { connect } from 'react-redux';
import {
  fetchSingleProduct,
  // getSimilarProducts,
  addItem
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
    this.props.onAdd(product);
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
          <div>
            {product.tags.map(tag => {
              return <Link to={`/products`}> {tag} </Link>
            })}
          </div>
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
  }

});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);
