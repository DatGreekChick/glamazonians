import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../store';
/**
 * COMPONENT
 */
export class UserHome extends Component {

  ComponentWillMount(){
    console.log('here');
    this.props.onLoad(this.props.userId);
  }

render(){
  const { name, email, orders } = this.props;
  return (
    <div>
      <h3>Welcome, {name ? name : email}</h3>

      { orders &&
        orders.map(order => (
          <div key={order.id} className="oneProduct">
            {
              order.lineItems.map( item => (
                <div key={item.id}>{item.product.name}</div>
              )
              )
            }
            </div>
          )
        )
      }
    </div>
    // Add user account info onto this page. This is where they will edit their info
  );
}
}

/**
 * CONTAINER
 */
const mapState = state => ({
  name: state.user.name,
  email: state.user.email,
  userId: state.user.id,
  orders: state.orders
});

const mapDispatch = dispatch => {
  return {
    onLoad(id) {
      dispatch(fetchAllOrders(id));
    }
  };
};

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string
};
