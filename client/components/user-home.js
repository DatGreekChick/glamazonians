import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = ({ name, email }) => {
  return (
    <div>
      <h3>Welcome, {name ? name : email}</h3>
    </div>
    // Add user account info onto this page. This is where they will edit their info
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({
  name: state.user.name,
  email: state.user.email
});

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string
};
