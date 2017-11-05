import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { addItem, increaseItem } from '../store';
import {NotificationContainer, NotificationManager} from 'react-notifications';


class SingleProduct extends Component {

  componentWillMount(){
    this.productId = this.props.match.params.productId
  }

  render() {
    {console.log(this.productId)}
    return (
      <div>
        SingleProduct
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAdd (product) {
      dispatch(addItem(product))
    },
  onIncrease (product) {
        dispatch(increaseItem(product))
      }
    }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
