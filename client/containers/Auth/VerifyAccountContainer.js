import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { UnverifiedAccount } from '../../components';
import {
  verifyToken, resendVerificationEmail, clearAuthErrors,
  selectors as authSelectors
} from '../../redux/modules/auth';

class VerifyAccountContainer extends Component {
  constructor(props) {
    super(props);

    this.shouldWeRedirect = this.shouldWeRedirect.bind(this);
  }

  componentDidMount() {
    if (this.shouldWeRedirect(this.props)) {
      browserHistory.push('/');
    } else {
      const { params } = this.props;
      if (params && params.token && params.token !== 'resend') {
        this.props.verifyToken(params.token);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps;
    const { params: ownParams } = this.props;
    if (params && ownParams && params.token !== ownParams.token) {
      this.props.clearAuthErrors();
    }

    if (this.shouldWeRedirect(nextProps)) {
      browserHistory.push('/');
    }
  }

  componentWillUnmount() {
    this.props.clearAuthErrors();
  }

  shouldWeRedirect({ auth: { user, params } }) {
    if (params && params.token) {
      return false;
    }
    return !!user && !user.isPending;
  }

  render() {
    const { user, isFetching, error, verificationMessage } = this.props.auth;
    const { params, resendVerificationEmail: resendEmail } = this.props;
    return (
      <UnverifiedAccount
        error={error}
        isFetching={isFetching}
        params={params}
        resendEmail={resendEmail}
        user={user}
        verificationMessage={verificationMessage}
      />
    );
  }
}

VerifyAccountContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  clearAuthErrors: PropTypes.func.isRequired,
  params: PropTypes.object,
  resendVerificationEmail: PropTypes.func.isRequired,
  verifyToken: PropTypes.func.isRequired
};

export default connect(
  state => ({
    auth: authSelectors.getAuth(state)
  }),
  { verifyToken, resendVerificationEmail, clearAuthErrors }
)(VerifyAccountContainer);
