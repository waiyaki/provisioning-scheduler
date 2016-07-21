import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const HelloWorld = (props) => (
  <div>
    Hello, World! Greetings, from <span className='name'>{props.name}</span>
  </div>
);

const mapStateToProps = (state) => {
  const { name } = state;
  return {
    name
  };
};

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(HelloWorld);
