import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
// eslint-disable-next-line import/no-unresolved
import { TextField } from 'redux-form-material-ui';
import AuthMarkup from './AuthMarkup';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { constructRenderableFields, requireFields } from '../../utils';
import loginStyles from './Login.css';

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
        <span className={loginStyles.error}>{auth.error.message}</span>
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
      <div className={`${loginStyles.loginButton} text-xs-center`}>
        {submitting
          ? <CircularProgress size={0.5} />
          : <RaisedButton disabled={pristine} type='submit' primary>
            Login
          </RaisedButton>
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
