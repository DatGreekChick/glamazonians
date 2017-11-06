import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = ({ email, name }) => {
  return (
    <div>
      <h3>Welcome, {email ? email : name}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email
});

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
