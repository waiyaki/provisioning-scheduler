import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
// eslint-disable-next-line import/no-unresolved
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { constructRenderableFields, requireFields } from '../../utils';
import authStyles from './authStyles.css';

const fields = [{
  name: 'email',
  type: 'email',
  hintText: 'Enter your email and click "Resend"'
}];

const ResendVerificationEmail = ({
  handleSubmit, pristine, submitting, resendEmail,
  sendError, verificationMessage, user
}) => (verificationMessage
  ?
  <div>
    {verificationMessage.message}
    {!user && (
      <p className={authStyles.alreadyConfirmed}>
        You can also <Link to='/login'>login</Link> or <Link to='/register'>register</Link>
      </p>
    )}
  </div>
  :
  <form onSubmit={handleSubmit(resendEmail)}>
    {sendError && sendError.message &&
      <span className={authStyles.error}>{sendError.message}</span>
    }
    {constructRenderableFields(fields).map((field, index) => (
      <Field
        {...field}
        component={TextField}
        errorText={sendError && sendError[field.name]}
        floatingLabelText={field.hintText}
        fullWidth
        key={index}
      />
    ))}
    <div className={`${authStyles.submit} text-xs-center`}>
      {submitting
        ? <CircularProgress size={0.5} />
        : <RaisedButton disabled={pristine} type='submit' primary>
          Resend
        </RaisedButton>
      }
    </div>
  </form>
);

ResendVerificationEmail.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  sendError: PropTypes.object,
  resendEmail: PropTypes.func.isRequired,
  user: PropTypes.object,
  verificationMessage: PropTypes.object
};

export default reduxForm({
  form: 'ResendVerificationEmail',
  validate: requireFields(fields.map(field => field.name))
})(ResendVerificationEmail);
