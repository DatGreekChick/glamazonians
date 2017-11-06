import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { fetchSingleProduct, addItem, increaseItem, decreaseItem } from '../store';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class SingleProduct extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchSelectedProduct(productId);

  }

  render() {
    const product = this.props.product;
    console.log(product.reviews)
    return (
      <div className='products single-product'>
        <h1 className='title'>{product.name}</h1>
        <img src={product.image}/>

        <div className="product-info">
          <h3> &#36; {product.priceInDollars} </h3>
          <span>Quantity: {product.quantityInCart}</span>
          <div className='button-container'>
            <button
className="btn btn-info" onClick={() => {
            NotificationManager.success(`You added ${product.name} to your cart`, 'Added Item');
              if (this.props.cart.indexOf(product) > -1){
                this.props.onIncrease(product)
              } else {
                this.props.onAdd(product);
              }
              }}>ADD</button>
            <button onClick={() => {
              NotificationManager.success(`You added one ${product.name} to your cart`, 'Added Item');
              this.props.onIncrease(product);
            }}>
              &#x21e7;
            </button>
            <button
              onClick={() => {
                NotificationManager.warning(
                  `You removed one ${product.name} from your cart`,
                  'Removed Item'
                );
                this.props.onDecrease(product);
              }}
              disabled={product.quantityInCart === 1}
            >
              &#x21e9;
            </button>
          </div>
          <div className='review-container'>
            <h2>Reviews</h2>
            <hr/>
            {product.reviews.map(review => {
             return(  <div key={review.id}>
                <h3>{review.title}</h3>
                <h4>user: {review.userId}</h4>
                <span> Rating: {reviewStars(review.rating)}</span>
                <p>{review.description}</p>
              </div>)
            })}
          </div>
        </div>
      </div>
    );
  }
};

function reviewStars(rating) {
  let starRating = ['☆','☆','☆','☆','☆']
  for(let i = 0; i < rating; i++){
    starRating.pop();
    starRating.unshift('★')
  }
  return (starRating.join(' '));
}

const mapStateToProps = (state) => {
  return {products: state.products, cart: state.cart, user: state.user, product: state.product}
}

const mapDispatchToProps = (dispatch) => ({
  fetchSelectedProduct: (product) => {
    dispatch(fetchSingleProduct(product));
  },
  onAdd: (product) => {
    dispatch(addItem(product))
  },
  onIncrease: (product) => {
    dispatch(increaseItem(product));
  },
  onDecrease: (product) => {
    dispatch(decreaseItem(product));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
