import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {fetchSingleProduct, addItem, increaseItem, decreaseItem} from '../store';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class SingleProduct extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const productId = this.props.match.params.productId
    this.props.fetchSelectedProduct(productId);

  }

  render() {
    {
      console.log(this.props)
    }
    return (
      <div>
        SingleProduct
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {products: state.products, cart: state.cart, user: state.user, product: state.product}
}

const mapDispatchToProps = (dispatch) => ({
    fetchSelectedProduct: (product) => {
      dispatch(fetchSingleProduct(product));
    }
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
