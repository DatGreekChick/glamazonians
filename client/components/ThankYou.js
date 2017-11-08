import React from 'react';
import { connect } from 'react-redux';

function ThankYou() {
  return (
    <div>
      <h1>
        Thank you for your order. You will receive an email with a copy of your
        receipt. Thank you for supporting Nic Cage!
      </h1>
    </div>
  );
}

export default connect()(ThankYou);
