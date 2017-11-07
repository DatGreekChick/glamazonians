import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <div>
        <p>
          We are a fabulous group of young women who support Nicolas Cage's
          efforts in acting. We originally wanted to picture what he would look
          like in women superhero costumes, but since that didn't quite make sense,
          we switched our directive. Now, as we fan girl over his various smouldering
          poses, we swoon over his potential roles in the future. Go Nic Cage, go!
        </p>
      </div>
    </div>
  );
}

export default withRouter(connect()(About));
