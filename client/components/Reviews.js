import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postReview, getNewProductReview } from '../store';

class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      opened: false,
      title: '',
      description: '',
      rating: 0
    };
    this.toggleReviewForm = this.toggleReviewForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleReviewForm() {
    const { opened } = this.state;
    this.setState({
      opened: !opened
    });
  }

  handleSubmit(event) {
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
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { opened } = this.state;
    const { product } = this.props;

    return (
      <div className="review-container">
        <h2>Reviews</h2>
        {this.props.isLoggedIn && (
          <div className="left">
            <button onClick={this.toggleReviewForm} className="reviewButton">
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
        {product.reviews &&
          product.reviews.map(review => {
            return (
              <div key={review.id}>
                <h3>{review.title}</h3>
                <h4>
                  By: {review.user ? review.user.name : this.props.user.name}
                </h4>
                <span>Rating: {reviewStars(review.rating)}</span>
                <p>{review.description}</p>
              </div>
            );
          })}
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

const mapState = state => {
  return {
    products: state.products,
    cart: state.cart,
    product: state.product,
    user: state.user,
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => ({
  onReview: review => {
    dispatch(postReview(review)).then(newReview => {
      dispatch(getNewProductReview(newReview));
    });
  }
});

export default connect(mapState, mapDispatch)(Reviews);

Reviews.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
