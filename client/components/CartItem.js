import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { deleteItem, increaseItem, decreaseItem } from '../store';

const CartItem = ({item, onDecrease, onIncrease, onDelete}) => {
  return (
      <tr key={item.id} className="product">
        <td className="product-image">
        <Link to={`/products/${item.id}`}>
          <img src={item.image} />
          </Link>
        </td>
        <td className="product-details">
          <div className="product-title">{item.name}</div>
          <p className="product-description">{item.description}</p>
        </td>
        <td className="product-price"> {item.priceInDollars}</td>
        <td className="product-quantity">
          <button
            onClick={() => {
              NotificationManager.success(
                `You added one ${item.name} to your cart`,
                'Added Item'
              );
              onIncrease(item);
            }}
          >
            +
          </button>
          <span>  {item.quantityInCart}  </span>
          <button
            onClick={() => {
              NotificationManager.warning(
                `You removed one ${item.name} from your cart`,
                'Removed Item'
              );
              onDecrease(item);
            }}
            disabled={item.quantityInCart === 1}
          >
            -
          </button>
        </td>
        <td className="product-removal">
          <button
            className="remove-product"
            onClick={() => {
              NotificationManager.error(
                `You removed ${item.name} from your cart`,
                'Removed Item'
              );
              onDelete(item.id);
            }}
          >
            X
          </button>
        </td>
        <td className="product-line-price">
          {(item.priceInDollars * item.quantityInCart).toFixed(2)}
        </td>
      </tr>
  );
};

const mapState = state => {
  return {
    cart: state.cart
  };
};

const mapDispatch = dispatch => ({
  onDelete(product) {
    dispatch(deleteItem(product));
  },
  onIncrease(product) {
    dispatch(increaseItem(product));
  },
  onDecrease(product) {
    dispatch(decreaseItem(product));
  }
});

export default withRouter(connect(mapState, mapDispatch)(CartItem));
