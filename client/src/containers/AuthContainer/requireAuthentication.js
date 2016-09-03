import React from 'react';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage/LandingPage';
import UnverifiedAccountContainer from './UnverifiedAccountContainer';

export default function requireAuthentication(Component) {
  function WrapperComponent(props) {
    const { auth } = props;

    if (!auth.isAuthenticated) {
      return <LandingPage />;
    } else if (auth.isAuthenticated && auth.user.isPending) {
      return <UnverifiedAccountContainer />;
    }
    return <Component {...props} />;
  }

  const mapStateToProps = (state) => {
    const { auth } = state;

    return {
      auth
    };
  };

  WrapperComponent.propTypes = {
    auth: React.PropTypes.object
  };

  return connect(mapStateToProps)(WrapperComponent);
}
