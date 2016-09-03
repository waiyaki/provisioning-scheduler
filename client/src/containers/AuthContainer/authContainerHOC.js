import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import omit from 'lodash/omit';

import * as authActions from '../../actions/authActions';

export default function authContainer(LoginOrRegisterComponent) {
  class AuthContainerWrapper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        errors: {}
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
    }

    componentWillUnmount() {
      this.props.clearAuthErrors();
    }

    handleInputChange(event) {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value.trim()
      });
    }

    handleSubmit(authActionFuncName) {
      const data = omit(this.state, 'errors');
      switch (authActionFuncName) {
        case 'register':
          this.handleRegister(data);
          break;
        default:
          // Noop
      }
    }

    handleRegister(data) {
      this.props.register(data)
        .then(
          () => browserHistory.push('/verify'),
          (/* error */) => { /* No op */ }
        );
    }

    render() {
      return (
        <LoginOrRegisterComponent
          errors={{
            ...this.props.auth.errors,
            ...this.state.errors
          }}
          isFetching={this.props.auth.isFetching}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  }

  const mapStateToProps = (state) => {
    const { auth } = state;

    return {
      auth
    };
  };

  AuthContainerWrapper.propTypes = {
    auth: PropTypes.shape({
      errors: PropTypes.object.isRequired,
      user: PropTypes.object.isRequired,
      isFetching: PropTypes.bool.isRequired
    }).isRequired,
    clearAuthErrors: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
  };

  return connect(mapStateToProps, authActions)(AuthContainerWrapper);
}
