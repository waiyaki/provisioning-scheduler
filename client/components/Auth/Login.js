import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
// eslint-disable-next-line import/no-unresolved
import { TextField } from 'redux-form-material-ui';
import AuthMarkup from './AuthMarkup';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { constructRenderableFields, requireFields } from '../../utils';
import authStyles from './authStyles.css';

const fields = [{
  name: 'username'
}, {
  name: 'password',
  type: 'password'
}];

const Login = ({ handleSubmit, pristine, submitting, login, auth }) => (
  <AuthMarkup name='Login'>
    <form onSubmit={handleSubmit(login)}>
      {auth.error && auth.error.message &&
        <span className={authStyles.error}>{auth.error.message}</span>
      }
      {constructRenderableFields(fields).map((field, index) => (
        <Field
          {...field}
          component={TextField}
          errorText={auth.error && auth.error[field.name]}
          floatingLabelText={field.hintText}
          fullWidth
          key={index}
        />
      ))}
      <div className={`${authStyles.submit} text-xs-center`}>
        {submitting
          ? <CircularProgress size={0.5} />
          : <div>
            <RaisedButton disabled={pristine} type='submit' primary>
              Login
            </RaisedButton>
            <p className={authStyles['other-action']}>
              Not registered yet? <Link to='/register'>Click here.</Link>
            </p>
          </div>
        }
      </div>
    </form>
  </AuthMarkup>
);

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'LoginForm',
  validate: requireFields(fields.map(field => field.name))
})(Login);
