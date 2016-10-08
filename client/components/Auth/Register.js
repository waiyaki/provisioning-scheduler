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

const Register = ({ handleSubmit, pristine, submitting, register, auth }) => (
  <AuthMarkup name='Register'>
    <form onSubmit={handleSubmit(register)}>
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
      <div className={`${authStyles.submit} text-center`}>
        {submitting
          ? <CircularProgress size={0.5} />
          : <div>
            <RaisedButton disabled={pristine} type='submit' primary>
              Register
            </RaisedButton>

            <p className={authStyles.secondaryAction}>
              Already registered? <Link to='/login'>Login here.</Link>
            </p>
          </div>
        }
      </div>
    </form>
  </AuthMarkup>
);

Register.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'RegisterForm',
  validate: requireFields(fields.map(field => field.name))
})(Register);
