import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { addItem } from '../store';

export class AllProducts extends Component {

  componentDidMount(){
    console.log('Products props: ', this.props);
  }

  render() {


return (
      <div>
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
                <button onClick={() => {this.props.onAdd(product)}}>ADD</button>
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
      }
  });

export default withRouter(connect(mapState, mapDispatch)(AllProducts));
