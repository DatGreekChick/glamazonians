import React, {Component} from 'react';
import {getSingleProduct} from '../store/products';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';

class SingleProduct extends Component {
  constructor() {
    super()
  }

  // componentWillMount() {
  //   const productId = this.props.match.params.productId;
  //   this.props.getProductDetail(productId);
  // }

  render() {
    return (
      <div>
        <h2>SingleProduct</h2>
      </div>
    );
  }
};

const mapStateToProps = ({products}) => ({products})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getProductDetail: (product) => {
//       dispatch(getSingleProduct(product));
//     }
//   }
// }

export default connect(mapStateToProps)(SingleProduct);
