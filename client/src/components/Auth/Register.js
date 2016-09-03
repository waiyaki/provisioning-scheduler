import { PropTypes } from 'react';

import constructAuthComponent from './constructAuthComponent';
import authContainerHOC from '../../containers/AuthContainer/authContainerHOC';

const fields = [{
  name: 'firstName'
}, {
  name: 'lastName'
}, {
  name: 'username'
}, {
  name: 'email',
  type: 'email'
}, {
  name: 'password',
  type: 'password'
}];

export const Register = props => constructAuthComponent(
  'Register',
  fields
)(props);

Register.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default authContainerHOC(Register);
