import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <div>
        <p>
          We are a fabulous group of young women who support Nicolas Cage's
          efforts in acting. We fan girl over his various smouldering poses and
          often wonder what he would look like in women superhero costumes.
        </p>
      </div>
    </div>
  );
}

export default withRouter(connect()(About));
