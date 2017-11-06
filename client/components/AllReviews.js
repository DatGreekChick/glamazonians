import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function AllReviews() {
  const productId = +this.props.match.params.productId;
  const filteredReviews = this.props.reviews.filter(
    review => review.productId === productId
  );
  return (
    <div>
      <h1>Reviews</h1>
      <div>
        {this.props.filteredReviews
          ? this.props.filteredReviews.map(review => (
              <div key={review.id}>
                <Link to={`/products/${review.id}`}>
                  <div>{review.title}</div>
                  <div>{review.rating}</div>
                  <div>{review.description}</div>
                </Link>
              </div>
            ))
          : 'There are no reviews at this time'}
        <button className="btn btn-info" onClick={() => {}}>
          ADD REVIEW
        </button>
      </div>
    </div>
  );
}

const mapState = state => {
  return {
    reviews: state.reviews,
    products: state.products
  };
};

export default withRouter(connect(mapState)(AllReviews));
