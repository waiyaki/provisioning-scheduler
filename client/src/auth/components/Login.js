import { PropTypes } from 'react';

import constructAuthComponent from './constructAuthComponent';

import authContainerHOC from '../containers/authContainerHOC';

const fields = [{
  name: 'username'
}, {
  name: 'password',
  type: 'password'
}];

export const Login = props => constructAuthComponent('Login', fields)(props);

Login.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default authContainerHOC(Login);
