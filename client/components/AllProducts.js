import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { withRouter } from 'react-router';


export const AllProducts = (props) => {
  console.log(props.products);
  return (
      <div>
        <h1>AllProducts go here</h1>
        <div>
          { props.products &&
            props.products.map(product => (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} />
                  <div>{product.name}</div>
                </Link>
              </div>
            )
            )
          }
        </div>
      </div>
    );
  }

  function mapStateToProps(state) {
    return { products: state.products };
  }

export default withRouter(connect(mapStateToProps)(AllProducts));
