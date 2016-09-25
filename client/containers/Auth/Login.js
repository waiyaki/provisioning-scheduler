import { connect } from 'react-redux';
import { login } from '../../redux/modules/auth';
import { Login } from '../../components';
import authHoC from './Auth';

export default authHoC(
  connect(null, { login })(Login)
);
