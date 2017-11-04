import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { addItem, increaseItem } from '../store';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export class AllProducts extends Component {

  componentDidMount(){
    console.log('Products props: ', this.props);
  }

  render() {


return (
      <div>
      <NotificationContainer />
        <h1>Products</h1>
        <div>
          { this.props.products &&
            this.props.products.map(product => (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} />
                  <div>{product.name}</div>
                  <div>{product.priceInDollars}</div>
                </Link>
                <button
                    onClick={() => {
                    NotificationManager.success(`You added ${product.name} to your cart`, 'Added Item');
                    if (this.props.cart.filter((el) => el.id === product.id).length > 0){
                      this.props.onIncrease(product)
                    } else {
                      this.props.onAdd(product);
                    }
                  }}>ADD</button>
                </div>
              )
            )
          }
        </div>
      </div>
    );
  }
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
