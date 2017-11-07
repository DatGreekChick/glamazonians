import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  postReview,
  fetchSingleProduct,
  addItem,
  increaseItem,
  decreaseItem,
  getNewProductReview
} from '../store';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      opened: false,
      title: '',
      description: '',
      rating: 0,
    };
    this.toggleReviewForm = this.toggleReviewForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  toggleReviewForm() {
    const { opened } = this.state;
    this.setState({
      opened: !opened
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const review = {
      title: this.state.title,
      rating: +this.state.rating,
      description: this.state.description,
      userId: this.props.user.id,
      productId: this.props.product.id
    };
    this.props.onReview(review);
    this.setState({
      title: '',
      description: '',
      rating: '',
      opened: false
    })

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  render() {
    const { product } = this.props;
    const { opened } = this.state;
    console.log(this.state);
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
          <div className="review-container">
            <h2>Reviews</h2>
            {this.props.isLoggedIn && (
              <div className="left">
                <button
                  onClick={this.toggleReviewForm}
                  className="reviewButton"
                >
                  Write a Review
                </button>
                {opened && (
                  <div>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                      <label>Rating</label>
                      <span className="rating">
                        <input
                          id="rating5"
                          type="radio"
                          name="rating"
                          value="5"
                          onChange={this.handleChange}
                        />
                        <label htmlFor="rating5">5</label>
                        <input
                          id="rating4"
                          type="radio"
                          name="rating"
                          value="4"
                          onChange={this.handleChange}
                        />
                        <label htmlFor="rating4">4</label>
                        <input
                          id="rating3"
                          type="radio"
                          name="rating"
                          value="3"
                          onChange={this.handleChange}
                        />
                        <label htmlFor="rating3">3</label>
                        <input
                          id="rating2"
                          type="radio"
                          name="rating"
                          value="2"
                          onChange={this.handleChange}
                        />
                        <label htmlFor="rating2">2</label>
                        <input
                          id="rating1"
                          type="radio"
                          name="rating"
                          value="1"
                          onChange={this.handleChange}
                        />
                        <label htmlFor="rating1">1</label>
                      </span>
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                      />
                      <label>Review</label>
                      <textarea name="description" onChange={this.handleChange} />
                      <input type="submit" />
                    </form>
                  </div>
                )}
              </div>
            )}
            <hr />
            {product.reviews.length &&
              product.reviews.map(review => {
                return (
                  <div key={review.id}>
                    <h3>{review.title}</h3>
                    <h4>
                      By:{' '}
                      {review.user ? review.user.name : this.props.user.name }
                    </h4>
                    <span>Rating: {reviewStars(review.rating)}</span>
                    <p>{review.description}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

function reviewStars(rating) {
  let starRating = ['☆', '☆', '☆', '☆', '☆'];
  for (let i = 0; i < rating; i++) {
    starRating.pop();
    starRating.unshift('★');
  }
  return starRating.join(' ');
}

const mapStateToProps = state => {
  return {
    products: state.products,
    cart: state.cart,
    product: state.product,
    user: state.user,
    isLoggedIn: !!state.user.id
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
  },
  onReview: review => {
    dispatch(postReview(review)).then(newReview =>
      {
        console.log(newReview);
        dispatch(getNewProductReview(newReview));
      }
    )}
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
);

SingleProduct.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
