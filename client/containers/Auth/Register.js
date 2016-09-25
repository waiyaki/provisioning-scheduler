import { connect } from 'react-redux';
import { register } from '../../redux/modules/auth';
import { Register } from '../../components';
import authHoC from './Auth';

export default authHoC(
  connect(null, { register })(Register)
);
